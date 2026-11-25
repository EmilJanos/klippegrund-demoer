"use client";

import { useEffect, useRef, useState } from "react";

// Før/efter med et håndtag, man trækker i. Bygget på en almindelig skyder (range), så den virker med
// mus, finger og piletaster. Første gang den kommer til syne, glider håndtaget én gang frem og tilbage.
export default function Farveskyder({ foer, efter, foerTekst, efterTekst }: { foer: React.ReactNode; efter: React.ReactNode; foerTekst: string; efterTekst: string }) {
  const [pos, setPos] = useState(50);
  const rod = useRef<HTMLDivElement>(null);
  const roert = useRef(false);

  useEffect(() => {
    const el = rod.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ramme = 0;
    const io = new IntersectionObserver(
      ([p]) => {
        if (!p.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const trin = (nu: number) => {
          const t = Math.min(1, (nu - start) / 2200);
          if (roert.current) return;
          setPos(50 + Math.sin(t * Math.PI * 2) * 22);
          if (t < 1) ramme = requestAnimationFrame(trin);
        };
        ramme = requestAnimationFrame(trin);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(ramme);
    };
  }, []);

  return (
    <div ref={rod} className="fr-skyder" style={{ ["--pos" as string]: `${pos}%` }}>
      <div className="fr-skyder-lag">{efter}</div>
      <div className="fr-skyder-lag fr-skyder-foer">{foer}</div>
      <span className="fr-skyder-maerke fr-skyder-maerke-v">{foerTekst}</span>
      <span className="fr-skyder-maerke fr-skyder-maerke-h">{efterTekst}</span>
      <span className="fr-skyder-streg" aria-hidden="true">
        <span />
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        aria-label="Træk for at sammenligne før og efter"
        onChange={(e) => {
          roert.current = true;
          setPos(Number(e.target.value));
        }}
      />
    </div>
  );
}
