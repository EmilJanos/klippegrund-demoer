"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Ikon from "./Ikon";
import DemoKnap from "./DemoKnap";
import { firma, menu } from "@/lib/frisoer";

export default function Header() {
  const sti = usePathname();
  const [aaben, setAaben] = useState(false);

  // Luk menuen på Escape, og lås baggrunden, mens den er åben.
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
      <header className="fr-header">
        <div className="fr-indhold fr-header-raekke">
          <Link href="/frisoer" className="fr-header-logo" aria-label={`${firma.navn}, forside`}>
            <Logo />
          </Link>
          <nav className="fr-nav" aria-label="Hovedmenu">
            {menu.map((m) => (
              <Link key={m.href} href={m.href} aria-current={sti === m.href ? "page" : undefined}>
                {m.tekst}
              </Link>
            ))}
          </nav>
          <div className="fr-header-hoejre">
            <DemoKnap className="fr-rundknap" besked="Dette er en demo. Nummeret er fiktivt, så der ringes ikke op.">
              <Ikon navn="telefon" size={17} />
              <span className="fr-skjult">Ring {firma.telefon}</span>
            </DemoKnap>
            <Link href="/frisoer/book" className="fr-knap fr-knap-lille">
              Book tid
            </Link>
          </div>
          <button type="button" className="fr-menuknap" aria-expanded={aaben} aria-controls="fr-mobilmenu" aria-label={aaben ? "Luk menu" : "Åbn menu"} onClick={() => setAaben((v) => !v)}>
            <Ikon navn={aaben ? "luk" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <div id="fr-mobilmenu" className={`fr-mobilmenu ${aaben ? "er-aaben" : ""}`}>
        <nav aria-label="Mobilmenu">
          {menu.map((m, i) => (
            <Link key={m.href} href={m.href} style={{ ["--i" as string]: i }} aria-current={sti === m.href ? "page" : undefined} onClick={() => setAaben(false)}>
              {m.tekst}
            </Link>
          ))}
        </nav>
        <Link href="/frisoer/book" className="fr-knap" onClick={() => setAaben(false)}>
          Book tid
        </Link>
      </div>
    </>
  );
}
