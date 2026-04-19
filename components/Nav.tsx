"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useIdleBreathing } from "@/hooks/useIdleBreathing";
import { siteConfig } from "@/lib/config";

const SCROLL_THRESHOLD = 60;

type MenuItem = { label: string; hash: string; flag?: boolean };

const MENU_ITEMS: MenuItem[] = [
  { label: "The Ranch", hash: "#ranch" },
  { label: "The Barn", hash: "#barn" },
  { label: "The Cabins", hash: "#cabins", flag: true },
  { label: "Gatherings", hash: "#gatherings" },
  { label: "Field Notes", hash: "#notes" },
  { label: "Inquire", hash: "#inquire" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isIdle = useIdleBreathing();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const items = MENU_ITEMS.filter(
    (item) => !item.flag || siteConfig.cabinsEnabled
  );

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav__left" />
        <Link
          href="/"
          className={`wordmark${isIdle ? " breathing" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Lavender Family Ranch
          <small>Mound City · Kansas</small>
        </Link>
        <div className="nav__right">
          <Link href="/#inquire" className="nav__inquire">
            <span>Inquire</span>
          </Link>
          <button
            type="button"
            className={`nav__burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="nav-menu"
        className={`nav-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <ul className="nav-menu__list">
          {items.map((item) => (
            <li key={item.hash}>
              <a
                href={item.hash}
                className="nav-menu__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
