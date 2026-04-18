"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useIdleBreathing } from "@/hooks/useIdleBreathing";

const SCROLL_THRESHOLD = 60;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const isIdle = useIdleBreathing();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav__left" />
      <Link
        href="/"
        className={`wordmark${isIdle ? " breathing" : ""}`}
      >
        Lavender Family Ranch
        <small>Mound City · Kansas</small>
      </Link>
      <div className="nav__right">
        <Link href="/inquire" className="nav__inquire">
          <span>Inquire</span>
        </Link>
      </div>
    </nav>
  );
}
