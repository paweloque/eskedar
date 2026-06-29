import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const CONTENT_DIR = path.join(__dirname, "../../content");

/**
 * Read and parse a YAML file relative to the content directory.
 * @param {string} relativePath - Path relative to content/, e.g. "speakers/_list.yaml"
 * @returns {any} Parsed YAML content
 */
export function loadYaml(relativePath) {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  return yaml.load(raw);
}

/**
 * List all .yaml files in a content subdirectory.
 * @param {string} subdir - Subdirectory name relative to content/, e.g. "speakers"
 * @returns {string[]} Array of filenames (e.g. ["_list.yaml", "john-doe.yaml"])
 */
export function listYamlFiles(subdir) {
  const dirPath = path.join(CONTENT_DIR, subdir);
  return fs.readdirSync(dirPath).filter((f) => f.endsWith(".yaml"));
}

/**
 * Load all individual YAML files in a subdirectory (excluding _list.yaml).
 * @param {string} subdir - Subdirectory name relative to content/
 * @returns {Array<{filename: string, slug: string, data: any}>}
 */
export function loadAllYamlInDir(subdir) {
  return listYamlFiles(subdir)
    .filter((f) => f !== "_list.yaml")
    .map((filename) => ({
      filename,
      slug: filename.replace(".yaml", ""),
      data: loadYaml(path.join(subdir, filename)),
    }));
}
