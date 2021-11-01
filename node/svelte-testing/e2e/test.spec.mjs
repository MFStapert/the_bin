import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  // Given
  await page.goto("http://localhost:5000/");
  const title = page.locator("h1");

  // Then
  await expect(title).toHaveText("world");
});
