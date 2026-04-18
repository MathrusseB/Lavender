"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export function GateInterlude() {
  const ref = useRef<HTMLElement>(null);
  const revealed = useReveal(ref);

  return (
    <figure
      ref={ref}
      className={`gate-bleed${revealed ? " in" : ""}`}
      data-view
      aria-label="Entry gate"
    >
      <Image
        src="/assets/entry-gate.jpg"
        alt="Entry gate with the barn framed through it"
        width={2880}
        height={1620}
        sizes="100vw"
      />
      <figcaption>The gate · south entrance</figcaption>
    </figure>
  );
}
