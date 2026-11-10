// Static server mirroring nginx.conf: per-module SPA fallback to /<module>/index.html
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2]);
const port = Number(process.argv[3] || 8080);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.map': 'application/json', '.mp4': 'video/mp4', '.webm': 'video/webm' };

function send(res, file) {
  res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}
const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const target = path.join(root, urlPath);
  if (!target.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (isFile(target)) return send(res, target);
  if (isFile(path.join(target, 'index.html'))) {
    if (!urlPath.endsWith('/')) { res.writeHead(301, { Location: urlPath + '/' }); return res.end(); }
    return send(res, path.join(target, 'index.html'));
  }
  const m = urlPath.match(/^\/([^/]+)\//);
  if (m && !path.extname(urlPath) && isFile(path.join(root, m[1], 'index.html'))) return send(res, path.join(root, m[1], 'index.html'));
  res.writeHead(404); res.end('Not found');
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}/`));
