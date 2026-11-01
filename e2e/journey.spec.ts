import { test, expect } from "@playwright/test";

test("home → explore → book → dashboard journey", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Home services at your doorstep/i })).toBeVisible();

  await page.getByRole("button", { name: /deep cleaning/i }).first().click();
  await expect(page).toHaveURL(/\/explore\?q=/);

  await expect(page.getByText(/\d+ results/i)).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/book\?serviceId=/, { timeout: 15_000 }),
    page
      .getByRole("article")
      .filter({ hasText: /Full Home Deep Cleaning/i })
      .getByRole("link", { name: /^Book$/i })
      .click(),
  ]);

  await page.getByRole("button", { name: /^Continue$/i }).click();
  await page.getByRole("button", { name: /^Continue$/i }).click();

  await page.locator('input[type="date"]').fill("2030-06-15");
  await page.getByRole("button", { name: /11:00 AM – 1:00 PM/i }).click();
  await page.getByPlaceholder(/Flat, building, street/i).fill("Demo Flat 12, Andheri West");

  await page.getByRole("button", { name: /Review price/i }).click();
  await page.getByRole("button", { name: /Confirm booking/i }).click();

  await expect(page.getByRole("heading", { name: /You're booked/i })).toBeVisible({ timeout: 15_000 });

  await Promise.all([
    page.waitForURL("/dashboard", { timeout: 15_000 }),
    page.getByRole("link", { name: /View My Bookings/i }).click(),
  ]);
  await expect(page.getByText(/upcoming/i).first()).toBeVisible();
});
