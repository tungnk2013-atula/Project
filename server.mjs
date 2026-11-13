/* Server tĩnh đơn giản cho VDTC Laptop Shop — Node.js, không phụ thuộc */
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2"
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (urlPath === "/") urlPath = "/index.html";

    // Chống path traversal
    const file = normalize(join(ROOT, urlPath));
    if (!file.startsWith(normalize(ROOT))) {
      res.writeHead(403); return res.end("Forbidden");
    }

    const data = await readFile(file);
    res.writeHead(200, {
      "Content-Type": MIME[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  } catch {
    // SPA fallback về index.html
    try {
      const index = await readFile(join(ROOT, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(index);
    } catch {
      res.writeHead(404); res.end("Not found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`✅ VDTC Laptop Store chạy tại: http://localhost:${PORT}`);
});
