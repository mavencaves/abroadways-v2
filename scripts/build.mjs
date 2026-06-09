import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const outDir = "dist";
const apiBase = String(process.env.ABROADWAYS_API_BASE || process.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp("index.html", `${outDir}/index.html`);
await cp("src", `${outDir}/src`, { recursive: true });
await writeFile(`${outDir}/runtime-config.js`, `window.ABROADWAYS_API_BASE = ${JSON.stringify(apiBase)};\n`);

if (existsSync("public")) {
  await cp("public", outDir, { recursive: true });
}

console.log("Built Abroadways public site to dist");
