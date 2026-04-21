import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

// ── Validation schema (mirrors the client form) ────────────────────────────
const inquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  country: z.string().min(2),

  userType: z.enum([
    "buyer",
    "supplier",
    "agent",
    "retail",
    "service",
    "investor",
    "other",
  ]),

  companyName: z.string().optional().default(""),
  businessType: z.string().optional().default(""),
  productInterest: z.string().optional().default(""),
  quantity: z.string().optional().default(""),
  frequency: z.string().optional().default(""),
  targetPrice: z.string().optional().default(""),
  destinationPort: z.string().optional().default(""),

  productOffered: z.string().optional().default(""),
  certifications: z.string().optional().default(""),
  supplyCapacity: z.string().optional().default(""),
  location: z.string().optional().default(""),

  yearsExperience: z.string().optional().default(""),
  regionCovered: z.string().optional().default(""),
  previousClients: z.string().optional().default(""),

  message: z.string().min(10),
  seriousBuyer: z.boolean().optional().default(false),

  // Honeypot: bots often auto-fill this. Accept any string at the schema
  // layer so the request still parses, then silently drop below.
  website: z.string().optional().default(""),
});

type Inquiry = z.infer<typeof inquirySchema>;

// Columns appear in this exact order in every CSV — consistent schema means
// the files open cleanly in Excel / Google Sheets regardless of category.
const CSV_COLUMNS = [
  "submittedAt",
  "userType",
  "fullName",
  "companyName",
  "email",
  "phone",
  "country",
  "businessType",
  "productInterest",
  "quantity",
  "frequency",
  "targetPrice",
  "destinationPort",
  "productOffered",
  "certifications",
  "supplyCapacity",
  "location",
  "yearsExperience",
  "regionCovered",
  "previousClients",
  "seriousBuyer",
  "message",
  "ip",
  "userAgent",
] as const;

type Row = Record<(typeof CSV_COLUMNS)[number], string>;

function escapeCsv(value: string): string {
  const s = (value ?? "").toString();
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function buildRow(data: Inquiry, meta: { ip: string; userAgent: string }): Row {
  return {
    submittedAt: new Date().toISOString(),
    userType: data.userType,
    fullName: data.fullName,
    companyName: data.companyName ?? "",
    email: data.email,
    phone: data.phone,
    country: data.country,
    businessType: data.businessType ?? "",
    productInterest: data.productInterest ?? "",
    quantity: data.quantity ?? "",
    frequency: data.frequency ?? "",
    targetPrice: data.targetPrice ?? "",
    destinationPort: data.destinationPort ?? "",
    productOffered: data.productOffered ?? "",
    certifications: data.certifications ?? "",
    supplyCapacity: data.supplyCapacity ?? "",
    location: data.location ?? "",
    yearsExperience: data.yearsExperience ?? "",
    regionCovered: data.regionCovered ?? "",
    previousClients: data.previousClients ?? "",
    seriousBuyer: data.seriousBuyer ? "yes" : "no",
    message: data.message,
    ip: meta.ip,
    userAgent: meta.userAgent,
  };
}

async function appendCsvRow(filePath: string, row: Row) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  let exists = true;
  try {
    await fs.access(filePath);
  } catch {
    exists = false;
  }
  if (!exists) {
    await fs.writeFile(filePath, CSV_COLUMNS.map(escapeCsv).join(",") + "\n", "utf8");
  }
  const line = CSV_COLUMNS.map((col) => escapeCsv(row[col])).join(",") + "\n";
  await fs.appendFile(filePath, line, "utf8");
}

// Phase-1 simple rate-limit: in-memory per-IP counter (resets on redeploy).
// Phase-2 will move this to Redis / Upstash.
const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return true;
  }
  rec.count += 1;
  return rec.count <= LIMIT;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many inquiries from your network. Try again later." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed. Please check your entries." },
      { status: 400 }
    );
  }

  // Honeypot — bots fill this; silently accept and drop
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const row = buildRow(parsed.data, { ip, userAgent });

  // Storage root — override via env if needed
  const dataDir =
    process.env.INQUIRY_DATA_DIR ||
    path.join(process.cwd(), "data", "inquiries");

  const categoryFile = path.join(dataDir, `${parsed.data.userType}.csv`);
  const masterFile = path.join(dataDir, "all.csv");
  const jsonLog = path.join(dataDir, "inquiries.jsonl");

  try {
    await Promise.all([
      appendCsvRow(categoryFile, row),
      appendCsvRow(masterFile, row),
      (async () => {
        await fs.mkdir(path.dirname(jsonLog), { recursive: true });
        await fs.appendFile(jsonLog, JSON.stringify(row) + "\n", "utf8");
      })(),
    ]);
  } catch (err) {
    console.error("Failed to persist inquiry:", err);
    // We still respond 200 so the user isn't blocked; admin can re-ingest from
    // the JSONL log. In Phase 2, this will move to a DB transaction.
  }

  // TODO (Phase 2): send email to sales@ via nodemailer / Resend
  // TODO (Phase 3): push to Zoho CRM + WhatsApp + auto-reply

  console.log(
    `[inquiry] ${row.userType} · ${row.fullName} · ${row.email} · ${row.country}`
  );

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "POST inquiries to this endpoint." });
}
