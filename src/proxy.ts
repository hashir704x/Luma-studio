import { NextResponse } from "next/server";
import type { NextProxy } from "next/server";

import { auth } from "@/lib/auth";

export const proxy: NextProxy = async (request) => {
  const { pathname, search } = request.nextUrl;

  // Guardrail: config.matcher should already scope this to `/studio/:path*`,
  // but keep this check to avoid accidental broad coverage if matcher changes.
  if (!pathname.startsWith("/studio")) return NextResponse.next();

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) return NextResponse.next();

  const redirectUrl = new URL("/", request.url);
  //   redirectUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(redirectUrl);
};

export const config = {
  matcher: ["/studio/:path*"],
};
