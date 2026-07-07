import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();
const ignoredDirs = new Set([".git", ".next", "node_modules"]);
const oldDocsPath = "D" + "ocs/";
const finderDuplicatePath = "D" + "ocs 2";
const allowedDocsRootDirs = ["changelog", "development-plans", "specs"];
const allowedChangelogRootEntries = ["index.md", "zones"];
const expectedChangelogZoneFiles = [
  "admin-authentification.md",
  "admin-catalogue.md",
  "admin-categories.md",
  "admin-commandes.md",
  "admin-dashboard.md",
  "admin-stock.md",
  "catalogue-client.md",
  "categories-sous-categories.md",
  "checkout-commande-client.md",
  "confirmation-confidentialite.md",
  "contenu-traductions.md",
  "documentation-organisation-projet.md",
  "fiche-produit.md",
  "infrastructure-donnees.md",
  "panier.md",
  "securite-donnees-personnelles.md",
  "tests-qualite.md",
  "ux-mobile-interface.md"
];
const allowedSpecsRootEntries = [
  "feature-specs",
  "functional-map.md",
  "global-spec.md",
  "technical",
  "user-stories.md",
  "validation-rules.md",
  "visual-rules.md",
  "work-plan.md"
];
const expectedFeatureSpecFiles = [
  "admin-auth.md",
  "admin-commandes.md",
  "admin-dashboard.md",
  "admin-produits.md",
  "admin-stock.md",
  "catalogue-produits.md",
  "categories-sous-categories.md",
  "confidentialite.md",
  "confirmation-commande.md",
  "fiche-produit.md",
  "panier.md",
  "validation-commande.md"
];
const expectedTechnicalSpecFiles = [
  "admin-auth.md",
  "data-model.md",
  "images-content.md",
  "operations.md",
  "production-plan.md",
  "routes-navigation.md",
  "security-checklist.md",
  "server-actions.md",
  "supabase.md"
];
const allowedDevelopmentPlanRootDirs = ["en-cours", "termines"];
const allowedDevelopmentPlanRootFiles = new Set<string>();
const obsoleteTrackedFiles = [
  "docs/changelog/v1.md",
  "docs/development-plans/status.md",
  "docs/development-plans/tickets.md",
  "docs/testing/test-plan.md",
  "docs/specs/content/ru-copy.md",
  "docs/specs/glossary.md"
];

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

function listEntryNames(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .map((entry) => entry.name)
    .sort();
}

function listFileNames(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

function listDirectoryNames(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
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

  it("does not track README files", () => {
    const trackedReadmes = execFileSync("git", ["ls-files", "*README.md"], {
      cwd: root,
      encoding: "utf8"
    })
      .split("\n")
      .filter(Boolean);

    assert.deepEqual(trackedReadmes, []);
  });

  it("does not track obsolete documentation files", () => {
    const trackedObsoleteFiles = execFileSync("git", ["ls-files", ...obsoleteTrackedFiles], {
      cwd: root,
      encoding: "utf8"
    })
      .split("\n")
      .filter(Boolean);

    assert.deepEqual(trackedObsoleteFiles, []);
  });

  it("does not keep Finder-style duplicate documentation folders", () => {
    assert.equal(existsSync(join(root, finderDuplicatePath)), false);
  });

  it("keeps the simplified docs root structure stable", () => {
    const docsRoot = join(root, "docs");
    const rootDirs = listDirectoryNames(docsRoot);

    assert.deepEqual(rootDirs, allowedDocsRootDirs);
  });

  it("keeps changelog files in their expected folders", () => {
    const changelogRoot = join(root, "docs", "changelog");
    const changelogZonesRoot = join(changelogRoot, "zones");

    assert.deepEqual(listEntryNames(changelogRoot), allowedChangelogRootEntries);
    assert.deepEqual(listDirectoryNames(changelogRoot), ["zones"]);
    assert.deepEqual(listFileNames(changelogRoot), ["index.md"]);
    assert.deepEqual(listDirectoryNames(changelogZonesRoot), []);
    assert.deepEqual(listFileNames(changelogZonesRoot), expectedChangelogZoneFiles);
  });

  it("keeps specs files in their expected folders", () => {
    const specsRoot = join(root, "docs", "specs");

    assert.deepEqual(listEntryNames(specsRoot), allowedSpecsRootEntries);
    assert.deepEqual(listDirectoryNames(specsRoot), ["feature-specs", "technical"]);
    assert.deepEqual(listFileNames(join(specsRoot, "feature-specs")), expectedFeatureSpecFiles);
    assert.deepEqual(listDirectoryNames(join(specsRoot, "feature-specs")), []);
    assert.deepEqual(listFileNames(join(specsRoot, "technical")), expectedTechnicalSpecFiles);
    assert.deepEqual(listDirectoryNames(join(specsRoot, "technical")), []);
  });

  it("keeps development plan root limited to tracking markdown files", () => {
    const developmentPlansRoot = join(root, "docs", "development-plans");
    const developmentPlanRootDirs = listDirectoryNames(developmentPlansRoot);
    const offenders = readdirSync(developmentPlansRoot, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((file) => file.endsWith(".md"))
      .filter((file) => !allowedDevelopmentPlanRootFiles.has(file));

    assert.deepEqual(developmentPlanRootDirs, allowedDevelopmentPlanRootDirs);
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
