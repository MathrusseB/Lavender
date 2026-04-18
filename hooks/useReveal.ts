"use client";

import { useEffect, useState, type RefObject } from "react";

export function useReveal<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.12
): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [ref, threshold, revealed]);

  return revealed;
}
