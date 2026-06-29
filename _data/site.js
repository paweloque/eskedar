const fs = require("fs/promises");
const yaml = require("js-yaml");
const path = require("path");

module.exports = async function () {
  const raw = await fs.readFile(path.join(__dirname, "../content/site.yaml"), "utf8");
  return yaml.load(raw);
};
