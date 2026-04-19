# SETUP — Lavender Family Ranch

Production site for the Lavender Family Ranch presence. Next.js 14 (App Router), Tailwind, Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:3000. The site is a single mobile long-scroll page and separate desktop routes — check both by toggling device emulation in DevTools (threshold: User-Agent based, 780px breakpoint reference).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # next lint
```

## Environment variables

None required at this time. A `.env.example` placeholder is in the repo root for future form/CMS wiring (Resend API key, CMS token, etc.). Copy to `.env.local` when those land.

## Feature flags

All flags live in `lib/config.ts`. Edit and redeploy to toggle.

```ts
export const siteConfig = {
  cabinsEnabled: false,              // IV — The Cabins (hidden until real photos arrive)
  gatheringItems: {
    equineStays: true,
    familyGatherings: true,
    privateRetreats: true,
    seasonalVisits: true,
    otherUses: true,
  },
  notesEnabled: true,                // VI — Field Notes
};
```

- `cabinsEnabled` — set `true` to restore Section IV (the `/the-cabins` route, the rail item, the mobile anchor, and the menu link all follow).
- `gatheringItems[key]` — flip any card off individually; the grid collapses.
- `notesEnabled` — master switch for the Field Notes section.

## Content updates

Field Notes are currently a typed stub in `lib/cms.ts` — edit the `NOTES` array to change titles, dates, excerpts, or body copy. The `getFieldNotes()` signature is intentionally stable; swapping in a real CMS (Sanity or Payload) is a drop-in replacement and a post-launch task.

Section copy (hero lines, Ranch body, Barn spec spread, Gatherings cards, Inquire prompts) lives inline in the component files under `components/sections/`. These are design-locked; treat changes as copy deck revisions, not content ops.

## Mobile vs desktop composition

- Desktop (`/`) — renders the Hero only. Each section has its own route (`/the-ranch`, `/the-barn`, etc.).
- Mobile (`/`) — renders all enabled sections stacked with anchor IDs (`#the-ranch`, `#the-barn`, `#gate`, `#the-cabins`, `#gatherings`, `#field-notes`, `#inquire`). Section routes redirect to the matching anchor.

Detection is server-side via User-Agent in `lib/device.ts` — no JS flash between states.

## Deploy

- Vercel project: **lavender-family-ranch**. Connected to this repo.
- Pushes to `main` auto-deploy to production.
- Every branch gets a preview URL on push.
- Node runtime: Vercel default (Node 20).
- Image optimization: `next/image` with the repo-local `/assets/` originals. AVIF + WebP served by the platform.

## Known TODOs (post-launch)

- **Inquire form backend.** The letter form (`components/sections/Inquire.tsx`) currently resolves to a client-side thank-you. Wire `onFormSubmit` to Resend / Formspark / a Kleos inbox webhook; honor the honeypot `website` field on the server.
- **Email capture backend.** The Field Notes email input (`components/sections/FieldNotes.tsx`, `form.notes__capture`) preventDefaults. Wire to the newsletter service Kleos uses (Buttondown / Kit / etc.).
- **Real CMS swap.** Replace `lib/cms.ts` with Sanity or Payload. Keep `getFieldNotes()` + `FieldNote` type shape.
- **Per-note detail pages.** `.note a[href="#"]` → `/field-notes/[slug]` routes rendering the `body` field.
- **Custom domain.** Vercel-issued URL is what ships to the pitch; mapping a client-owned domain is a later step.
