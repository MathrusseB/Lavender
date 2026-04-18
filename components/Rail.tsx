"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";

type RailItem = {
  numeral: string;
  key: "hero" | "ranch" | "barn" | "cabins" | "gatherings" | "notes" | "inquire";
};

const ITEMS: RailItem[] = [
  { numeral: "I", key: "hero" },
  { numeral: "II", key: "ranch" },
  { numeral: "III", key: "barn" },
  { numeral: "IV", key: "cabins" },
  { numeral: "V", key: "gatherings" },
  { numeral: "VI", key: "notes" },
  { numeral: "VII", key: "inquire" },
];

export function Rail({
  current = "hero",
  inverted = false,
}: {
  current?: RailItem["key"];
  inverted?: boolean;
}) {
  const items = ITEMS.filter(
    (i) => i.key !== "cabins" || siteConfig.cabinsEnabled
  );

  return (
    <nav
      className={`rail${inverted ? " inverted" : ""}`}
      aria-label="Section progress"
    >
      {items.map((item) => (
        <Link
          key={item.key}
          href="/"
          data-sec={item.key}
          className={item.key === current ? "current" : undefined}
        >
          <span className="r-num">{item.numeral}</span>
          <span className="r-line" />
        </Link>
      ))}
    </nav>
  );
}
