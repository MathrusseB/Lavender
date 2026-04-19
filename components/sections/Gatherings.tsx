"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { chapterCardNumeral, chapterNumeral } from "@/lib/chapters";
import { siteConfig } from "@/lib/config";
import { SectionHead } from "@/components/SectionHead";

type GatherCard = {
  key: keyof typeof siteConfig.gatheringItems;
  num: string;
  wide?: boolean;
  muted?: boolean;
  title: React.ReactNode;
  desc: string;
  state: string;
};

const CARDS: GatherCard[] = [
  {
    key: "equineStays",
    num: chapterCardNumeral("gatherings", "i"),
    wide: true,
    title: (
      <>
        Equine stays <em>&mdash; by referral.</em>
      </>
    ),
    desc: "A quiet arrangement for travelling sport horse operations moving through the region. Stall space, turnout, ground, and a clean place for the people who bring them. Peer-to-peer; not published.",
    state: "Accepting inquiries · 2026 season",
  },
  {
    key: "familyGatherings",
    num: chapterCardNumeral("gatherings", "ii"),
    title: (
      <>
        Family <em>gatherings.</em>
      </>
    ),
    desc: "Occasional stays for small, extended-family groups.",
    state: "By invitation",
  },
  {
    key: "privateRetreats",
    num: chapterCardNumeral("gatherings", "iii"),
    title: (
      <>
        Private <em>retreats.</em>
      </>
    ),
    desc: "A working group, a quiet week, a table long enough for everyone.",
    state: "By invitation",
  },
  {
    key: "seasonalVisits",
    num: chapterCardNumeral("gatherings", "iv"),
    muted: true,
    title: (
      <>
        Seasonal <em>visits.</em>
      </>
    ),
    desc: "Maples in October. Hay in July. The grounds open for a long afternoon.",
    state: "Forthcoming",
  },
  {
    key: "otherUses",
    num: chapterCardNumeral("gatherings", "v"),
    wide: true,
    muted: true,
    title: (
      <>
        Other <em>uses,</em> held open.
      </>
    ),
    desc: "The ranch is not finished deciding what it is. These sections are here because the family wants the option, and not yet the obligation.",
    state: "To be decided",
  },
];

function GatherCard({ card }: { card: GatherCard }) {
  const ref = useRef<HTMLElement>(null);
  const isIn = useReveal(ref);
  const classes = ["gather"];
  if (card.wide) classes.push("gather--wide");
  if (card.muted) classes.push("gather--muted");
  if (isIn) classes.push("in");
  return (
    <article ref={ref} className={classes.join(" ")}>
      <span className="gather__num">{card.num}</span>
      <h3 className="gather__title">{card.title}</h3>
      <p className="gather__desc">{card.desc}</p>
      <div className="gather__state">
        <span className="dot" />
        {card.state}
      </div>
    </article>
  );
}

export function Gatherings({ id = "gatherings" }: { id?: string } = {}) {
  return (
    <section
      className="section section--stone"
      id={id}
      aria-label="Gatherings"
    >
      <SectionHead
        numeral={chapterNumeral("gatherings")}
        eyebrow="Gatherings"
        title={
          <>
            What the ranch does,
            <br />
            and what it <em>opens</em> for.
          </>
        }
        dek="Most days, the ranch is a working, family place. A handful of times a year, it opens — by invitation — for gatherings, stays, and days on the grounds we feel are worth opening it for."
      />

      <div className="gatherings">
        {CARDS.filter((c) => siteConfig.gatheringItems[c.key]).map((c) => (
          <GatherCard key={c.key} card={c} />
        ))}
      </div>
    </section>
  );
}
