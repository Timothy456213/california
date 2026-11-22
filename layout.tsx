import "./globals.css";
import type { Metadata } from "next";
import HexBackground from "@/components/HexBackground";
import Nav from "@/components/Nav";
import { site } from "@/lib/config";
import { avatarUrl, getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: `${site.name} (${site.short}): a professional Emergency Response: Liberty County roleplay community based in Los Angeles.`,
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const s = getSession();
  const user = s ? { name: s.name, avatar: avatarUrl(s.id, s.avatar) } : null;
  return (
    <html lang="en">
      <body>
        <HexBackground />
        <Nav user={user} />
        <main>{children}</main>
        <footer>
          <strong>{site.name}</strong> &middot; {site.tagline}
          <div>Not affiliated with any real government agency, Roblox or Police Roleplay Community.</div>
        </footer>
      </body>
    </html>
  );
}
