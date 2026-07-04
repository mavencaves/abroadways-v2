import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { createHmac, timingSafeEqual } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { collections } from "./models.mjs";
import * as store from "./store.mjs";
import { loadEnvironment } from "./load-env.mjs";

await loadEnvironment();

const root = resolve(process.env.PUBLIC_DIR || "dist");
const port = Number(process.env.PORT || 5173);
const tokenTtlMs = 1000 * 60 * 60 * 8;

function normalizeCredential(value) {
  return String(value ?? "").trim();
}

function configuredAdminEmail() {
  return normalizeCredential(process.env.ADMIN_EMAIL);
}

function configuredAdminPassword() {
  return normalizeCredential(process.env.ADMIN_PASSWORD);
}

function cloudinaryReady() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

function configureCloudinary() {
  if (!cloudinaryReady()) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function validateAdminEnvironment() {
  const adminEmail = configuredAdminEmail();
  const adminPassword = configuredAdminPassword();
  console.log(`Admin email loaded: ${adminEmail ? "yes" : "no"}`);
  const missing = [
    ["ADMIN_EMAIL", adminEmail],
    ["ADMIN_PASSWORD", adminPassword],
  ].filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) {
    console.error(`Startup error: missing required admin environment variable(s): ${missing.join(", ")}`);
    console.error("Create a .env file or configure these variables in your deployment environment before starting the server.");
    process.exit(1);
  }
}

validateAdminEnvironment();
configureCloudinary();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  return resolve(join(root, clean));
}

function spaStatus(pathname) {
  const publicRoutes = new Set([
    "/",
    "/login",
    "/study-abroad",
    "/study-abroad/new-zealand",
    "/study-abroad/united-kingdom",
    "/study-abroad/uk",
    "/study-abroad/australia",
    "/study-abroad/canada",
    "/study-abroad/malaysia",
    "/services",
    "/academy",
    "/partners",
    "/who-are-we",
    "/pathway-planner",
    "/blog",
    "/about-us",
    "/contact",
  ]);
  if (publicRoutes.has(pathname)) return 200;
  if (pathname.startsWith("/dashboard")) return 200;
  if (pathname.startsWith("/blog/") && pathname.split("/").filter(Boolean).length === 2) return 200;
  return 404;
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function send(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  });
  response.end(JSON.stringify(payload));
}

function allowedOrigins() {
  return String(process.env.CORS_ORIGINS || process.env.FRONTEND_BASE_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  const origins = allowedOrigins();
  if (origin && (origins.includes("*") || origins.includes(origin))) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Max-Age", "86400");
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function authSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "development-admin-secret-change-me";
}

function sign(payload) {
  return createHmac("sha256", authSecret()).update(payload).digest("base64url");
}

function createToken(email) {
  const payload = base64url(JSON.stringify({ email, exp: Date.now() + tokenTtlMs }));
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null;
  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!decoded.exp || decoded.exp < Date.now()) return null;
  return decoded;
}

function adminFromRequest(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return verifyToken(token);
}

function safeEqual(a = "", b = "") {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function requireAdmin(request, response) {
  const admin = adminFromRequest(request);
  if (!admin) {
    send(response, 401, { error: "Admin login required" });
    return null;
  }
  return admin;
}

async function handleAuth(request, response, pathname) {
  if (pathname === "/api/auth/login") {
    if (request.method !== "POST") {
      send(response, 405, { error: "Method not allowed" });
      return;
    }
    const { email, password } = await readBody(request);
    const submittedEmail = normalizeCredential(email);
    const submittedPassword = normalizeCredential(password);
    const adminEmail = configuredAdminEmail();
    const adminPassword = configuredAdminPassword();
    if (!adminEmail || !adminPassword) {
      send(response, 503, { error: "Admin credentials are not configured" });
      return;
    }
    const emailMatches = safeEqual(submittedEmail, adminEmail);
    const passwordMatches = safeEqual(submittedPassword, adminPassword);
    if (!emailMatches || !passwordMatches) {
      send(response, 401, { error: "Invalid admin email or password" });
      return;
    }
    send(response, 200, { token: createToken(adminEmail), admin: { email: adminEmail } });
    return;
  }
  if (pathname === "/api/auth/me") {
    if (request.method !== "GET") {
      send(response, 405, { error: "Method not allowed" });
      return;
    }
    const admin = adminFromRequest(request);
    if (!admin) {
      send(response, 401, { error: "Login expired" });
      return;
    }
    send(response, 200, { admin: { email: admin.email } });
    return;
  }
  send(response, 404, { error: "Unknown auth route" });
}

function publishedOnly(items) {
  return items.filter((item) => !item.status || item.status === "published");
}

function assertUploadPayload(payload) {
  const dataUrl = String(payload?.dataUrl || "");
  const mimeType = String(payload?.mimeType || "");
  if (!dataUrl) {
    return "Choose an image to upload.";
  }
  if (!dataUrl.startsWith("data:image/") && !mimeType.startsWith("image/")) {
    return "Only image uploads are allowed.";
  }
  if (dataUrl.length > 14 * 1024 * 1024) {
    return "Image is too large. Please upload an image under 10MB.";
  }
  return "";
}

async function deleteCloudinaryAsset(media) {
  if (!cloudinaryReady()) return;
  const publicId = media?.cloudinaryPublicId || media?.publicId;
  if (!publicId || media?.provider !== "cloudinary") return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" }).catch(() => null);
}

async function handleMediaUpload(request, response) {
  if (request.method !== "POST") {
    send(response, 405, { error: "Method not allowed" });
    return;
  }
  const admin = requireAdmin(request, response);
  if (!admin) return;
  if (!cloudinaryReady()) {
    send(response, 503, { error: "Cloudinary upload is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." });
    return;
  }
  const payload = await readBody(request);
  const validationError = assertUploadPayload(payload);
  if (validationError) {
    send(response, 400, { error: validationError });
    return;
  }
  const folder = payload.folder || "abroadways/media";
  const upload = await cloudinary.uploader.upload(payload.dataUrl, {
    folder,
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    filename_override: payload.fileName,
    context: payload.altText ? { alt: payload.altText } : undefined,
  });
  const title = String(payload.title || payload.fileName || upload.original_filename || "Uploaded image").trim();
  const item = await store.create("media", {
    title,
    url: upload.secure_url,
    secureUrl: upload.secure_url,
    publicId: upload.public_id,
    cloudinaryPublicId: upload.public_id,
    provider: "cloudinary",
    altText: payload.altText || title,
    folder,
    format: upload.format,
    width: upload.width,
    height: upload.height,
    bytes: upload.bytes,
    uploadedBy: admin.email,
    uploadedAt: new Date().toISOString(),
    status: "published",
  });
  send(response, 201, { item });
}

async function handleApi(request, response, pathname) {
  const [, , collection, id] = pathname.split("/");
  if (!collections.includes(collection)) {
    send(response, 404, { error: "Unknown API collection" });
    return;
  }
  if (request.method === "GET") {
    const admin = adminFromRequest(request);
    const items = await store.list(collection);
    if (admin) {
      send(response, 200, { items });
      return;
    }
    if (["pages", "countries", "blogs", "settings"].includes(collection)) {
      send(response, 200, { items: publishedOnly(items) });
      return;
    }
    send(response, 401, { error: "Admin login required" });
    return;
  }
  if (request.method === "POST") {
    if (collection !== "leads" && !requireAdmin(request, response)) return;
    send(response, 201, { item: await store.create(collection, await readBody(request)) });
    return;
  }
  if (request.method === "PUT" && id) {
    if (!requireAdmin(request, response)) return;
    send(response, 200, { item: await store.update(collection, id, await readBody(request)) });
    return;
  }
  if (request.method === "DELETE" && id) {
    if (!requireAdmin(request, response)) return;
    if (collection === "media") await deleteCloudinaryAsset(await store.get(collection, id));
    send(response, 200, await store.remove(collection, id));
    return;
  }
  send(response, 405, { error: "Method not allowed" });
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const pathname = (url.pathname.replace(/\/+$/, "") || "/");
    applyCors(request, response);
    if (request.method === "OPTIONS" && pathname.startsWith("/api/")) {
      response.writeHead(204);
      response.end();
      return;
    }
    if (pathname.startsWith("/api/auth/")) {
      await handleAuth(request, response, pathname);
      return;
    }
    if (pathname === "/api/media/upload") {
      await handleMediaUpload(request, response);
      return;
    }
    if (pathname.startsWith("/api/")) {
      await handleApi(request, response, pathname);
      return;
    }

    const requestedPath = safePath(url.pathname);
    if (!requestedPath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const hasStaticFile = existsSync(requestedPath) && !url.pathname.endsWith("/");
    const filePath = hasStaticFile ? requestedPath : join(root, "index.html");
    if (!existsSync(filePath)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(hasStaticFile ? 200 : spaStatus(url.pathname), { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    send(response, 500, { error: error instanceof Error ? error.message : "Server error" });
  }
}).listen(port, async () => {
  const index = await readFile(join(root, "index.html"), "utf8").catch(() => "");
  const title = index.match(/<title>(.*?)<\/title>/)?.[1] || "Abroadways V2 Pro";
  const storage = await store.storageStatus();
  console.log(`CMS storage: ${storage.driver}${storage.database ? ` (${storage.database})` : ""}`);
  console.log(`${title} full-stack server running at http://localhost:${port}`);
});
