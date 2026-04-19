"use client";

import { motion } from "framer-motion";
import { chapterNumeral, totalChaptersNumeral } from "@/lib/chapters";

const LINE_REVEAL = {
  initial: { y: "110%" },
  animate: { y: "0%" },
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero({ id = "top" }: { id?: string } = {}) {
  return (
    <section className="hero" id={id} aria-label="Hero">
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/assets/barn-front.jpg"
        aria-label="Lavender Family Ranch — slow motion view of the barn"
        className="hero__video"
      >
        <source src="/assets/grok-hero.mp4" type="video/mp4" />
        <img src="/assets/barn-front.jpg" alt="" />
      </video>
      <div className="hero__scrim" />

      <div className="hero__frame">
        <div className="hero__top">
          <h1 className="hero__title">
            <span className="line">
              <motion.span
                initial={LINE_REVEAL.initial}
                animate={LINE_REVEAL.animate}
                transition={{ duration: 1.1, ease: EASE, delay: 2.3 }}
              >
                Between the
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                initial={LINE_REVEAL.initial}
                animate={LINE_REVEAL.animate}
                transition={{ duration: 1.1, ease: EASE, delay: 2.45 }}
              >
                ponds and the oaks
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                initial={LINE_REVEAL.initial}
                animate={LINE_REVEAL.animate}
                transition={{ duration: 1.1, ease: EASE, delay: 2.6 }}
              >
                <em>and the sugar maples.</em>
              </motion.span>
            </span>
          </h1>

          <div className="hero__locale">Mound City · Kansas</div>
        </div>

        <div className="hero__bottom">
          <p className="hero__lede">
            A ranch in the rolling wooded hills of southeast Kansas. Built with
            care. Held for family. Opened, now and then, to guests who belong.
          </p>
          <div className="hero__meta">
            <span className="n">{chapterNumeral("hero")}</span>The Arrival
          </div>
          <div className="hero__progress">
            <div className="pc">
              <span>001</span>
              {"\u2009/\u2009"}{totalChaptersNumeral()}
            </div>
            <div className="pl" />
          </div>
        </div>
      </div>
    </section>
  );
}
