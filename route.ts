import { NextRequest, NextResponse } from "next/server";
import { cookieOpts, SESSION_COOKIE, SESSION_TTL, sign, siteOrigin } from "@/lib/session";
import { allRoleIds } from "@/lib/roles";

export const dynamic = "force-dynamic";
const t = () => AbortSignal.timeout(8000);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = siteOrigin(req.url);
  const fail = (m: string) => NextResponse.redirect(`${origin}/dashboard?error=${encodeURIComponent(m)}`);
  const code = url.searchParams.get("code"), state = url.searchParams.get("state");
  const saved = req.cookies.get("carp_state")?.value;
  if (!code || !state || !saved || state !== saved) return fail("Login expired. Please try again.");
  try {
    const tok = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, signal: t(),
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!, client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code", code, redirect_uri: `${origin}/api/auth/callback`,
      }),
    });
    if (!tok.ok) return fail("Discord rejected the login. Check the redirect URL in the Discord Developer Portal.");
    const { access_token } = await tok.json();
    const h = { Authorization: `Bearer ${access_token}` };
    const me = await fetch("https://discord.com/api/users/@me", { headers: h, signal: t() });
    if (!me.ok) return fail("Could not read your Discord profile.");
    const user = await me.json();
    const mem = await fetch(`https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`, { headers: h, signal: t() });
    let inGuild = false, roles: string[] = [];
    if (mem.ok) {
      const m = await mem.json();
      inGuild = true;
      roles = ((m.roles || []) as string[]).filter((r) => allRoleIds.includes(r));
    }
    const res = NextResponse.redirect(`${origin}/dashboard`);
    res.cookies.set(SESSION_COOKIE, sign({
      id: user.id, name: user.global_name || user.username, avatar: user.avatar ?? null,
      inGuild, roles, exp: Date.now() + SESSION_TTL * 1000,
    }), cookieOpts(SESSION_TTL));
    res.cookies.set("carp_state", "", { path: "/", maxAge: 0 });
    return res;
  } catch {
    return fail("Something went wrong while signing in. Please try again.");
  }
}
