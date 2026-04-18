"use client";

import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 780;

function detectEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const tooNarrow = window.matchMedia(`(max-width: ${MIN_WIDTH - 1}px)`).matches;
  const isTouch =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches;
  return !tooNarrow && !isTouch;
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setEnabled(detectEnabled());
    update();

    const narrow = window.matchMedia(`(max-width: ${MIN_WIDTH - 1}px)`);
    const hover = window.matchMedia("(hover: none)");
    const pointer = window.matchMedia("(pointer: coarse)");
    narrow.addEventListener("change", update);
    hover.addEventListener("change", update);
    pointer.addEventListener("change", update);

    return () => {
      narrow.removeEventListener("change", update);
      hover.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const onMove = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        ".hero, [data-view]"
      );
      if (target) {
        node.classList.add("on");
      } else {
        node.classList.remove("on", "expanded");
      }
      node.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        ".hero, [data-view]"
      );
      if (target) node.classList.add("expanded");
      else node.classList.remove("expanded");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  );
}
