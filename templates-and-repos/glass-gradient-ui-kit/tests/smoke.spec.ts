import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Ausgangspunkt fuer neue Projekte auf Basis dieses Starters. Routen/Selektoren
// in einem echten Projekt entsprechend erweitern (siehe PLAYWRIGHT_TESTING_GUIDE.md).

test("a11y scan: Startseite (ShaderGradientHero + LiquidGlassNavbar)", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("Navbar-Links sind per Tastatur erreichbar", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(() => document.activeElement?.textContent);
  expect(firstFocused).toBeTruthy();
});

test("Hero Signature Moment — visueller Snapshot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(500); // Shader-Einschwingzeit (Shadergradient + Liquidglass)
  await expect(page).toHaveScreenshot("hero-desktop.png", { maxDiffPixelRatio: 0.02 });
});
