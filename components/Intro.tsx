"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "introDismissed";
const DISMISS_MS = 2200;

export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setDone(true);
      setRemoved(true);
      return;
    }

    const dismissTimer = window.setTimeout(() => setDone(true), DISMISS_MS);
    const removeTimer = window.setTimeout(() => setRemoved(true), 3400);

    const skip = () => {
      setDone(true);
      window.setTimeout(() => setRemoved(true), 1200);
    };
    document.body.addEventListener("click", skip, { once: true });

    return () => {
      window.clearTimeout(dismissTimer);
      window.clearTimeout(removeTimer);
      document.body.removeEventListener("click", skip);
    };
  }, []);

  useEffect(() => {
    if (done && typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [done]);

  if (!mounted || removed) return null;

  return (
    <div
      className={`intro${done ? " done" : ""}`}
      aria-hidden="true"
    >
      <div className="intro__mono">
        <svg viewBox="0 0 100 100">
          <path d="M 22 18 L 22 78 L 52 78" />
          <path d="M 58 22 L 58 78" />
          <path d="M 58 22 Q 82 22 82 40 Q 82 54 62 54 L 82 78" />
          <line x1="22" y1="86" x2="82" y2="86" />
        </svg>
        <div className="intro__word">Lavender Family Ranch</div>
      </div>
    </div>
  );
}
