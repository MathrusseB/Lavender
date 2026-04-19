"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { chapterList, type ChapterKey } from "@/lib/chapters";

function isEditable(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
}

export function PageTurn({ currentKey }: { currentKey: ChapterKey }) {
  const router = useRouter();
  const items = chapterList();
  const idx = items.findIndex((c) => c.key === currentKey);
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx >= 0 && idx < items.length - 1 ? items[idx + 1] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(document.activeElement)) return;
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        router.push(prev.path);
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        router.push(next.path);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  return (
    <nav className="page-turn" aria-label="Chapter navigation">
      <div className="page-turn__side page-turn__side--prev">
        {prev && (
          <Link
            href={prev.path}
            className="page-turn__link page-turn__link--prev"
            aria-label={`Previous chapter: ${prev.numeral} · ${prev.label}`}
          >
            <span className="page-turn__arrow" aria-hidden="true">
              &larr;
            </span>
            <span className="page-turn__numeral">{prev.numeral}</span>
            <span className="page-turn__dot" aria-hidden="true">
              ·
            </span>
            <span className="page-turn__label">{prev.label}</span>
          </Link>
        )}
      </div>
      <div className="page-turn__side page-turn__side--next">
        {next && (
          <Link
            href={next.path}
            className="page-turn__link page-turn__link--next"
            aria-label={`Next chapter: ${next.numeral} · ${next.label}`}
          >
            <span className="page-turn__numeral">{next.numeral}</span>
            <span className="page-turn__dot" aria-hidden="true">
              ·
            </span>
            <span className="page-turn__label">{next.label}</span>
            <span className="page-turn__arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
