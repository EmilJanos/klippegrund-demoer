"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import DemoRing from "./DemoRing";
import { firma, menu } from "@/lib/toemrer";

export default function Header() {
  const sti = usePathname();
  const [aaben, setAaben] = useState(false);

  // Luk menuen på Escape, og lås baggrunden, mens den er åben. Links lukker den selv ved klik.
  useEffect(() => {
    document.body.style.overflow = aaben ? "hidden" : "";
    const tast = (e: KeyboardEvent) => e.key === "Escape" && setAaben(false);
    window.addEventListener("keydown", tast);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", tast);
    };
  }, [aaben]);

  return (
    <>
      <header className="tm-header">
        <div className="tm-indhold tm-header-raekke">
          <Link href="/toemrer" className="tm-header-logo" aria-label={`${firma.navn}, forside`}>
            <Logo />
          </Link>
          <nav className="tm-nav" aria-label="Hovedmenu">
            {menu.map((m) => (
              <Link key={m.href} href={m.href} aria-current={sti === m.href ? "page" : undefined}>
                {m.tekst}
              </Link>
            ))}
          </nav>
          <div className="tm-header-hoejre">
            <DemoRing telefon={firma.telefon} className="tm-header-tlf" />
            <Link href="/toemrer/kontakt" className="tm-knap tm-knap-lille">
              Få et tilbud
            </Link>
          </div>
          <button
            type="button"
            className={`tm-menuknap ${aaben ? "er-aaben" : ""}`}
            aria-expanded={aaben}
            aria-controls="tm-mobilmenu"
            aria-label={aaben ? "Luk menu" : "Åbn menu"}
            onClick={() => setAaben((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobilmenuen ligger uden for headeren, så den kan fylde hele skærmen */}
      <div id="tm-mobilmenu" className={`tm-mobilmenu ${aaben ? "er-aaben" : ""}`}>
        <nav aria-label="Mobilmenu">
          {menu.map((m, i) => (
            <Link key={m.href} href={m.href} style={{ ["--i" as string]: i }} aria-current={sti === m.href ? "page" : undefined} onClick={() => setAaben(false)}>
              {m.tekst}
              <span>0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="tm-mobilmenu-bund">
          <Link href="/toemrer/kontakt" className="tm-knap" onClick={() => setAaben(false)}>
            Få et tilbud
          </Link>
          <p>
            {firma.telefon}
            <br />
            {firma.mail}
          </p>
        </div>
      </div>
    </>
  );
}
