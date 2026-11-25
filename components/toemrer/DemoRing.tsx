"use client";

import { useState } from "react";
import Ikon from "./Ikon";

// Telefonknap. Nummeret er fiktivt, så et tryk viser en demobesked i stedet for at ringe op.
export default function DemoRing({ telefon, className, tekst }: { telefon: string; className?: string; tekst?: string }) {
  const [vis, setVis] = useState(false);
  return (
    <>
      <a
        href={`tel:${telefon.replace(/\s/g, "")}`}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setVis(true);
          window.setTimeout(() => setVis(false), 3500);
        }}
      >
        <Ikon navn="telefon" size={17} />
        <span>{tekst ?? telefon}</span>
      </a>
      {vis && (
        <div className="tm-toast" role="status">
          Dette er en demo. Nummeret er fiktivt, så der ringes ikke op.
        </div>
      )}
    </>
  );
}
