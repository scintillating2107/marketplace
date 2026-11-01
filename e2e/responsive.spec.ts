import { test, expect } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

for (const vp of viewports) {
  test(`layout has no horizontal overflow (${vp.name})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Home services at your doorstep/i })).toBeVisible();

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 2;
    });
    expect(overflow).toBe(false);

    await page.goto("/explore");
    await expect(page.getByText(/results/i)).toBeVisible({ timeout: 15_000 });
    const exploreOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 2;
    });
    expect(exploreOverflow).toBe(false);
  });
}
