import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { createHmac, timingSafeEqual } from "node:crypto";
import { collections } from "./models.mjs";
import * as store from "./store.mjs";

const root = resolve(process.env.PUBLIC_DIR || "dist");
const port = Number(process.env.PORT || 5173);
const tokenTtlMs = 1000 * 60 * 60 * 8;

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

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function send(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
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
  if (pathname === "/api/auth/login" && request.method === "POST") {
    const { email, password } = await readBody(request);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      send(response, 503, { error: "Admin credentials are not configured" });
      return;
    }
    if (!safeEqual(email, adminEmail) || !safeEqual(password, adminPassword)) {
      send(response, 401, { error: "Invalid admin email or password" });
      return;
    }
    send(response, 200, { token: createToken(adminEmail), admin: { email: adminEmail } });
    return;
  }
  if (pathname === "/api/auth/me" && request.method === "GET") {
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
    if (["pages", "countries", "blogs"].includes(collection)) {
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
    send(response, 200, await store.remove(collection, id));
    return;
  }
  send(response, 405, { error: "Method not allowed" });
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/auth/")) {
      await handleAuth(request, response, url.pathname);
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url.pathname);
      return;
    }

    const requestedPath = safePath(url.pathname);
    if (!requestedPath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const filePath = existsSync(requestedPath) && !url.pathname.endsWith("/") ? requestedPath : join(root, "index.html");
    if (!existsSync(filePath)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    send(response, 500, { error: error instanceof Error ? error.message : "Server error" });
  }
}).listen(port, async () => {
  const index = await readFile(join(root, "index.html"), "utf8").catch(() => "");
  const title = index.match(/<title>(.*?)<\/title>/)?.[1] || "Abroadways V2 Pro";
  console.log(`${title} full-stack server running at http://localhost:${port}`);
});
