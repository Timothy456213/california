"use client";
import { useEffect, useRef } from "react";

type Hex = { x: number; y: number; r: number; vx: number; vy: number; rot: number; vr: number; ph: number };

export default function HexBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, hs: Hex[] = [];
    const make = (): Hex => ({ x: Math.random() * w, y: Math.random() * h, r: 14 + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.002, ph: Math.random() * 6.28 });
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5);
      w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
      hs = Array.from({ length: Math.round(Math.min(34, Math.max(12, (w * h) / 42000))) }, make);
    };
    const path = (p: Hex) => {
      x.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = p.rot + (i * Math.PI) / 3, px = p.x + p.r * Math.cos(a), py = p.y + p.r * Math.sin(a);
        i ? x.lineTo(px, py) : x.moveTo(px, py);
      }
      x.closePath();
    };
    const draw = (t: number) => {
      x.clearRect(0, 0, w, h);
      for (const p of hs) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; p.rot += p.vr; }
        if (p.x < -80) p.x = w + 80; if (p.x > w + 80) p.x = -80;
        if (p.y < -80) p.y = h + 80; if (p.y > h + 80) p.y = -80;
        const o = 0.07 + 0.07 * Math.sin(t / 2500 + p.ph);
        path(p);
        x.shadowColor = "rgba(169,241,252,.5)"; x.shadowBlur = p.r > 40 ? 12 : 0;
        x.strokeStyle = `rgba(169,241,252,${o + 0.05})`; x.lineWidth = 1.2; x.stroke();
        x.fillStyle = `rgba(169,241,252,${o * 0.25})`; x.fill();
      }
      x.shadowBlur = 0;
      for (let i = 0; i < hs.length; i++) for (let j = i + 1; j < hs.length; j++) {
        const dx = hs[i].x - hs[j].x, dy = hs[i].y - hs[j].y, d = Math.hypot(dx, dy);
        if (d < 190) { x.strokeStyle = `rgba(169,241,252,${(1 - d / 190) * 0.12})`; x.lineWidth = 1;
          x.beginPath(); x.moveTo(hs[i].x, hs[i].y); x.lineTo(hs[j].x, hs[j].y); x.stroke(); }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(draw); };
    size(); raf = requestAnimationFrame(draw);
    addEventListener("resize", size); document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} className="bg" aria-hidden="true" />;
}
