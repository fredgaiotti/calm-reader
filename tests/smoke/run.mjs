// Headless Chromium smoke test for Calm Reader's Readability pipeline.
// For each URL: navigate, inject vendored Readability.js, parse, score.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const READABILITY = fs.readFileSync(
  path.join(__dirname, "..", "..", "extension", "vendor", "Readability.js"),
  "utf8"
);

const URLS = [
  ["Wikipedia · Web browser",       "https://en.wikipedia.org/wiki/Web_browser"],
  ["Wikipedia · Mercury (planet)",  "https://en.wikipedia.org/wiki/Mercury_(planet)"],
  ["Paul Graham · Beating averages","https://paulgraham.com/avg.html"],
  ["Joel on Software · Never rewrite","https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/"],
  ["overreacted.io · useEffect",    "https://overreacted.io/a-complete-guide-to-useeffect/"],
  ["GitHub README · readability",   "https://github.com/mozilla/readability/blob/main/README.md"],
  ["Stack Overflow help",           "https://stackoverflow.com/help/how-to-ask"],
  ["Cloudflare blog · homepage",    "https://blog.cloudflare.com/"],
  ["The Verge · homepage",          "https://www.theverge.com/"],
];

const TIMEOUT = 25_000;

function score(article) {
  if (!article) return { ok: false, reason: "no parse" };
  const text = (article.textContent || "").trim();
  const len = text.length;
  if (len < 300)  return { ok: false, reason: `too short (${len} chars)`, len };
  return {
    ok: true,
    title:    article.title || "(no title)",
    byline:   article.byline || null,
    siteName: article.siteName || null,
    length:   len,
    excerpt:  text.slice(0, 140).replace(/\s+/g, " "),
  };
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const results = [];
for (const [label, url] of URLS) {
  const t0 = Date.now();
  let result;
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT });
    // small idle so SPA frames hydrate
    await new Promise((r) => setTimeout(r, 1500));
    const article = await page.evaluate((readabilitySrc) => {
      // eslint-disable-next-line no-new-func
      new Function(readabilitySrc + "; window.Readability = Readability;")();
      try {
        const a = new window.Readability(document.cloneNode(true)).parse();
        if (!a) return null;
        return {
          title: a.title, byline: a.byline, siteName: a.siteName,
          textContent: a.textContent || "",
        };
      } catch (e) {
        return { _err: String(e) };
      }
    }, READABILITY);
    await page.close();
    const ms = Date.now() - t0;
    if (article && article._err) result = { ok: false, reason: article._err, ms };
    else result = { ...score(article), ms };
  } catch (e) {
    result = { ok: false, reason: String(e.message || e), ms: Date.now() - t0 };
  }
  results.push({ label, url, ...result });
  const tag = result.ok ? "PASS" : "FAIL";
  const detail = result.ok
    ? `${String(result.length).padStart(6)} chars · ${result.title}`
    : `reason: ${result.reason}`;
  console.log(`[${tag}] ${result.ms}ms · ${label}\n        ${detail}\n`);
}

await browser.close();

const passes = results.filter((r) => r.ok).length;
const total = results.length;
console.log(`\n=== ${passes}/${total} passed ===`);

const reportPath = path.join(__dirname, "report.md");
const md = [
  "# Calm Reader — Smoke Test Report",
  "",
  `Run: ${new Date().toISOString()}`,
  `Result: **${passes}/${total} passed**`,
  "",
  "| Result | Site | ms | Chars | Title |",
  "|--------|------|---:|------:|-------|",
  ...results.map((r) => {
    const t = r.ok ? "PASS" : "FAIL";
    const chars = r.ok ? String(r.length) : "-";
    const title = r.ok ? r.title.replace(/\|/g, "\\|") : `_${r.reason}_`;
    return `| ${t} | ${r.label} | ${r.ms} | ${chars} | ${title} |`;
  }),
  "",
  "## Excerpts",
  ...results.filter((r) => r.ok).flatMap((r) => [
    `### ${r.label}`,
    `- **Title:** ${r.title}`,
    r.byline   ? `- **Byline:** ${r.byline}`   : null,
    r.siteName ? `- **Site:** ${r.siteName}`   : null,
    `- **Length:** ${r.length} chars`,
    `- **Excerpt:** ${r.excerpt}…`,
    "",
  ].filter(Boolean)),
].join("\n");
fs.writeFileSync(reportPath, md);
console.log(`Report: ${reportPath}`);

process.exit(passes === total ? 0 : 1);
