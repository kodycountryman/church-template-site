# Kindred Church — Template Site

A modern, full-stack church website template with a complete in-browser CMS demo.

> Built as a portfolio piece by [Kody Countryman](mailto:countrymankody14@gmail.com). Want one for your church? Visit `/template` on the live demo, or email me.

---

## What's inside

**Public site** — 9 marketing pages
- Home with full-bleed photo hero
- About, Visit, Sermons (archive + detail), Events (list + detail + RSVP), Give (Stripe-style flow), Ministries, Journal (blog), Contact

**Custom CMS** at `/admin` — every screen is real, fully interactive, no real backend required
- Dashboard with giving chart, recent activity feed, upcoming events
- **Members directory** (47 seeded people, 18 households) with grid + list view, status filters, search
- **Person profile** with attendance stats, activity timeline, household + family relationships, pastoral notes
- **Check-in kiosk** — Sunday-morning view with family search, one-tap kid check-in, live recent-checkins feed
- **Schedule** — week-by-week volunteer scheduler across 4 teams with confirmed / pending / declined statuses
- **Teams** roster page
- **Sermons / Events / Ministries / Blog** — full CRUD with cover image, status, slug auto-generation
- **Inbox** — combined view for contact-form messages and template lead submissions
- **Media library**, **Staff & roles**, **Settings**

---

## Tech

- **Next.js 16** (App Router, Server Components, Turbopack)
- **TypeScript** strict
- **Tailwind CSS v4** with custom design tokens
- **Zustand** (`sessionStorage` persistence) for the demo CMS state
- **Recharts** for dashboards
- **Sonner** for toasts
- **Lucide** icons
- Deployed on **Vercel**

---

## Run it locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

The admin lives at <http://localhost:3000/admin/login>. Any email + password works, or click **Enter demo as Pastor Mara**.

---

## Deploy to Cloudflare Workers

This project uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare).

**One-time setup in the Cloudflare dashboard** (Workers & Pages → connect repo):

| Setting | Value |
| --- | --- |
| **Worker name** | `church-template-site` (must match `name` in [wrangler.jsonc](./wrangler.jsonc) — mismatched names cause error code `10143`) |
| **Build command** | `pnpm run build:cf` (runs `next build` + bundles the OpenNext worker into `.open-next/`) |
| **Deploy command** | `npx wrangler deploy` (default) |
| **Root directory** | `/` |

If you only set the build command to `pnpm run build` (the default Cloudflare auto-detect), the deploy step won't find `.open-next/worker.js` and you'll see *"Could not find compiled Open Next config"*. Use `build:cf`.

**Local commands:**

```bash
pnpm dev        # local dev (next dev)
pnpm build      # quick TS/lint check (next build only)
pnpm build:cf   # full Cloudflare build (next build + opennextjs-cloudflare build)
pnpm preview    # build + preview the Worker locally with wrangler
pnpm deploy     # build + deploy to Cloudflare
```

You'll need `wrangler login` once before `pnpm deploy`.

---

## Hire me

Want a site like this for your church? It can be customized in 2–6 weeks. Three tiers, fixed-price.

📧 **countrymankody14@gmail.com**

See the `/template` page on the live site for pricing, process, and a project lead form.
