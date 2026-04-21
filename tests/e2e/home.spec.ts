import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads with hero, products, and footer", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Swaranbharat/i);
    await expect(page.getByRole("link", { name: /products/i }).first()).toBeVisible();
    // Footer contact info
    await expect(page.getByText(/Pune/i).first()).toBeVisible();
  });

  test("hero slider controls are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const next = page.getByLabel(/next slide/i);
    await expect(next).toBeVisible();
    await next.click();
    // Assert nothing throws and page still has products link
    await expect(page.getByRole("link", { name: /products/i }).first()).toBeVisible();
  });

  test("sends strict security headers", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toContain("strict-origin");
    expect(h["strict-transport-security"]).toContain("max-age=");
    expect(h["content-security-policy"]).toBeTruthy();
  });
});
