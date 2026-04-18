"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Ranch() {
  const headRef = useRef<HTMLDivElement>(null);
  const revealed = useReveal(headRef);

  return (
    <section className="section section--warm" id="ranch" aria-label="The Ranch">
      <div
        ref={headRef}
        className={`sec-head${revealed ? " in" : ""}`}
      >
        <div className="sec-head__numeral">II</div>
        <div className="sec-head__body">
          <span className="eyebrow">
            <span>The Ranch</span>
          </span>
          <h2 className="sec-head__title">
            A place <em>for family,</em>
            <br />
            held open for the
            <br />
            right kind of quiet.
          </h2>
          <p className="sec-head__dek">
            Ninety minutes south of Kansas City, the land begins to roll.
          </p>
        </div>
      </div>

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
