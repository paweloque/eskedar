const fs = require("fs/promises");
const yaml = require("js-yaml");
const path = require("path");

module.exports = async function () {
  const pagesDir = path.join(__dirname, "../content/pages");
  const files = await fs.readdir(pagesDir);
  const pages = {};
  for (const file of files) {
    if (!file.endsWith(".yaml")) continue;
    const stem = path.basename(file, ".yaml");
    const raw = await fs.readFile(path.join(pagesDir, file), "utf8");
    pages[stem] = yaml.load(raw);
  }
  return pages;
};
