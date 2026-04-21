import { NextResponse } from "next/server";

// Lightweight health endpoint for uptime monitoring (UptimeRobot, Better Uptime,
// k6, Cloudflare Health Checks, etc.). Never blocked by middleware.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "swaranbharat-website",
    version: process.env.APP_VERSION || "dev",
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
}
