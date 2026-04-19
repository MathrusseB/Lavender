"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapterList, type ChapterKey } from "@/lib/chapters";

function currentKey(pathname: string | null): ChapterKey | null {
  if (pathname === "/") return "hero";
  if (pathname === "/the-ranch") return "ranch";
  if (pathname === "/the-barn") return "barn";
  if (pathname === "/the-cabins") return "cabins";
  if (pathname === "/gatherings") return "gatherings";
  if (pathname === "/field-notes") return "notes";
  if (pathname === "/inquire") return "inquire";
  return null;
}

export function Rail({ inverted }: { inverted?: boolean }) {
  const pathname = usePathname();
  const current = currentKey(pathname);
  const isInverted = inverted ?? pathname === "/the-barn";

  const items = chapterList();

  return (
    <nav
      className={`rail${isInverted ? " inverted" : ""}`}
      aria-label="Section progress"
    >
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.path}
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
