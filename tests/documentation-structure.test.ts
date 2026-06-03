import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();
const ignoredDirs = new Set([".git", ".next", "node_modules"]);
const oldDocsPath = "D" + "ocs/";
const finderDuplicatePath = "D" + "ocs 2";
const allowedDevelopmentPlanRootFiles = new Set(["README.md", "status.md", "tickets.md"]);

function listProjectFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listProjectFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

describe("documentation structure", () => {
  it("tracks only docs/ paths in Git", () => {
    const trackedFiles = execFileSync("git", ["ls-files"], {
      cwd: root,
      encoding: "utf8"
    })
      .split("\n")
      .filter(Boolean);

    assert.equal(trackedFiles.some((file) => file.startsWith(oldDocsPath)), false);
    assert.equal(trackedFiles.some((file) => file.startsWith("docs/")), true);
  });

  it("does not keep Finder-style duplicate documentation folders", () => {
    assert.equal(existsSync(join(root, finderDuplicatePath)), false);
  });

  it("keeps development plan root limited to tracking markdown files", () => {
    const developmentPlansRoot = join(root, "docs", "development-plans");
    const offenders = readdirSync(developmentPlansRoot, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((file) => file.endsWith(".md"))
      .filter((file) => !allowedDevelopmentPlanRootFiles.has(file));

    assert.deepEqual(offenders, []);
  });

  it("does not reference the old mixed-case docs path in text files", () => {
    const offenders = listProjectFiles(root).filter((file) => {
      if (!/\.(md|ts|tsx|js|cjs|json)$/.test(file)) return false;
      if (statSync(file).size > 1024 * 1024) return false;

      return readFileSync(file, "utf8").includes(oldDocsPath);
    });

    assert.deepEqual(offenders, []);
  });
});
