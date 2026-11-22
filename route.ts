import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, siteOrigin } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(`${siteOrigin(req.url)}/`, 303);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
