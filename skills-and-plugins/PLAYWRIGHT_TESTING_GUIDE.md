---
name: playwright-testing-guide
description: Setup und Beispieltests für den verpflichtenden Playwright + axe-core Testing-Layer (E2E, visuelle Regression, Accessibility). Vor jedem Projekt-Setup und vor jedem CI-Gate konsultieren (siehe CLAUDE.md Abschnitt 2e/2f).
---

# Playwright + axe-core Testing Guide

Schließt die Lücke, die in mehreren Projekten bereits sichtbar wurde: Bugs wie
z-index-Stacking-Fehler (Partikelfeld über Text), blockiertes Scrollen in
Dropdown-Panels (Lenis fängt Wheel-Events global ab) oder leere Grid-
Restflächen bei ungerader Item-Zahl wurden bisher ausschließlich durch
manuelles Screenshot-Review NACH dem Bauen entdeckt. Diese Testsuite fängt
genau diese Kategorie strukturell ab. Audit: `/security-audits/AUDIT_LOG.md`
#29/#30.

## 1. Installation (pro Projekt)

```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install --with-deps chromium
```

`package.json` ergänzen:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:update-snapshots": "playwright test --update-snapshots"
  }
}
```

## 2. `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    // Reduced-Motion konsequent auch im Test respektieren (CLAUDE.md Abschnitt 1).
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
```

## 3. Accessibility-Scan (`tests/accessibility.spec.ts`)

Pflicht: mindestens ein Scan pro Hauptseiten-Route.

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/ueber-mich", "/kontakt"]; // pro Projekt auf echte Routen anpassen

for (const route of routes) {
  test(`a11y scan: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
```

## 4. Visuelle Regression für Signature-Moments (`tests/visual.spec.ts`)

Pflicht: mindestens ein Snapshot-Test pro Signature-Moment-Section (siehe
CLAUDE.md Abschnitt 1) und pro Breakpoint.

```ts
import { test, expect } from "@playwright/test";

test.describe("Hero Signature Moment", () => {
  test("Desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(500); // Shader-/GSAP-Einschwingzeit
    await expect(page).toHaveScreenshot("hero-desktop.png", { maxDiffPixelRatio: 0.02 });
  });

  test("Mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("hero-mobile.png", { maxDiffPixelRatio: 0.02 });
  });
});
```

## 5. Interaktionstest für Dropdown/Drawer/Modal (`tests/interactions.spec.ts`)

Deckt exakt die Fehlerklasse ab, die bereits real aufgetreten ist (Lenis
blockiert internes Scrollen in einem `overflow: auto`-Panel).

```ts
import { test, expect } from "@playwright/test";

test("Dropdown-Panel scrollt intern, Hauptseite bleibt stehen", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /leistungen/i }).click();

  const panel = page.getByTestId("nav-dropdown-panel");
  await expect(panel).toBeVisible();

  const scrollBefore = await page.evaluate(() => window.scrollY);
  await panel.hover();
  await page.mouse.wheel(0, 400);
  const scrollAfter = await page.evaluate(() => window.scrollY);

  expect(scrollAfter).toBe(scrollBefore); // Hauptseite darf sich NICHT bewegt haben
});
```

`data-testid="nav-dropdown-panel"` muss im jeweiligen Projekt auf das echte
Panel gesetzt werden (z. B. in `NavDropdown.tsx`).

## 6. WebGL-Kontext-Zähler-Test (projektspezifische Kernregel)

Für Projekte mit der "nur EIN WebGL-Kontext gleichzeitig"-Regel (siehe
`CONCEPT.md`-Muster in bestehenden Projekten):

```ts
import { test, expect } from "@playwright/test";

test("nie mehr als ein aktiver WebGL-Kontext gleichzeitig", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /ueber mich/i }).click();
  await page.waitForTimeout(300); // Übergangs-/Unmount-Fenster

  const canvasCount = await page.evaluate(
    () => document.querySelectorAll("canvas").length
  );
  expect(canvasCount).toBeLessThanOrEqual(1);
});
```

## 7. Einbindung ins CI-Gate

Läuft in `ci-cd-templates/ci.yml` als Pflicht-Schritt nach `npm run build` —
ein PR mit rotem Playwright-Lauf wird nicht gemergt, unabhängig vom
CodeRabbit-Status (CLAUDE.md Abschnitt 2f).

## 8. Was Playwright NICHT ersetzt

- CodeRabbit bleibt zuständig für Code-Struktur-Findings (Memory Leaks,
  fehlendes Dispose, `any`-Types) — Playwright testet Verhalten, nicht
  Code-Qualität.
- Die manuelle `taste-skill-checklist.md`-Prüfung bleibt bestehen — ein
  automatisierter Test kann nicht beurteilen, ob ein Screen "wie eine
  bewusste Entscheidung" wirkt.
