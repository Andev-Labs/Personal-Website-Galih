# Khrisanty Galih Mestikasari — Portfolio

"The Analyst's Notebook": a static portfolio for a Chemical Analyst / QC specialist, written for HR and recruiters.

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

| What                                                                                   | Where                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Name, hero, snapshot, about, experience, expertise, education, beyond the lab, contact | `content/profile.ts`                                  |
| Case studies (one file each)                                                           | `content/work/*.ts`, registered in `content/index.ts` |

- **Metrics:** each case has `metrics: [{ label, value: null }]`. A metric stays hidden until `value` is set, so only fill it in with confirmed numbers.
- **Process diagrams** are generated from `process[]` (3–5 steps; `label` max 18 characters).

## Swapping placeholders

| Placeholder  | How to replace                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| LinkedIn URL | `linkedin` in `content/profile.ts`                                                                                    |
| Portrait     | Replace `public/images/portrait.jpg` (portrait, 2:3 or 3:4). The duotone grade is applied in CSS.                     |
| Case covers  | Replace `public/images/{bottles,workbench,instrument,pipette,labcoat}.jpg` and update the `cover.alt` text            |
| CV           | Replace `public/cv.pdf`                                                                                               |
| Domain       | Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in Vercel. Canonical URLs, the sitemap, robots and JSON-LD all use it. |

The current photos are Unsplash images used as placeholders under the Unsplash License.

## Structure

```
app/                  routes, metadata, OG images, icons, sitemap, robots
components/site/      primitives: Container, SectionLabel, ChromatogramLine, DuotoneImage, ArchImage, header/footer
components/sections/  home sections
components/work/      case study process diagram
content/              copy + Zod schema
lib/                  site URL, theme script, JSON-LD, OG renderer
```

Client components: the theme toggle, the active-nav highlight and the copy-email button. Everything else is a Server Component, prerendered at build time.
