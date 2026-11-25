"use client";

import { useState } from "react";
import Ikon from "./Ikon";

// Kontaktformular til demoen. Den sender ikke noget: efter tjek af felterne vises en besked om, at det er en demo.

type Fejl = { navn?: string; kontakt?: string; besked?: string };

export default function KontaktFormular({ emner, forvalgt }: { emner: string[]; forvalgt?: string }) {
  const [emne, setEmne] = useState(forvalgt && emner.includes(forvalgt) ? forvalgt : emner[0]);
  const [fejl, setFejl] = useState<Fejl>({});
  const [sendt, setSendt] = useState(false);

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const felt = (n: string) => String(d.get(n) ?? "").trim();
    const f: Fejl = {};
    if (!felt("navn")) f.navn = "Skriv dit navn.";
    if (!felt("telefon") && !felt("mail")) f.kontakt = "Skriv et telefonnummer eller en mailadresse, så vi kan svare.";
    if (!felt("besked")) f.besked = "Skriv kort, hvad opgaven går ud på.";
    setFejl(f);
    const foerste = f.navn ? "navn" : f.kontakt ? "telefon" : f.besked ? "besked" : null;
    if (foerste) {
      (form.elements.namedItem(foerste) as HTMLElement | null)?.focus();
      return;
    }
    setSendt(true);
  }

  if (sendt) {
    return (
      <div className="tm-formular tm-formular-tak" role="status">
        <h2 className="tm-h3">Tak for din besked</h2>
        <p>
          Dette er en demo, så beskeden er ikke sendt. På en rigtig side lander den i firmaets indbakke, og kunden får en
          kvittering.
        </p>
        <button type="button" className="tm-link" onClick={() => setSendt(false)}>
          Skriv en ny besked
        </button>
      </div>
    );
  }

  return (
    <form className="tm-formular" noValidate onSubmit={send}>
      <fieldset className="tm-emner">
        <legend>Hvad drejer det sig om?</legend>
        <div>
          {emner.map((x) => (
            <label key={x} className="tm-emne">
              <input type="radio" name="emne" value={x} checked={emne === x} onChange={() => setEmne(x)} />
              <span>{x}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="tm-felt">
        <label htmlFor="tm-navn">Navn</label>
        <input id="tm-navn" name="navn" type="text" autoComplete="name" aria-invalid={!!fejl.navn} aria-describedby={fejl.navn ? "tm-navn-fejl" : undefined} />
        {fejl.navn && (
          <p id="tm-navn-fejl" className="tm-fejl">
            {fejl.navn}
          </p>
        )}
      </div>

      <div className="tm-felt-raekke">
        <div className="tm-felt">
          <label htmlFor="tm-telefon">Telefon</label>
          <input id="tm-telefon" name="telefon" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!fejl.kontakt} aria-describedby={fejl.kontakt ? "tm-kontakt-fejl" : undefined} />
        </div>
        <div className="tm-felt">
          <label htmlFor="tm-mail">E-mail</label>
          <input id="tm-mail" name="mail" type="email" autoComplete="email" spellCheck={false} aria-invalid={!!fejl.kontakt} aria-describedby={fejl.kontakt ? "tm-kontakt-fejl" : undefined} />
        </div>
      </div>
      {fejl.kontakt && (
        <p id="tm-kontakt-fejl" className="tm-fejl tm-fejl-raekke">
          {fejl.kontakt}
        </p>
      )}

      <div className="tm-felt">
        <label htmlFor="tm-besked">Fortæl kort om opgaven</label>
        <textarea id="tm-besked" name="besked" rows={5} aria-invalid={!!fejl.besked} aria-describedby={fejl.besked ? "tm-besked-fejl" : undefined} />
        {fejl.besked && (
          <p id="tm-besked-fejl" className="tm-fejl">
            {fejl.besked}
          </p>
        )}
      </div>

      <div className="tm-formular-fod">
        <button type="submit" className="tm-knap">
          Send besked
          <span className="tm-knap-pil">
            <Ikon navn="pil" size={18} />
          </span>
        </button>
        <p>Demo: formularen sender ikke noget.</p>
      </div>
    </form>
  );
}
