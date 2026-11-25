"use client";

import { useEffect, useRef, useState } from "react";
import Ikon from "./Ikon";

// Valgfri video (public/frisoer/billeder/*.mp4). Spiller lydløst i ring med fotoet som startbillede.
// Der er en pauseknap, og videoen starter ikke, hvis brugeren har bedt om mindre bevægelse.
export default function HeroVideo({ src, plakat }: { src: string; plakat?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [spiller, setSpiller] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().then(
      () => setSpiller(true),
      () => setSpiller(false),
    );
  }, []);

  return (
    <>
      <video ref={video} src={src} poster={plakat} muted loop playsInline preload="metadata" aria-hidden="true" />
      <button
        type="button"
        className="fr-videoknap"
        aria-label={spiller ? "Sæt videoen på pause" : "Afspil videoen"}
        onClick={() => {
          const v = video.current;
          if (!v) return;
          if (v.paused) {
            v.play();
            setSpiller(true);
          } else {
            v.pause();
            setSpiller(false);
          }
        }}
      >
        <Ikon navn={spiller ? "pause" : "afspil"} size={16} />
      </button>
    </>
  );
}
