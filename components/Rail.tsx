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
      setCurrent(found);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const isInverted = INVERTED_KEYS.has(current);

  return (
    <nav
      className={`rail${isInverted ? " inverted" : ""}`}
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
