# California State Roleplay (CARP) website

Next.js 14 + TypeScript. Phase 1: design system, animated hexagon background, public pages.

## Run locally
1. Install Node.js 20 or newer.
2. `npm install`
3. `npm run dev` then open http://localhost:3000

## Logo
Put your logo in `public/logo.png` (rename `CARPs.png` to `logo.png`). The site works without it.

## Deploy
1. Push this folder to a GitHub repository (do not upload `node_modules`).
2. On vercel.com, click Add New > Project, import the repository, click Deploy.
3. Optional: add `NEXT_PUBLIC_DISCORD_INVITE` in Project Settings > Environment Variables.

## Edit content
Rules, departments, Discord link and ERLC code live in `lib/config.ts`.

## Roadmap
Phase 2 Discord login and roles, 3 ER:LC live dashboard, 4 database (applications, support, announcements, staff), 5 dashboards and admin panel, 6 search, notifications, audit logs, maintenance mode.
Pages marked "Coming in phase X" are honest placeholders, not working features.

## Phase 2: Discord login and roles
- Login uses Discord OAuth2 (scopes `identify` and `guilds.members.read`). No bot is needed.
- Roles are read from Discord at login and stored in a signed, httpOnly cookie. The browser cannot change it.
- Every dashboard checks roles on the server. Edit groups and dashboards in `lib/roles.ts`.
- Role changes take effect at the next login (sessions last 6 hours).
- Redirect URL to add in the Discord Developer Portal (OAuth2 > Redirects): `https://YOUR-SITE/api/auth/callback`
