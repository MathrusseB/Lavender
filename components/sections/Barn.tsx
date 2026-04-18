"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Barn() {
  const headRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const duoRef = useRef<HTMLDivElement>(null);

  const headIn = useReveal(headRef);
  const heroImgIn = useReveal(heroImgRef);
  const spreadIn = useReveal(spreadRef);
  const duoIn = useReveal(duoRef);

  return (
    <section
      className="section section--ink"
      id="barn"
      aria-label="The Barn"
    >
      <div ref={headRef} className={`sec-head${headIn ? " in" : ""}`}>
        <div className="sec-head__numeral">III</div>
        <div className="sec-head__body">
          <span className="eyebrow">
            <span>The Barn</span>
          </span>
          <h2 className="sec-head__title">
            Six thousand
            <br />
            square feet, <em>built</em>
            <br />
            to be looked at.
          </h2>
          <p className="sec-head__dek">
            A pre-engineered steel barn with a gambrel roofline, a
            polished-concrete main floor, and a mezzanine that holds a long
            view of the field. Built by Koehn Building Systems of Rich Hill,
            Missouri.
          </p>
        </div>
      </div>

      <div className="barn-stack">
        <figure
          ref={heroImgRef}
          className={`barn-hero-img${heroImgIn ? " in" : ""}`}
          data-view
        >
          <Image
            src="/assets/barn-front.jpg"
            alt="Lavender Family Ranch barn — front elevation, daylight"
            fill
            sizes="100vw"
          />
          <figcaption className="cap">
            <span>Front elevation · south face</span>
            <span>Figure 01</span>
          </figcaption>
        </figure>

        <div
          ref={spreadRef}
          className={`spec-spread${spreadIn ? " in" : ""}`}
        >
          <div className="spec-cell spec-xxviii">
            <div className="n">XXVIII</div>
            <div className="l">
              Andersen sliding windows. A great deal of afternoon.
            </div>
            <div className="k">03 · Daylight</div>
          </div>
          <div className="spec-cell spec-iii">
            <div className="n">III</div>
            <div className="l">
              Cupolas along the ridge, each crowned with a weather vane.
            </div>
            <div className="note">
              <svg
                viewBox="0 0 42 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
              >
                <path d="M 2 7 Q 20 -2 40 7" />
                <path d="M 36 3 L 40 7 L 36 11" />
              </svg>
              <span>see roofline, fig. 01</span>
            </div>
            <div className="k">02 · Roofline</div>
          </div>

          <div className="spec-row2">
            <div className="spec-cell">
              <div className="n">
                60 <em>×</em> 100
              </div>
              <div className="l">
                Footprint, in feet. Sixteen-foot walls.
              </div>
              <div className="k">01 · Envelope</div>
            </div>
            <div className="spec-cell">
              <div className="n">
                20 <em>×</em> 14
              </div>
              <div className="l">
                Two overhead doors, insulated. Tall enough for what arrives.
              </div>
              <div className="k">04 · Openings</div>
            </div>
            <div className="spec-cell">
              <div className="n">16′</div>
              <div className="l">
                A Big Ass fan at center. Moves the room in July.
              </div>
              <div className="k">05 · Air</div>
            </div>
            <div className="spec-cell">
              <div className="n">
                450<em>k</em>
              </div>
              <div className="l">
                BTU. Stone wainscot wraps the base, winter-tight.
              </div>
              <div className="k">06 · Winter</div>
            </div>
          </div>
        </div>

        <div ref={duoRef} className={`barn-duo${duoIn ? " in" : ""}`}>
          <figure>
            <div className="asp">
              <Image
                src="/assets/barn-interior.jpg"
                alt="Barn interior mezzanine"
                width={1200}
                height={1500}
                sizes="(max-width: 780px) 100vw, 50vw"
              />
            </div>
            <figcaption>
              <span>Interior · mezzanine</span>
              <span>Figure 02</span>
            </figcaption>
          </figure>
          <figure>
            <div className="asp">
              <Image
                src="/assets/barn-field.jpg"
                alt="Barn with hayfield foreground"
                width={1200}
                height={1500}
                sizes="(max-width: 780px) 100vw, 50vw"
              />
            </div>
            <figcaption>
              <span>West approach · hayfield</span>
              <span>Figure 03</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
