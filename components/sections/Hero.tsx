"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { chapterNumeral, totalChaptersNumeral } from "@/lib/chapters";

const LINE_REVEAL = {
  initial: { y: "110%" },
  animate: { y: "0%" },
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

const PARALLAX_MAX_PX = 4;
const LERP = 0.08;

// 8x8 AVIF/PNG-ish blur placeholder tuned to cream #F4EFE7.
const CREAM_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0IDQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNGNEVGRTciLz48L3N2Zz4=";

export function Hero({ id = "top" }: { id?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      img.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const fx = (e.clientX - rect.left) / rect.width - 0.5;
      const fy = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = fx * PARALLAX_MAX_PX * 2;
      target.y = fy * PARALLAX_MAX_PX * 2;
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id={id} aria-label="Hero">
      <div className="hero__img" ref={imgRef}>
        <div className="hero__zoom">
          <Image
            src="/assets/barn-front.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={CREAM_BLUR}
            aria-hidden="true"
          />
        </div>
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
