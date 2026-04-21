import { test, expect } from "@playwright/test";

test.describe("/api/inquiry", () => {
  test("rejects invalid body with 400", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: { fullName: "x" },
    });
    expect(res.status()).toBe(400);
  });

  test("accepts a valid payload with 200", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: {
        fullName: "E2E Buyer",
        email: "e2e@example.com",
        phone: "+14155551234",
        country: "United States",
        userType: "buyer",
        companyName: "E2E Corp",
        businessType: "Importer",
        productInterest: "Moringa Powder",
        quantity: "200 kg",
        frequency: "monthly",
        message: "We'd like to order regular supply of moringa powder.",
        seriousBuyer: true,
        website: "",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

test("health endpoint returns ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.status).toBe("ok");
});
