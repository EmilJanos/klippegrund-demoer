"use client";

import { useEffect, useRef, useState } from "react";
import Ikon from "./Ikon";

// Valgfri video (public/frisoer/billeder/*.mp4), der spiller lydløst i ring.
// Startbilledet vises som et almindeligt foto, så siden tegnes hurtigt. Videoen hentes først,
// når siden er færdig med at loade, og kun mens den er på skærmen. Den toner frem, når den spiller.
// Der er en pauseknap (kan slås fra med utenKnap), og videoen starter ikke ved "mindre bevægelse".
export default function HeroVideo({ src, plakat, plakatSrcSet, plakatSizes, prioritet, utenKnap }: { src: string; plakat?: string; plakatSrcSet?: string; plakatSizes?: string; prioritet?: boolean; utenKnap?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const stoppet = useRef(false);
  const [spiller, setSpiller] = useState(false);
  const [klar, setKlar] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | null = null;
    const spil = () =>
      v.play().then(
        () => setSpiller(true),
        () => setSpiller(false),
      );
    const start = () => {
      if (!("IntersectionObserver" in window)) {
        spil();
        return;
      }
      io = new IntersectionObserver(
        ([p]) => {
          if (p.isIntersecting && !stoppet.current) spil();
          else if (!p.isIntersecting) v.pause();
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(v);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      io?.disconnect();
    };
  }, []);

  return (
    <>
      {plakat && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={plakat} srcSet={plakatSrcSet} sizes={plakatSrcSet ? plakatSizes : undefined} alt="" aria-hidden="true" loading={prioritet ? "eager" : "lazy"} fetchPriority={prioritet ? "high" : undefined} decoding="async" />
      )}
      <video
        ref={video}
        src={src}
        className={`fr-video ${klar || !plakat ? "er-klar" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setKlar(true)}
      />
      {!utenKnap && (
        <button
          type="button"
          className="fr-videoknap"
          aria-label={spiller ? "Sæt videoen på pause" : "Afspil videoen"}
          onClick={() => {
            const v = video.current;
            if (!v) return;
            if (v.paused) {
              stoppet.current = false;
              v.play();
              setSpiller(true);
            } else {
              stoppet.current = true;
              v.pause();
              setSpiller(false);
            }
          }}
        >
          <Ikon navn={spiller ? "pause" : "afspil"} size={16} />
        </button>
      )}
    </>
  );
}
