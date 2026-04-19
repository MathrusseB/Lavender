"use client";

import { chapterNumeral } from "@/lib/chapters";
import { SectionHead } from "@/components/SectionHead";

export function Ranch({ id = "ranch" }: { id?: string } = {}) {
  return (
    <section className="section section--warm" id={id} aria-label="The Ranch">
      <SectionHead
        numeral={chapterNumeral("ranch")}
        eyebrow="The Ranch"
        title={
          <>
            A place <em>for family,</em>
            <br />
            held open for the
            <br />
            right kind of quiet.
          </>
        }
      />

      <div className="ranch-body">
        <p className="ranch-body__lede">
          Ninety minutes south of Kansas City, the land begins to roll.
        </p>
        <div className="ranch-body__text">
          <p>
            The Osage Cuestas. Hayfields, ponds, a stand of hardwood at the
            north line. In October, Sugar Mound burns red. In March, the fields
            are the color of pale butter.
          </p>
          <p>
            Not a venue. Not, most days, a business. A piece of ground a family
            looks after — and that, on occasion, looks after other people.
          </p>
        </div>
      </div>

      <div className="land-vocab">
        <div className="land-vocab__item">
          <span className="k">Region</span>
          <span className="v">
            Osage <em>Cuestas</em>
          </span>
        </div>
        <div className="land-vocab__item">
          <span className="k">County</span>
          <span className="v">Linn</span>
        </div>
        <div className="land-vocab__item">
          <span className="k">Nearest</span>
          <span className="v">
            Mound <em>City</em>
          </span>
        </div>
        <div className="land-vocab__item">
          <span className="k">From KC</span>
          <span className="v">
            Ninety <em>minutes south.</em>
          </span>
        </div>
      </div>
    </section>
  );
}
