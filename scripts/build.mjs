import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const outDir = "dist";

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp("index.html", `${outDir}/index.html`);
await cp("src", `${outDir}/src`, { recursive: true });

if (existsSync("public")) {
  await cp("public", outDir, { recursive: true });
}

console.log("Built Abroadways public site to dist");
