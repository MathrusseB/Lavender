"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { chapterNumeral } from "@/lib/chapters";

type Cabin = {
  name: React.ReactNode;
  meta: string[];
  line: string;
};

const CABINS: Cabin[] = [
  {
    name: (
      <>
        The <em>East</em> Cabin
      </>
    ),
    meta: ["Studio", "Sleeps 2", "Rooftop deck"],
    line: "Closest to the pond. A good place to arrive first.",
  },
  {
    name: (
      <>
        The <em>Middle</em> Cabin
      </>
    ),
    meta: ["1 Bedroom", "Sleeps 3", "Rooftop deck"],
    line: "The window faces the long field and the sugar maples.",
  },
  {
    name: (
      <>
        The <em>West</em> Cabin
      </>
    ),
    meta: ["2 Bedroom", "Sleeps 5", "Rooftop deck"],
    line: "The largest. A stair to a deck that holds the sunset almost entirely.",
  },
];

export function Cabins({ id = "cabins" }: { id?: string } = {}) {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headIn = useReveal(headRef);
  const gridIn = useReveal(gridRef);

  return (
    <section
      className="section section--warm"
      id={id}
      aria-label="The Cabins"
    >
      <div ref={headRef} className={`sec-head${headIn ? " in" : ""}`}>
        <div className="sec-head__numeral">{chapterNumeral("cabins")}</div>
        <div className="sec-head__body">
          <span className="eyebrow">
            <span>The Cabins</span>
          </span>
          <h2 className="sec-head__title">
            Three small houses,
            <br />
            three <em>rooftop</em> decks,
            <br />
            one long horizon.
          </h2>
          <p className="sec-head__dek">
            Single-story cabins built for staying — modest inside, generous
            above. Each opens onto a walk-up deck held for the hour before the
            sun goes down.
          </p>
        </div>
      </div>

      <div ref={gridRef} className={`cabins${gridIn ? " in" : ""}`}>
        {CABINS.map((cabin, idx) => (
          <article key={idx} className="cabin">
            <div className="cabin__placeholder">
              <span className="tag">Placeholder · imagery forthcoming.</span>
            </div>
            <h3 className="cabin__name">{cabin.name}</h3>
            <div className="cabin__meta">
              {cabin.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <p className="cabin__line">{cabin.line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
