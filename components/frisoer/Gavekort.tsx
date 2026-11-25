// Grafikken i afsnittet "Giv en oplevelse videre": gavekortet og plejeserien Prisme Care.
// Gavekortet er tegnet i SVG og CSS og vipper efter musen (data-vip i Effekter.tsx). Bag det ligger fotoet af plejeserien.
import Foto from "./Foto";

export default function Gavekort() {
  return (
    <div className="fr-grafik-scene">
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fr-guld" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f0dcae" />
            <stop offset="0.5" stopColor="#c9a56a" />
            <stop offset="1" stopColor="#8a6a3a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="fr-billede fr-form-skraa fr-grafik-foto">
        <Foto fil="produkter.jpg" alt="Plejeserien Prisme Care: shampoo, balsam og hårolie" />
      </div>

      <div className="fr-gavekort" data-vip>
        <div className="fr-gavekort-flade">
          <span className="fr-gavekort-glans" aria-hidden="true" />
          <svg viewBox="0 0 120 120" className="fr-gavekort-prisme" aria-hidden="true">
            <path d="M60 14 108 100H12Z" fill="none" stroke="url(#fr-guld)" strokeWidth="1.2" />
            <path d="M60 14v86M60 14 36 100M60 14l24 86" stroke="url(#fr-guld)" strokeWidth="0.7" opacity="0.6" />
            <path d="M0 62 44 58" stroke="#f3ede3" strokeWidth="0.8" opacity="0.7" />
            <path d="M76 56 120 40M77 60l43-4M78 64l42 10" stroke="url(#fr-guld)" strokeWidth="0.8" />
          </svg>
          <span className="fr-gavekort-top">Gavekort</span>
          <span className="fr-gavekort-navn">Prisme</span>
          <span className="fr-gavekort-bund">
            <span>Hair Studio · Aarhus</span>
            <span>Nr. 0248</span>
          </span>
        </div>
      </div>
    </div>
  );
}
