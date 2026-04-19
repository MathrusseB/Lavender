# Handoff — Lavender Family Ranch

A private ranch outside Mound City, Kansas. The site should read as editorial boutique-hospitality: land-first photography, fragmentary copy, directed motion, and generous whitespace. Not a wedding venue. Not a booking engine. A presence that lets the owner decide later what the property becomes, publicly.

---

## About the design files

The HTML in this bundle is a **design reference**, not production code. It is a working prototype that demonstrates intended visuals, typography, motion choreography, and interaction patterns. The task for Claude Code is to **recreate this design in a real web codebase** (recommended stack below) using that environment's conventions — not to ship the HTML directly.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, motion timings, and copy are all locked. Recreate pixel-perfect.

## Recommended stack

- **Next.js 14 (App Router)** + React Server Components
- **Tailwind CSS** with a custom theme matching the tokens below
- **Sanity** or **Payload CMS** for Field Notes (Kleos owns content ops)
- **Framer Motion** for the choreography (intro sequence, line-reveal, rail progress, letter form)
- **next/image** with AVIF + LQIP blur placeholders matched to cream `#F4EFE7`
- Deploy to Vercel; target **<1.2s LCP** on the hero.

---

## Sitemap

| # | Route | Section | Notes |
|---|---|---|---|
| I | `/` | Hero | Cinematic intro, full-bleed barn sunset |
| II | `/the-ranch` (or anchor) | The Ranch | Narrative + land vocabulary |
| III | `/the-barn` | The Barn | Magazine-spread spec grid |
| IV | `/the-cabins` | The Cabins | **Hidden by default.** Toggleable. Placeholder imagery. |
| V | `/gatherings` | Gatherings | Modular cards, each individually toggleable |
| VI | `/field-notes` | Field Notes | CMS-driven journal, email capture |
| VII | `/inquire` | Inquire | One-field-at-a-time letter form |

The reference HTML is a single long-scroll page with anchor IDs; production can split each into a page without altering the visual grammar.

---

## Design tokens

### Colors

```css
--cream:        #F4EFE7;  /* hayfield cream, base paper */
--cream-deep:   #EBE3D4;  /* section alternate */
--stone:        #D9CFBE;  /* weathered wainscot */
--linen:        #C9BEA6;  /* placeholder imagery */
--ink:          #1C1A16;  /* deep ink — intentionally not pure black */
--ink-soft:     #3A3530;  /* body copy */
--ink-mute:     #6F655A;  /* micro-labels, dek */
--rule:         #B7AB94;  /* hairlines */

/* Accents — used sparingly */
--hay:          #B89755;  /* hayfield gold — active dots, spec italics */
--pond:         #5A6B74;  /* reserved */
--maple:        #8A3B2A;  /* sugar-maple red — hand-drawn arrow */
--lavender:     #9A8BA8;  /* dusty; used exactly twice on the site */
```

**Accent budget:** `--lavender` appears only on (a) the Section II pull-quote mark and (b) the inquire send-button underline on hover. Do not introduce additional uses. `--maple` is used once (the hand-drawn arrow beside "III cupolas"). Restraint is the signal.

### Typography

| Role | Family | Weight | Notes |
|---|---|---|---|
| Display serif | Cormorant Garamond | 300 (light), 300 italic | All headings, numerals, pull quotes. Letter-spacing −0.02em at display sizes. |
| Micro-labels (caps) | Italiana | 400 | All eyebrows, captions, form labels, progress numerals. Do **not** use a geometric mono here; Italiana's serif caps carry the editorial voice. Letter-spacing 0.28em default, 0.42em for eyebrows. |
| Body sans | Work Sans | 300 / 400 / 500 | Body copy only. Humanist, warm. |

Base body: 16px / 1.55 line-height.
Hero title clamp: `clamp(56px, 9.5vw, 172px)`.
Section title clamp: `clamp(38px, 5.4vw, 76px)`.
XXVIII spec numeral: `clamp(140px, 20vw, 260px)`.

### Spacing

`--gutter: clamp(24px, 4.5vw, 72px)` — the only page-edge padding scale.
Section padding: `clamp(80px, 11vw, 160px)` vertical.
Section-head bottom margin: `clamp(40px, 6vw, 88px)`.

---

## Screen specifications

### I — Hero

**Layout.** Full-viewport (`100vh`, min 680px) with the sunset barn image as background, 105% → 100% slow zoom over 12s. Top row (aligned to bottom): display title left, vertical locale text right (`writing-mode: vertical-rl`). Bottom row: hairline rule, then three cells — lede (italic serif, 40ch max), center meta block (Roman numeral + "The Arrival"), right scroll-progress (`001 / VII`).

**Cinematic intro (first 2.2s).**
1. Near-black overlay (`#0C0A08`) covers viewport.
2. SVG LR monogram strokes draw-on over 1.4s (stroke-dasharray animation).
3. "Lavender Family Ranch" word resolves under monogram at 1.1s in.
4. Overlay fades out at 1.2s, visibility removed at 2.3s.
5. Hero image becomes visible and begins its zoom at 1.6s.
6. Title lines reveal line-by-line via `translateY(110%) → 0` clip, staggered 150ms, starting at 2.3s.
7. Nav, locale, bottom row fade in 2.2s → 3.0s.

Click anywhere during intro skips it. A `skipIntro` tweak disables it entirely.

**Custom cursor.** 8px cream dot with 1px ink border, `mix-blend-mode: difference`. Expands to 68px ring with "View" in Italiana caps on `:hover` of hero or `[data-view]` images (gate, barn-front). No trailing blob. Hidden on touch / <780px.

**Scroll progress.** Replaces any "SCROLL" text. Zero-padded 3-digit index + "/ VII" in italic serif. Below it, 1px vertical line with a 40%-tall bright band that animates 0 → 100% position over 2.8s infinite.

### II — The Ranch

**Layout.** Standard `.sec-head` (80px numeral column + body). Then `.ranch-body` — two-column grid (1fr / 1.15fr) with an italic pull-quote on the left separated by a vertical hairline. Pull quote has a dusty-lavender `"` mark positioned top-left (`::before`, 120px, opacity .55). First paragraph of the right column uses `initial-letter: 3` drop cap in light Cormorant. Below, `.land-vocab` — a four-column grid (Region / County / Nearest / From KC) with monostyle key + italic serif value.

**Copy (final):**
- Title: *A place for family, held open for the right kind of quiet.*
- Lede: *Ninety minutes south of Kansas City, the land begins to roll.*
- Body p1: *The Osage Cuestas. Hayfields, ponds, a stand of hardwood at the north line. In October, Sugar Mound burns red. In March, the fields are the color of pale butter.*
- Body p2: *Not a venue. Not, most days, a business. A piece of ground a family looks after — and that, on occasion, looks after other people.*

### III — The Barn (ink section)

Background `--ink`, text cream. This is the craft showcase.

**Sequence.** Section head → hero image (front elevation) at 16:9 with two-line caption in bottom corners → **magazine-spread spec grid** → duo (interior + field) at 4:5 each.

**Spec spread structure (12-col grid).**

Row 1:
- `span 7` — **XXVIII** at `clamp(140px, 20vw, 260px)` Cormorant light. Subtitle: *Andersen sliding windows. A great deal of afternoon.* Key: `03 · Daylight`.
- `span 5` — **III** at `clamp(80px, 10vw, 140px)`. Next to it, a hand-drawn-feeling SVG arrow (quadratic curve + chevron head) in `--maple` pointing "see roofline, fig. 01" back up to the hero image. Key: `02 · Roofline`.

Row 2 (`span 12`, internal 4-col grid):
- `60 × 100` — Envelope
- `20 × 14` — Openings
- `16′` — Air (Big Ass fan)
- `450k` — Winter (BTU propane)

All numerals are serif light with italic `×` and `k`. Hairline rules between cells at `rgba(244,239,231,.18)`.

### IV — The Cabins (hidden by default)

Structure is built and complete (three equal columns, striped SVG placeholder imagery, cabin name / meta / italic line each). Do **not** ship publicly until the client provides real photography and confirms positioning. Wire the tweak/toggle so it can be restored without a rebuild.

### V — Gatherings

**Layout.** 12-column grid of cards. Use `.gather--wide` (`span 8`) for headline items; standard (`span 4`) otherwise. Each card: `.gather__num` (V·i, V·ii…), `.gather__title` (serif light + italic emphasis), `.gather__desc` (small sans), `.gather__state` (mustard dot + status label).

Five cards, in order: Equine stays (wide, accepting), Family gatherings, Private retreats, Seasonal visits (muted), Other uses held open (wide, muted). Each card is individually toggleable via CMS/tweak.

### Gate interlude

Full-bleed entry-gate photo (60vh clamped) with a 14s slow ken-burns (scale 1.08 → 1.0 + translate ±1%). One-line caption bottom-center in cream Italiana caps.

### VI — Field Notes

**Layout.** Two-column grid (1fr / 2fr). Left aside: italic serif prompt + email-capture field (single underlined input, no button). Right: list of notes — each `.note` is a three-column row (date / title / "Read →") with a hairline top border; hover increases left padding by 18px and turns "Read →" maple. Top-bordered and bottom-bordered list; no cards.

CMS-driven: seed four notes (Mar 2026, Feb 2026, Nov 2025, Aug 2024). Copy in the reference HTML is production-ready.

### VII — Inquire (letter form)

**This is the hero moment of the page.** Not a stacked form — one sentence at a time.

**Layout.** `.letter` container, grid with three rows (header / sheet / nav). Header: italic-serif hello left, "I / V" step indicator right (current roman in italic serif 28px, the rest in Italiana caps). Middle: one big italic-serif line at `clamp(32px, 4.6vw, 60px)`, written as a sentence with inline `<input>` blanks styled with no chrome — just an italic underline.

**Five prompts (in order):**
1. *My name is ___,*
2. *I'm writing from ___,*
3. *and I'm hoping for ___.* (select: equine stay / family gathering / private retreat / seasonal visit / something else)
4. *You can reach me at ___.*
5. *A few more words, if it's useful: ___*

**Nav.** `← Back` disabled on step 1. `Continue →` until step 5, replaced by `Send the note` (bordered-ink CTA with a lavender-to-cream underline sweep on hover). `Enter` advances.

**Submit.** Replace the entire letter with:
> *Thank you, [name]. We've received the note, and will write you back.*
> A reply typically arrives within the week.

**Validation (production).** Email format, required name + email. Honeypot field. No public calendar. Route to Kleos inbox.

### Footer — landscape

Not a columnar footer. A **full-bleed dusk photo** with dark gradient at the bottom. Reversed wordmark at `clamp(56px, 9vw, 132px)` ("Lavender *Family* Ranch." — italic "Family" tinted with lavender at 25% mix). Single Italiana caps line: *Mound City · Kansas · By Invitation.* Hairline rule, then a 11px Italiana-caps meta strip: © line, Koehn credit, Instagram handle.

---

## Global components

### Right-edge progress rail

Fixed, vertically centered. Italiana-caps Roman numerals I–III, V–VII (skip IV when cabins hidden) with a 18px hairline to the right. Active item: ink (or cream on dark sections — use `.rail.inverted`), line grows to 28px. Click scrolls to section.

### Nav

Fixed, 3-col grid. Transparent → cream-blur on scroll past 60px. Center wordmark in Cormorant caps with small Italiana locale line. Right inquire pill has a lavender underline sweep on hover (the second and final lavender use).

### 5-second idle "breathing"

After 5s of no input (mousemove/scroll/keydown/touch), the center wordmark begins a gentle 6s scale 1.0 → 1.02 → 1.0 infinite. Any interaction cancels. Hidden delight for screenshots.

### Reveal on scroll

Every `.reveal` / `.reveal-head` element uses IntersectionObserver at 0.12 threshold. Head items: numeral slides in from `translateX(-24px)` over 1s cubic-bezier(.22,.61,.36,1); eyebrow types in via `translateY(100%) → 0` clip with 200ms delay. One motion per section — do not layer.

### Ambient motion inventory

| Section | Motion | Duration |
|---|---|---|
| Hero image | Slow zoom 1.08 → 1.00 | 12s, once |
| Hero title | Line-by-line clip reveal | 1.1s staggered 150ms |
| Scroll indicator | 1px line pulse | 2.8s infinite |
| Gate interlude | Ken-burns scale + translate | 14s, once on reveal |
| Barn hero image | Scale 1.04 → 1.00 | 8s on reveal |
| Wordmark (idle) | Breathing scale 1.00 → 1.02 | 6s infinite after 5s idle |

No Lenis smooth-scroll bounce. No parallax beyond the ken-burns. Juries read restraint as directed.

---

## State management

- `introDismissed: boolean` — sessionStorage. Skip intro if already seen this session.
- `letterStep: 0..4`, `letterAnswers: Record<string, string>` — local state for inquiry form.
- `railCurrentSection: string` — derived from scroll position; section whose `offsetTop <= scrollY + 0.35vh`.
- CMS toggles: `cabinsEnabled`, `gatheringItems[].visible`, `notesEnabled` — read from CMS at build time.

---

## Interactions checklist

- [ ] Intro skippable via click anywhere
- [ ] Scroll locks while intro overlay is visible (optional; reference does not lock)
- [ ] Rail current section updates on scroll, inverts on `--ink` backgrounds
- [ ] Wordmark idle-breathing resets on any input
- [ ] Letter form: Enter advances, Shift+Enter allowed (textarea variant if needed)
- [ ] Letter form: Back preserves previously-entered answers
- [ ] Hero and `[data-view]` images show custom cursor on non-touch; normal cursor elsewhere
- [ ] All hover states: `.note` padding shift, `.nav__inquire` lavender underline, `.letter__send` fill
- [ ] Reveal-on-scroll fires once (unobserve after); no re-trigger on scroll-up

---

## Performance targets

- LCP < 1.2s (hero image; serve AVIF ≤200KB with 32×18 LQIP blur)
- CLS < 0.05
- TBT < 150ms
- Font strategy: `font-display: swap`, preload Cormorant and Italiana subsets actually used
- Intro overlay is 100% CSS + inline SVG — zero JS dependencies, zero fonts blocking

---

## Assets

All imagery in `/assets/` is client-provided ranch photography. Placeholder cabin imagery uses the striped CSS pattern (`repeating-linear-gradient`) until real photos arrive.

| File | Role |
|---|---|
| `barn-front.jpg` | Hero, Section III hero image |
| `barn-interior.jpg` | Section III duo, left |
| `barn-field.jpg` | Section III duo, right |
| `entry-gate.jpg` | Gate interlude |
| `barn-construction.jpg` | Reserved for Field Notes |

Serve each in AVIF + WebP + JPEG fallback. Generate 480 / 960 / 1920 / 2880 widths via `next/image`.

---

## Copy & voice rules

- Fragmentary. Declarative. Never persuasive.
- Land first. Family second. Building third. In every section.
- Allowed vocabulary: *by invitation, stays, gatherings, the land, welcomes, host, seasonal.*
- Forbidden vocabulary: *venue, book now, packages, special day, rustic elegance, hidden gem, unforgettable.*
- The reader is being allowed to see the property — not sold on it.

---

## Files in this handoff

- `Lavender Family Ranch.html` — the complete design reference (single file, all tokens + motion + layouts).
- `assets/*.jpg` — source imagery from the client.
- `README.md` — this document.

Open the HTML in any modern browser to review intended motion and spacing. The CSS inside is heavily commented and the JS is small; Claude Code should treat it as canonical specification.
