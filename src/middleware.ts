import { NextResponse, type NextRequest } from "next/server";

// Maintenance-mode toggle.
// Set MAINTENANCE_MODE=true in your hosting env to serve the branded
// /maintenance page with HTTP 503 for all routes except /maintenance itself,
// /api/health, and static assets. Flip it back to false with zero redeploy.
export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  const { pathname } = req.nextUrl;
  const bypass =
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/logo") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/products/") || // static images
    /\.(png|jpe?g|svg|ico|webp|avif|css|js|woff2?)$/i.test(pathname);

  if (bypass) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  const res = NextResponse.rewrite(url, { status: 503 });
  res.headers.set("Retry-After", "300");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
