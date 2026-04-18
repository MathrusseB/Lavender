"use client";

import { useEffect, useState } from "react";

const IDLE_MS = 5000;
const EVENTS = ["mousemove", "scroll", "keydown", "touchstart"] as const;

export function useIdleBreathing(idleMs: number = IDLE_MS): boolean {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), idleMs);
    };

    EVENTS.forEach((ev) =>
      window.addEventListener(ev, reset, { passive: true })
    );
    reset();

    return () => {
      clearTimeout(timer);
      EVENTS.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [idleMs]);

  return isIdle;
}
