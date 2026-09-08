import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import {
  createDemoSessionToken,
  getDemoSessionCookieOptions,
  validateDemoCredentials,
  verifyDemoSessionToken,
} from "../lib/cv-studio/auth-core.ts";
import {
  demoCandidates,
  getDemoOutputAsset,
  resolveCandidateIdBySourceHash,
} from "../lib/cv-studio/demo-manifest.ts";

const projectRoot = process.cwd();
const assetDirectory = join(projectRoot, "private", "cv-studio-demo");
const testSecret = "test-session-secret-that-is-at-least-32-characters";

test("valid demo credentials succeed and invalid credentials fail", () => {
  const expected = { email: "wouter@bluefin.nl", password: "demo-password" };
  assert.equal(validateDemoCredentials({ email: "WOUTER@BLUEFIN.NL", password: "demo-password" }, expected), true);
  assert.equal(validateDemoCredentials({ email: "wouter@bluefin.nl", password: "wrong" }, expected), false);
  assert.equal(validateDemoCredentials({ email: "other@bluefin.nl", password: "demo-password" }, expected), false);
});

test("session tokens require a valid signature and expire", () => {
  const now = Date.UTC(2026, 8, 7, 10, 0, 0);
  const token = createDemoSessionToken(testSecret, now);
  assert.equal(verifyDemoSessionToken(token, testSecret, now)?.sub, "bluefin-demo");
  assert.equal(verifyDemoSessionToken(token, "different-secret", now), null);
  assert.equal(verifyDemoSessionToken(undefined, testSecret, now), null);
  assert.equal(verifyDemoSessionToken(token, testSecret, now + 9 * 60 * 60 * 1000), null);
});

test("session cookie settings are HttpOnly, scoped to the demo, and logout expires them", () => {
  const active = getDemoSessionCookieOptions(true);
  assert.equal(active.httpOnly, true);
  assert.equal(active.secure, true);
  assert.equal(active.sameSite, "lax");
  assert.equal(active.path, "/cv-studio");
  assert.ok(active.maxAge > 0);

  const expired = getDemoSessionCookieOptions(true, true);
  assert.equal(expired.maxAge, 0);
});

test("all three source SHA-256 hashes resolve and an unknown hash fails closed", () => {
  assert.deepEqual(
    demoCandidates.map((candidate) => resolveCandidateIdBySourceHash(candidate.source.sha256)),
    ["marieke", "thomas", "sophie"],
  );
  assert.equal(resolveCandidateIdBySourceHash("0".repeat(64)), null);
});

test("all named and anonymous output mappings match the supplied filenames", () => {
  const expected = {
    marieke: {
      named: ["04_Bluefin_Marieke_van_Dijk.docx", "05_Bluefin_Marieke_van_Dijk.pdf"],
      anonymous: ["06_Bluefin_Marieke_van_Dijk_ANONIEM.docx", "07_Bluefin_Marieke_van_Dijk_ANONIEM.pdf"],
    },
    thomas: {
      named: ["08_Bluefin_Thomas_de_Boer.docx", "09_Bluefin_Thomas_de_Boer.pdf"],
      anonymous: ["10_Bluefin_Thomas_de_Boer_ANONIEM.docx", "11_Bluefin_Thomas_de_Boer_ANONIEM.pdf"],
    },
    sophie: {
      named: ["12_Bluefin_Sophie_Jansen.docx", "13_Bluefin_Sophie_Jansen.pdf"],
      anonymous: ["14_Bluefin_Sophie_Jansen_ANONIEM.docx", "15_Bluefin_Sophie_Jansen_ANONIEM.pdf"],
    },
  } as const;

  for (const candidate of demoCandidates) {
    for (const variant of ["named", "anonymous"] as const) {
      assert.deepEqual(
        [getDemoOutputAsset(candidate.id, variant, "docx")?.fileName, getDemoOutputAsset(candidate.id, variant, "pdf")?.fileName],
        expected[candidate.id][variant],
      );
    }
  }
});

test("the 15 supplied assets are present, readable, and the three source hashes match", async () => {
  const files = (await readdir(assetDirectory)).sort();
  assert.equal(files.length, 15);

  for (const fileName of files) {
    const fileStat = await stat(join(assetDirectory, fileName));
    assert.ok(fileStat.size > 0, `${fileName} should not be empty`);
  }

  for (const candidate of demoCandidates) {
    const source = await readFile(join(assetDirectory, candidate.source.fileName));
    assert.equal(createHash("sha256").update(source).digest("hex"), candidate.source.sha256);
  }
});

test("download mappings expose the correct MIME types", () => {
  const docx = getDemoOutputAsset("marieke", "named", "docx");
  const pdf = getDemoOutputAsset("marieke", "named", "pdf");
  assert.equal(docx?.mimeType, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  assert.equal(pdf?.mimeType, "application/pdf");
});

test("all six final Bluefin PDFs are valid one-page files", async () => {
  for (const candidate of demoCandidates) {
    for (const variant of ["named", "anonymous"] as const) {
      const asset = getDemoOutputAsset(candidate.id, variant, "pdf");
      assert.ok(asset);

      const file = await readFile(join(assetDirectory, asset.fileName));
      const pdfSource = file.toString("latin1");
      assert.equal(file.subarray(0, 5).toString("ascii"), "%PDF-", `${asset.fileName} should be a PDF`);
      assert.match(pdfSource, /%%EOF\s*$/, `${asset.fileName} should have a valid PDF trailer`);
      assert.equal(
        pdfSource.match(/\/Type\s*\/Page\b/g)?.length,
        1,
        `${asset.fileName} should contain exactly one page`,
      );
    }
  }
});

test("all six final Bluefin DOCX files remain editable OOXML packages", async () => {
  for (const candidate of demoCandidates) {
    for (const variant of ["named", "anonymous"] as const) {
      const asset = getDemoOutputAsset(candidate.id, variant, "docx");
      assert.ok(asset);

      const file = await readFile(join(assetDirectory, asset.fileName));
      assert.equal(file.subarray(0, 4).toString("hex"), "504b0304", `${asset.fileName} should be an OOXML ZIP package`);
    }
  }
});

test("the result screen derives preview and both downloads from the active variant", async () => {
  const resultScreen = await readFile(join(projectRoot, "components/cv-studio/ResultScreen.tsx"), "utf8");
  assert.match(resultScreen, /useState<DemoVariant>\(initialVariant\)/);
  assert.match(resultScreen, /setVariant\("named"\)/);
  assert.match(resultScreen, /setVariant\("anonymous"\)/);
  assert.match(resultScreen, /fileUrl\(candidate\.id, variant, "docx"\)/);
  assert.match(resultScreen, /fileUrl\(candidate\.id, variant, "pdf"\)/);
  assert.match(resultScreen, /fileUrl\(candidate\.id, variant, "pdf", true\)/);
});

test("the private CV Studio shell uses generic product language and centralized demo display values", async () => {
  const uiFiles = [
    "app/cv-studio/layout.tsx",
    "app/cv-studio/(app)/dashboard/page.tsx",
    "app/cv-studio/(app)/conversies/page.tsx",
    "app/cv-studio/(app)/conversies/nieuw/page.tsx",
    "app/cv-studio/(app)/templates/page.tsx",
    "app/cv-studio/(app)/instellingen/page.tsx",
    "components/cv-studio/AppShell.tsx",
    "components/cv-studio/LoginScreen.tsx",
    "components/cv-studio/NewConversion.tsx",
    "components/cv-studio/ProcessingScreen.tsx",
    "components/cv-studio/ResultScreen.tsx",
  ];
  const privateUi = (await Promise.all(uiFiles.map((file) => readFile(join(projectRoot, file), "utf8")))).join("\n");
  const displayConfig = await readFile(join(projectRoot, "lib/cv-studio/demo-display-config.ts"), "utf8");

  assert.doesNotMatch(privateUi, /Bluefin demo|CV Studio voor Bluefin|Bluefin-cv wordt voorbereid|Genereer Bluefin-cv|Bluefin-output/i);
  assert.match(privateUi, /Inloggen op CV Studio/);
  assert.match(privateUi, /Log in om CV Studio te openen/);
  assert.match(privateUi, /PHILOO CV STUDIO/);
  assert.match(displayConfig, /userName:\s*"Wouter"/);
  assert.match(displayConfig, /userEmail:\s*"wouter@bluefin\.nl"/);
  assert.match(displayConfig, /companyName:\s*"Bluefin"/);
  assert.match(displayConfig, /templateName:\s*"Bluefin"/);
});

test("app pages and file downloads keep the demo session boundary", async () => {
  const [appLayout, fileRoute] = await Promise.all([
    readFile(join(projectRoot, "app/cv-studio/(app)/layout.tsx"), "utf8"),
    readFile(join(projectRoot, "app/cv-studio/api/files/[candidateId]/[variant]/[format]/route.ts"), "utf8"),
  ]);

  assert.match(appLayout, /await requireDemoSession\(\)/);
  assert.match(fileRoute, /await getDemoSession\(\)/);
  assert.match(fileRoute, /status:\s*401/);
  assert.match(fileRoute, /Content-Disposition/);
  assert.match(fileRoute, /Content-Type/);
  assert.match(fileRoute, /no-store/);
});

test("the public site does not link to the private /cv-studio route and the route is noindex", async () => {
  const [home, header, sitemap, layout, robots] = await Promise.all([
    readFile(join(projectRoot, "components/site/HomePage.tsx"), "utf8"),
    readFile(join(projectRoot, "components/site/SiteHeader.tsx"), "utf8"),
    readFile(join(projectRoot, "app/sitemap.ts"), "utf8"),
    readFile(join(projectRoot, "app/cv-studio/layout.tsx"), "utf8"),
    readFile(join(projectRoot, "app/robots.ts"), "utf8"),
  ]);

  assert.doesNotMatch(home, /href:\s*"\/cv-studio"/);
  assert.doesNotMatch(header, /href:\s*"\/cv-studio"/);
  assert.doesNotMatch(sitemap, /["']\/cv-studio["']/);
  assert.match(layout, /index:\s*false/);
  assert.match(layout, /follow:\s*false/);
  assert.match(robots, /"\/cv-studio"/);
});
