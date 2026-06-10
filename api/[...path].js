async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function backendBaseUrl() {
  return String(process.env.ABROADWAYS_API_BASE || process.env.RENDER_API_BASE || "").trim().replace(/\/+$/, "");
}

function proxyTarget(request) {
  const baseUrl = backendBaseUrl();
  const path = Array.isArray(request.query.path) ? request.query.path.join("/") : String(request.query.path || "");
  const query = new URLSearchParams(request.query);
  query.delete("path");
  const queryString = query.toString();
  return {
    baseUrl,
    url: `${baseUrl}/api/${path}${queryString ? `?${queryString}` : ""}`,
  };
}

export default async function handler(request, response) {
  const target = proxyTarget(request);
  if (!target.baseUrl) {
    response.status(500).json({ error: "ABROADWAYS_API_BASE is not configured on Vercel" });
    return;
  }

  const headers = { ...request.headers };
  delete headers.host;
  delete headers.connection;

  const upstream = await fetch(target.url, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await readBody(request),
  });

  upstream.headers.forEach((value, key) => {
    if (!["transfer-encoding", "content-encoding", "connection"].includes(key)) {
      response.setHeader(key, value);
    }
  });

  const body = Buffer.from(await upstream.arrayBuffer());
  response.status(upstream.status).send(body);
}
