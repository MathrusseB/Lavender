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

export function Gatherings({ id = "gatherings" }: { id?: string } = {}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridIn = useReveal(gridRef);

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
            What the ranch
            <br />
            does, when it <em>does</em>
            <br />
            anything at all.
          </>
        }
        dek="The ranch is a private place. From time to time it opens, by invitation, for reasons the family considers worth opening it for."
      />

      <div ref={gridRef} className={`gatherings${gridIn ? " in" : ""}`}>
        {CARDS.filter((c) => siteConfig.gatheringItems[c.key]).map((c) => {
          const classes = ["gather"];
          if (c.wide) classes.push("gather--wide");
          if (c.muted) classes.push("gather--muted");
          return (
            <article key={c.key} className={classes.join(" ")}>
              <span className="gather__num">{c.num}</span>
              <h3 className="gather__title">{c.title}</h3>
              <p className="gather__desc">{c.desc}</p>
              <div className="gather__state">
                <span className="dot" />
                {c.state}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
