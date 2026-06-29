import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
export const cheerio = require("cheerio");

export const DIST = path.join(process.cwd(), "dist");

export function getAllHtmlFiles(dir = DIST) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllHtmlFiles(full));
    else if (entry.name.endsWith(".html")) results.push(full);
  }
  return results;
}

export function loadPage(pagePath) {
  const html = fs.readFileSync(path.join(DIST, pagePath), "utf8");
  return cheerio.load(html);
}
