import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const htmlPath = "/workspace/.grok/og-card.html";
const heroPath = "/workspace/public/images/hero.jpg";
const outPng = "/workspace/.grok/card-raw.png";

const heroB64 = readFileSync(heroPath).toString("base64");
const html = readFileSync(htmlPath, "utf8").replace(
  "HERO_SRC",
  `data:image/jpeg;base64,${heroB64}`,
);

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: "networkidle", timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: outPng, type: "png", omitBackground: false });
  console.log(JSON.stringify({ ok: true, screenshot: outPng }));
} finally {
  await browser.close();
}
