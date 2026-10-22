# Khrisanty Galih Mestikasari — Portfolio

A static portfolio for a Chemical Analyst / QC specialist, written for HR and recruiters. Content structure follows the reference CV portfolio; visual style is Calendly + cloudstudio in a nude palette.

Next.js 16 (App Router, Cache Components) · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Zod · pnpm.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static build; fails if content is invalid
pnpm lint && pnpm typecheck && pnpm format:check
```

## Editing content

All copy lives in `content/` and is validated with Zod at build time (`content/schema.ts`).

| What                                                                                            | Where                                                 |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Name, hero, summary + stats, skills, experience, education, certifications, activities, contact | `content/profile.ts`                                  |
| Case studies (one file each)                                                                    | `content/work/*.ts`, registered in `content/index.ts` |

- **Metrics:** each case has `metrics: [{ label, value: null }]`. A metric stays hidden until `value` is set, so only fill it in with confirmed numbers.
- **Process diagrams** are generated from `process[]` (3–5 steps; `label` max 18 characters).

## Swapping placeholders

| Placeholder  | How to replace                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| LinkedIn URL | `linkedin` in `content/profile.ts`                                                                                                      |
| Photos       | There are none on purpose. Every photo slot is a `PhotoPlaceholder` (nude gradient); swap it for `next/image` at the same aspect ratio. |
| CV           | Replace `public/cv.pdf`                                                                                                                 |
| Domain       | Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in Netlify. Canonical URLs, the sitemap, robots and JSON-LD all use it.                  |

- **Stats** (`summary.stats`) must stay backed by the CV. `count` drives the count-up animation.
- **Work Experience carousel:** the mini process diagram on each card comes from the role's first case study; roles without one use `flow`.

## Loading screen

`components/loader/` holds the welcome screen ("Welcome to Galih's Portfolio."): a Canvas 2D particle atom (cloud, nucleus, three orbits) with no extra dependencies.

- Shown on every full page load (first visit or refresh). It enters the site on its own after ~3.2s (1.2s with reduced motion). "Skip intro" or Esc enters right away.
- `lib/loader.ts` is an inline `<head>` script that reveals the server-rendered shell before first paint, so the page never flashes underneath and there is no hydration mismatch. It also has an 8s failsafe in case the JS never boots.
- While it is open, the page behind is `visibility: hidden` (not focusable, and no layout shift on close). Client-side navigation does not show it again.

## Deploy

Hosted on Netlify (`netlify.toml`): production deploys from `main`, every PR gets a deploy preview. Node and pnpm versions are pinned there. Without `NEXT_PUBLIC_SITE_URL`, the site URL falls back to `https://galih-mestikasari.netlify.app` (`lib/site.ts`).

## Structure

```
app/                  routes, metadata, OG images, icons, sitemap, robots
components/site/      primitives: Container, GradientPanel, SectionHeader, Eyebrow, PhotoPlaceholder, AtomIcon, header/footer
components/loader/    loading screen + particle engine
components/sections/  home sections
components/work/      case study process diagram
content/              copy + Zod schema
lib/                  site URL, theme script, JSON-LD, OG renderer
```

Client components: the loader, theme toggle, nav highlight / More menu / mobile menu, back-to-top, count-up, experience carousel, education tabs and the copy-email button. Everything else is a Server Component, prerendered at build time.
