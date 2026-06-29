import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { DIST, loadPage } from "./helpers/dist.js";

// Smoke test: the site builds and the homepage renders the brand name.
// This is the safety net — if a change breaks the build, `npm test` goes red.
describe("build smoke", () => {
  beforeAll(() => {
    execSync("npm run build", { stdio: "ignore" });
  }, 120000);

  it("produces dist/index.html", () => {
    expect(fs.existsSync(path.join(DIST, "index.html"))).toBe(true);
  });

  it("renders the brand name on the homepage", () => {
    const $ = loadPage("index.html");
    expect($("h1").text()).toContain("Eskedar");
  });
});