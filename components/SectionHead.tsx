"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  numeral: string;
  eyebrow: string;
  title?: ReactNode;
  dek?: ReactNode;
};

export function SectionHead({ numeral, eyebrow, title, dek }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const isIn = useReveal(rootRef);
  return (
    <header ref={rootRef} className={`sec-head${isIn ? " in" : ""}`}>
      <div className="sec-head__numeral">{numeral}</div>
      <div className="sec-head__body">
        <div className="sec-head__eyebrow">{eyebrow}</div>
        {title != null && (
          <h2 className="sec-head__title">
            <span className="line">
              <span>{title}</span>
            </span>
          </h2>
        )}
        {dek != null && <p className="sec-head__dek">{dek}</p>}
      </div>
    </header>
  );
}
