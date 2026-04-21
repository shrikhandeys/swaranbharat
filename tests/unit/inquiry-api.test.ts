import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "swb-inq-"));
process.env.INQUIRY_DATA_DIR = path.join(tmpRoot, "data", "inquiries");

async function post(body: Record<string, unknown>, ip: string) {
  const { POST } = await import("@/app/api/inquiry/route");
  const req = new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
  // NextRequest is a superset of Request; cast is safe at runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return POST(req as any);
}

const base = {
  fullName: "Test Buyer",
  email: "buyer@acmecorp.com",
  phone: "+19085551234",
  country: "United States",
  userType: "buyer",
  companyName: "Acme Corp",
  businessType: "Importer",
  productInterest: "Moringa Powder",
  quantity: "500 kg",
  frequency: "monthly",
  destinationPort: "New York",
  message: "We are looking for regular supply of organic moringa leaf powder.",
  seriousBuyer: true,
  website: "",
};

describe("/api/inquiry", () => {
  beforeAll(() => {
    fs.mkdirSync(process.env.INQUIRY_DATA_DIR!, { recursive: true });
  });
  beforeEach(() => {
    const dir = process.env.INQUIRY_DATA_DIR!;
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  });
  afterAll(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("accepts a valid buyer inquiry and writes CSV + JSONL", async () => {
    const res = await post(base, "9.9.9.1");
    expect(res.status).toBe(200);
    const dir = process.env.INQUIRY_DATA_DIR!;
    expect(fs.existsSync(path.join(dir, "all.csv"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "buyer.csv"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "inquiries.jsonl"))).toBe(true);
    expect(fs.readFileSync(path.join(dir, "buyer.csv"), "utf8")).toContain("Acme Corp");
  });

  it("rejects invalid email with 400", async () => {
    const res = await post({ ...base, email: "not-an-email" }, "9.9.9.2");
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const res = await post({ ...base, website: "https://spam.example" }, "9.9.9.3");
    expect(res.status).toBe(200);
    const dir = process.env.INQUIRY_DATA_DIR!;
    expect(fs.existsSync(path.join(dir, "all.csv"))).toBe(false);
  });

  it("rate-limits the same IP after 5 submissions", async () => {
    const ip = "9.9.9.4";
    for (let i = 0; i < 5; i++) {
      const ok = await post(base, ip);
      expect(ok.status).toBe(200);
    }
    const blocked = await post(base, ip);
    expect(blocked.status).toBe(429);
  });
});
