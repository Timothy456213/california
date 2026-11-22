"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/config";

export default function Nav({ user }: { user: { name: string; avatar: string } | null }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <Link href="/" className="brand" onClick={close}>
        <img src="/logo.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
        <span>{site.short}</span>
      </Link>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      <nav className={open ? "links open" : "links"}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={close}
            className={(n.href === "/" ? path === "/" : path.startsWith(n.href)) ? "active" : ""}>{n.label}</Link>
        ))}
        <a className="btn small ghost" href={site.discord} target="_blank" rel="noopener">Discord</a>
        {user ? (
          <span className="profile">
            <Link href="/dashboard" onClick={close}><img className="avatar" src={user.avatar} alt="" />{user.name}</Link>
            <form action="/api/auth/logout" method="post"><button className="linkbtn" type="submit">Log out</button></form>
          </span>
        ) : (
          <a className="btn small" href="/api/auth/login">Login with Discord</a>
        )}
      </nav>
    </header>
  );
}
