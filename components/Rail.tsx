"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

type RailItem = {
  numeral: string;
  key: "hero" | "ranch" | "barn" | "cabins" | "gatherings" | "notes" | "inquire";
  href: string;
};

const ITEMS: RailItem[] = [
  { numeral: "I", key: "hero", href: "/" },
  { numeral: "II", key: "ranch", href: "/the-ranch" },
  { numeral: "III", key: "barn", href: "#" },
  { numeral: "IV", key: "cabins", href: "#" },
  { numeral: "V", key: "gatherings", href: "#" },
  { numeral: "VI", key: "notes", href: "#" },
  { numeral: "VII", key: "inquire", href: "#" },
];

function currentKey(pathname: string | null): RailItem["key"] | null {
  if (pathname === "/") return "hero";
  if (pathname === "/the-ranch") return "ranch";
  return null;
}

export function Rail({ inverted = false }: { inverted?: boolean }) {
  const pathname = usePathname();
  const current = currentKey(pathname);

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
          href={item.href}
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
