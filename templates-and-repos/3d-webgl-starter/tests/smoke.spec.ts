import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Ausgangspunkt fuer neue Projekte auf Basis dieses Starters. Routen/Selektoren
// in einem echten Projekt entsprechend erweitern (siehe PLAYWRIGHT_TESTING_GUIDE.md).

test("a11y scan: Startseite", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("genau ein WebGL-Kontext beim Laden", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(300); // Canvas-Mount-/Shader-Init-Fenster
  const canvasCount = await page.evaluate(() => document.querySelectorAll("canvas").length);
  expect(canvasCount).toBe(1);
});

test("Distortion-Plane Signature Moment — visueller Snapshot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(500); // Shader-Einschwingzeit
  await expect(page).toHaveScreenshot("distortion-plane-desktop.png", {
    maxDiffPixelRatio: 0.02,
  });
});
