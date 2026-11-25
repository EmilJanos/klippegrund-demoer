"use client";

import { useState } from "react";
import Ikon from "./Ikon";

// Kontaktformular. Demo: beskeden sendes ikke nogen steder.
export default function KontaktFormular() {
  const [sendt, setSendt] = useState(false);

  if (sendt) {
    return (
      <div className="fr-glas fr-formular" role="status">
        <span className="fr-cta-ikon">
          <Ikon navn="flueben" size={28} />
        </span>
        <h2>Tak for din besked</h2>
        <p className="fr-book-demo">Dette er en demo. Beskeden er ikke sendt eller gemt.</p>
        <button type="button" className="fr-knap fr-knap-kant" onClick={() => setSendt(false)}>
          Skriv en ny
        </button>
      </div>
    );
  }

  return (
    <form
      className="fr-glas fr-formular"
      onSubmit={(e) => {
        e.preventDefault();
        setSendt(true);
      }}
    >
      <h2>Skriv til os</h2>
      <div className="fr-felter">
        <label>
          Navn
          <input type="text" name="navn" autoComplete="name" required />
        </label>
        <label>
          Mail
          <input type="email" name="mail" autoComplete="email" required />
        </label>
        <label>
          Besked
          <textarea name="besked" rows={5} required />
        </label>
      </div>
      <button type="submit" className="fr-knap">
        Send besked <Ikon navn="pil" size={17} />
      </button>
      <p className="fr-book-demo">Demo: intet sendes eller gemmes.</p>
    </form>
  );
}
