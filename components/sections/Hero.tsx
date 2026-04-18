"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LINE_REVEAL = {
  initial: { y: "110%" },
  animate: { y: "0%" },
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

// 8x8 AVIF/PNG-ish blur placeholder tuned to cream #F4EFE7.
const CREAM_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0IDQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNGNEVGRTciLz48L3N2Zz4=";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Hero">
      <div className="hero__img">
        <Image
          src="/assets/barn-sunset.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={CREAM_BLUR}
          aria-hidden="true"
        />
      </div>
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
                Lavender
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                initial={LINE_REVEAL.initial}
                animate={LINE_REVEAL.animate}
                transition={{ duration: 1.1, ease: EASE, delay: 2.45 }}
              >
                Family
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                initial={LINE_REVEAL.initial}
                animate={LINE_REVEAL.animate}
                transition={{ duration: 1.1, ease: EASE, delay: 2.6 }}
              >
                <em>Ranch</em>
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
            <span className="n">I</span>The Arrival
          </div>
          <div className="hero__progress">
            <div className="pc">
              <span>001</span>
              {"\u2009/\u2009"}VII
            </div>
            <div className="pl" />
          </div>
        </div>
      </div>
    </section>
  );
}
