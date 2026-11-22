import crypto from "node:crypto";
import { cookies } from "next/headers";

export type Session = { id: string; name: string; avatar: string | null; inGuild: boolean; roles: string[]; exp: number };
export const SESSION_COOKIE = "carp_session";
export const SESSION_TTL = 6 * 3600; // seconds; roles refresh at the next login

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be set (32+ characters)");
  return s;
};
const sig = (p: string) => crypto.createHmac("sha256", secret()).update(p).digest("base64url");

export function sign(s: Session) {
  const p = Buffer.from(JSON.stringify(s)).toString("base64url");
  return `${p}.${sig(p)}`;
}

export function verify(token?: string): Session | null {
  try {
    if (!token) return null;
    const [p, s] = token.split(".");
    if (!p || !s) return null;
    const a = Buffer.from(s), b = Buffer.from(sig(p));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const d = JSON.parse(Buffer.from(p, "base64url").toString()) as Session;
    return d.exp > Date.now() ? d : null;
  } catch {
    return null;
  }
}

export const getSession = () => verify(cookies().get(SESSION_COOKIE)?.value);

export const cookieOpts = (maxAge: number) => ({
  httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge,
});

export const siteOrigin = (reqUrl: string) => process.env.SITE_URL || new URL(reqUrl).origin;

export const avatarUrl = (id: string, avatar: string | null) =>
  avatar
    ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/${Number((BigInt(id) >> BigInt(22)) % BigInt(6))}.png`;
