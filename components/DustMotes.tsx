"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  drift: number;
};

const MOTE_COUNT = 70;
const COLORS = [
  "244, 239, 231",
  "235, 227, 212",
  "217, 207, 190",
];

export function DustMotes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motesRef = useRef<Mote[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initMotes = () => {
      motesRef.current = Array.from({ length: MOTE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.08 - Math.random() * 0.18,
        drift: Math.random() * Math.PI * 2,
      }));
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const m of motesRef.current) {
        const driftX = Math.sin(t * 0.0003 + m.drift) * 0.12;
        m.x += m.vx + driftX;
        m.y += m.vy;

        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const color = COLORS[Math.floor(m.drift * 10) % COLORS.length];

        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * 3);
        grad.addColorStop(0, `rgba(${color}, ${m.opacity})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, ${m.opacity * 1.4})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    resize();
    initMotes();
    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="dust-motes" aria-hidden="true" />;
}
