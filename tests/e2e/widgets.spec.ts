import { test, expect } from "@playwright/test";

test.describe("Floating widgets", () => {
  test("WhatsApp button appears and links to wa.me", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByTestId("whatsapp-button");
    await expect(btn).toBeVisible({ timeout: 15_000 });
    const href = await btn.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });

  test("Chatbot opens and answers a FAQ", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("chatbot-toggle");
    await expect(toggle).toBeVisible({ timeout: 15_000 });
    await toggle.click();
    await expect(page.getByTestId("chatbot-dialog")).toBeVisible();
    await page.getByTestId("chatbot-input").fill("What is your MOQ?");
    await page.getByTestId("chatbot-send").click();
    await expect(page.getByText(/Minimum Order Quantity/i)).toBeVisible();
  });
});
