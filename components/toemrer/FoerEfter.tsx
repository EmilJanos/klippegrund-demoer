"use client";

import { useEffect, useRef, useState } from "react";
import Ikon from "./Ikon";

// Før/efter-skyder: efter-billedet ligger øverst og klippes med clip-path.
// Skyderen er et almindeligt range-felt, så den virker med tastatur og skærmlæser.
// Første gang den kommer til syne, glider håndtaget én gang frem og tilbage, så man kan se, at den kan trækkes.

export type Par = {
  titel: string;
  tekst: string;
  foer: string;
  efter: string;
  foerNavn?: string; // filnavn, hvis billedet er en pladsholder
  efterNavn?: string;
};

export default function FoerEfter({ par }: { par: Par[] }) {
  const [valgt, setValgt] = useState(0);
  const [pos, setPos] = useState(50);
  const ramme = useRef<HTMLDivElement>(null);
  const roert = useRef(false);
  const p = par[valgt];

  useEffect(() => {
    const el = ramme.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([post]) => {
        if (!post.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const varighed = 2600;
        const trin = (nu: number) => {
          if (roert.current) return;
          const t = Math.min(1, (nu - start) / varighed);
          const bloed = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          setPos(t === 1 ? 50 : 50 - 17 * Math.sin(bloed * Math.PI * 2));
          if (t < 1) raf = requestAnimationFrame(trin);
        };
        raf = requestAnimationFrame(trin);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="tm-fe">
      <div className="tm-fe-faner" role="group" aria-label="Vælg projekt">
        {par.map((x, i) => (
          <button
            key={x.titel}
            type="button"
            aria-pressed={i === valgt}
            onClick={() => {
              roert.current = true;
              setValgt(i);
              setPos(50);
            }}
          >
            {x.titel}
          </button>
        ))}
      </div>

      <div ref={ramme} className="tm-fe-ramme" style={{ ["--pos" as string]: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.foer} alt="" className="tm-fe-billede" draggable={false} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.efter} alt="" className="tm-fe-billede tm-fe-efter" draggable={false} loading="lazy" />
        <span className="tm-fe-maerke tm-fe-maerke-foer">Før{p.foerNavn ? ` · ${p.foerNavn}` : ""}</span>
        <span className="tm-fe-maerke tm-fe-maerke-efter">Efter{p.efterNavn ? ` · ${p.efterNavn}` : ""}</span>
        <div className="tm-fe-linje" aria-hidden="true">
          <span className="tm-fe-greb">
            <Ikon navn="traek" size={20} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => {
            roert.current = true;
            setPos(Number(e.target.value));
          }}
          onPointerDown={() => {
            roert.current = true;
          }}
          onKeyDown={(e) => {
            // større trin med piletasterne, så man ikke skal trykke 100 gange
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            roert.current = true;
            setPos((v) => Math.min(100, Math.max(0, Math.round(v) + (e.key === "ArrowRight" ? 5 : -5))));
          }}
          aria-label={`Træk for at se før og efter: ${p.titel}`}
          className="tm-fe-skyder"
        />
      </div>
      <div className="tm-fe-fod">
        <p>{p.tekst}</p>
        <p className="tm-fe-tip">Træk i håndtaget</p>
      </div>
    </div>
  );
}
