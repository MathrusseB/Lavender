// File-based stub. Post-launch, swap for Sanity or Payload via env-driven source.
// Keep getFieldNotes() signature stable so consumers don't change.

export type FieldNote = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
};

const NOTES: FieldNote[] = [
  {
    slug: "first-green-of-the-year",
    date: "2026-03-14",
    title: "On the <em>first</em> green of the year.",
    excerpt:
      "The first reliable green arrives not in the fields but at the drainage lines, where the ground holds water longer.",
    body: `The first reliable green arrives not in the fields but at the drainage lines, where the ground holds water longer. By the middle of March, the low places between the hayfields carry a pale, almost yellow-green — a week ahead of everything else.

We watch for it. It's the signal the ranch is ready to be worked again.`,
  },
  {
    slug: "mezzanine-winter-afternoon",
    date: "2026-02-08",
    title: "The <em>mezzanine</em>, on a winter afternoon.",
    excerpt:
      "The Andersen sliders face south, and on a bright February day the mezzanine holds the sun from two to four.",
    body: `The Andersen sliders face south, and on a bright February day the mezzanine holds the sun from two to four. It is warmer than the house, and quieter.

Coffee carried up at 1:45 is still warm at 3:30.`,
  },
  {
    slug: "sugar-mound-held-red-late",
    date: "2025-11-03",
    title: "Sugar Mound <em>held</em> its red late this year.",
    excerpt:
      "A cold October held back the maples — Sugar Mound didn't fully turn until the first week of November.",
    body: `A cold October held back the maples — Sugar Mound didn't fully turn until the first week of November. Usually we're past peak by Halloween.

This year the whole north line went at once, and stayed lit for ten days.`,
  },
  {
    slug: "four-horses-three-nights",
    date: "2024-08-21",
    title: "Four horses, <em>three</em> nights, one thunderstorm.",
    excerpt:
      "A travelling sport-horse operation stayed with us on the way to a show in Tulsa. The storm that came through on the second night lasted four hours.",
    body: `A travelling sport-horse operation stayed with us on the way to a show in Tulsa. The storm that came through on the second night lasted four hours. Every horse stayed quiet. The barn did what a barn is supposed to do.

The people slept in the mezzanine. We made breakfast at six.`,
  },
];

export function getFieldNotes(): FieldNote[] {
  return NOTES;
}
