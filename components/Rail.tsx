"use client";

import { useEffect, useState } from "react";
import { chapterList, type ChapterKey } from "@/lib/chapters";

const KEY_TO_ID: Record<ChapterKey, string> = {
  hero: "top",
  ranch: "ranch",
  barn: "barn",
  cabins: "cabins",
  gatherings: "gatherings",
  notes: "notes",
  inquire: "inquire",
};

const INVERTED_KEYS = new Set<ChapterKey>(["hero", "barn"]);

export function Rail() {
  const items = chapterList();
  const [current, setCurrent] = useState<ChapterKey>(items[0]?.key ?? "hero");
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const viewMid = window.scrollY + window.innerHeight * 0.35;
      let found: ChapterKey = items[0]?.key ?? "hero";
      for (const item of items) {
        const el = document.getElementById(KEY_TO_ID[item.key]);
        if (el && el.offsetTop <= viewMid) {
          found = item.key;
        }
      }

      const gateEl = document.getElementById("gate");
      const gateTop = gateEl?.offsetTop ?? Infinity;
      const gateBottom = gateTop + (gateEl?.offsetHeight ?? 0);
      const inGate = viewMid >= gateTop && viewMid < gateBottom;

      setCurrent(found);
      setInverted(INVERTED_KEYS.has(found) || inGate);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav
      className={`rail${inverted ? " inverted" : ""}`}
      aria-label="Section progress"
    >
      {items.map((item) => (
        <a
          key={item.key}
          href={`#${KEY_TO_ID[item.key]}`}
          data-sec={KEY_TO_ID[item.key]}
          className={item.key === current ? "current" : undefined}
        >
          <span className="r-num">{item.numeral}</span>
          <span className="r-line" />
        </a>
      ))}
    </nav>
  );
}
