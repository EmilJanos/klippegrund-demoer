"use client";

import { useEffect, useMemo, useState } from "react";
import Ikon from "./Ikon";
import { elevGruppe, prisliste, team, tider } from "@/lib/frisoer";

// Booking i fire trin. Det ligner en rigtig booking, men intet sendes eller gemmes: det er en demo.
// Valgene ligger kun i browserens hukommelse, mens siden er åben.

const trin = ["Behandling", "Frisør", "Tid", "Dine oplysninger"];
const dagNavne = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];
const maaneder = ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."];

type Valg = { gruppe: string; navn: string; tid: number; pris: number };

// portraetter: frisørernes fotos i samme rækkefølge som team (sendes ind fra siden, fordi fotos findes på serveren)
export default function Booking({ portraetter = [] }: { portraetter?: React.ReactNode[] }) {
  const [nu, setNu] = useState(0);
  const [aabenGruppe, setAabenGruppe] = useState<string>(prisliste[0].id);
  const [behandling, setBehandling] = useState<Valg | null>(null);
  const [frisoer, setFrisoer] = useState<string | null>(null);
  const [dag, setDag] = useState<number | null>(null);
  const [tid, setTid] = useState<string | null>(null);
  const [navn, setNavn] = useState("");
  const [telefon, setTelefon] = useState("");
  const [fejl, setFejl] = useState(false);
  const [faerdig, setFaerdig] = useState(false);
  const [dage, setDage] = useState<Date[]>([]);

  // Dagene regnes ud i browseren, så server og browser ikke bliver uenige om datoen.
  // Links fra andre sider kan vælge gruppe eller frisør på forhånd (?behandling=farve, ?frisoer=maja).
  useEffect(() => {
    const liste: Date[] = [];
    const d = new Date();
    while (liste.length < 10) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) liste.push(new Date(d));
    }
    // Skal ske efter første tegning: dato og adresselinje findes kun i browseren
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDage(liste);
    const q = new URLSearchParams(window.location.search);
    const g = q.get("behandling");
    if (g && prisliste.some((p) => p.id === g)) setAabenGruppe(g);
    const f = q.get("frisoer");
    const valgt = team.find((t) => t.id === f);
    if (valgt) setFrisoer(valgt.id);
    // Kommer man fra en elevs kort, åbner elevbehandlingerne, for det er dem, eleven kan bookes til
    if (valgt?.elev) setAabenGruppe(elevGruppe);
  }, []);

  // Ikke alle tider er ledige: hvilke afhænger af dagen, så det ligner en rigtig kalender
  const optaget = useMemo(() => new Set(tider.filter((_, i) => dag !== null && (i * 7 + dag * 3) % 4 === 0)), [dag]);

  // Elever laver kun elevbehandlinger, og elevbehandlinger laves kun af elever
  const elevValgt = behandling?.gruppe === elevGruppe;
  const mulige = team.map((t, i) => ({ t, i })).filter(({ t }) => Boolean(t.elev) === elevValgt);
  const vaelgBehandling = (v: Valg) => {
    setBehandling(v);
    const f = team.find((t) => t.id === frisoer);
    if (f && Boolean(f.elev) !== (v.gruppe === elevGruppe)) setFrisoer(null);
  };

  const frisoerNavn = frisoer === "alle" ? (elevValgt ? "Første ledige elev" : "Første ledige") : team.find((t) => t.id === frisoer)?.navn;
  const dagTekst = dag !== null && dage[dag] ? `${dagNavne[dage[dag].getDay()]}. ${dage[dag].getDate()}. ${maaneder[dage[dag].getMonth()]}` : null;
  const klar = [behandling !== null, frisoer !== null, dag !== null && tid !== null, true][nu];

  const videre = () => {
    if (nu < 3) return setNu(nu + 1);
    if (!navn.trim() || telefon.replace(/\D/g, "").length < 8) return setFejl(true);
    setFejl(false);
    setFaerdig(true);
  };

  if (faerdig) {
    return (
      <div className="fr-book-faerdig fr-glas" role="status">
        <span className="fr-cta-ikon">
          <Ikon navn="flueben" size={30} />
        </span>
        <h2>Tak, {navn.trim().split(" ")[0]}. Sådan ville det se ud.</h2>
        <p>
          {behandling?.navn} hos {frisoerNavn}, {dagTekst} kl. {tid}.
        </p>
        <p className="fr-book-demo">Dette er en demo. Der er ikke booket noget, og dine oplysninger er hverken sendt eller gemt.</p>
        <button
          type="button"
          className="fr-knap fr-knap-kant"
          onClick={() => {
            setFaerdig(false);
            setNu(0);
            setBehandling(null);
            setFrisoer(null);
            setDag(null);
            setTid(null);
            setNavn("");
            setTelefon("");
          }}
        >
          Prøv igen
        </button>
      </div>
    );
  }

  return (
    <div className="fr-book">
      <div className="fr-book-venstre">
        <ol className="fr-book-trin" aria-label="Trin i bookingen">
          {trin.map((t, i) => (
            <li key={t} className={i === nu ? "er-nu" : i < nu ? "er-klar" : ""} aria-current={i === nu ? "step" : undefined}>
              <button type="button" disabled={i > nu} onClick={() => setNu(i)}>
                <span>{i < nu ? <Ikon navn="flueben" size={14} /> : i + 1}</span>
                {t}
              </button>
            </li>
          ))}
        </ol>

        <div className="fr-book-flade fr-glas" key={nu}>
          {nu === 0 && (
            <fieldset>
              <legend>Hvad skal du have lavet?</legend>
              <div className="fr-book-faner" role="tablist" aria-label="Behandlingstyper">
                {prisliste.map((g) => (
                  <button key={g.id} type="button" role="tab" aria-selected={aabenGruppe === g.id} onClick={() => setAabenGruppe(g.id)}>
                    <Ikon navn={g.ikon} size={16} /> {g.navn}
                  </button>
                ))}
              </div>
              <div className="fr-book-liste">
                {prisliste
                  .find((g) => g.id === aabenGruppe)
                  ?.punkter.map((p) => (
                    <label key={p.navn} className="fr-valg">
                      <input type="radio" name="behandling" checked={behandling?.navn === p.navn} onChange={() => vaelgBehandling({ gruppe: aabenGruppe, navn: p.navn, tid: p.tid, pris: p.pris })} />
                      <span className="fr-valg-navn">{p.navn}</span>
                      <span className="fr-valg-tid">{p.tid} min.</span>
                      <span className="fr-valg-pris">
                        {"normal" in p && <s className="fr-pris-normal">{p.normal.toLocaleString("da-DK")} kr.</s>}
                        {p.pris === 0 ? "Gratis" : `${p.pris.toLocaleString("da-DK")} kr.`}
                      </span>
                    </label>
                  ))}
              </div>
            </fieldset>
          )}

          {nu === 1 && (
            <fieldset>
              <legend>{elevValgt ? "Hvilken elev vil du booke hos?" : "Hvem vil du booke hos?"}</legend>
              {elevValgt && <p className="fr-elevnote">En uddannet frisør ser med hele vejen.</p>}
              <div className="fr-book-frisoerer">
                <label className="fr-valg fr-valg-person">
                  <input type="radio" name="frisoer" checked={frisoer === "alle"} onChange={() => setFrisoer("alle")} />
                  <span className="fr-valg-rund">
                    <Ikon navn="kunder" size={22} />
                  </span>
                  <span className="fr-valg-persontekst">
                    <span className="fr-valg-navn">{elevValgt ? "Første ledige elev" : "Første ledige"}</span>
                    <span className="fr-valg-rolle">Flest tider</span>
                    <span className="fr-valg-om">{elevValgt ? "Vi finder den elev, der har tid først." : "Vi finder den frisør, der passer bedst til din behandling og har tid først."}</span>
                  </span>
                </label>
                {mulige.map(({ t, i }) => (
                  <label key={t.id} className="fr-valg fr-valg-person">
                    <input type="radio" name="frisoer" checked={frisoer === t.id} onChange={() => setFrisoer(t.id)} />
                    <span className="fr-valg-rund">{portraetter[i] ?? t.navn.split(" ").map((d) => d[0]).join("")}</span>
                    <span className="fr-valg-persontekst">
                      <span className="fr-valg-navn">{t.navn}</span>
                      <span className="fr-valg-rolle">{t.rolle}</span>
                      <span className="fr-valg-om">{t.tekst}</span>
                      <span className="fr-maerker">
                        {t.fag.map((f) => (
                          <span key={f}>{f}</span>
                        ))}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {nu === 2 && (
            <>
              <fieldset>
                <legend>Vælg en dag</legend>
                <div className="fr-book-dage">
                  {dage.map((d, i) => (
                    <label key={i} className="fr-valg fr-valg-dag">
                      <input
                        type="radio"
                        name="dag"
                        checked={dag === i}
                        onChange={() => {
                          setDag(i);
                          setTid(null);
                        }}
                      />
                      <span>{dagNavne[d.getDay()]}</span>
                      <strong>{d.getDate()}</strong>
                      <span>{maaneder[d.getMonth()]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {dag !== null && (
                <fieldset className="fr-book-tider-felt">
                  <legend>Ledige tider</legend>
                  <div className="fr-book-tider">
                    {tider.map((t) => (
                      <label key={t} className={`fr-valg fr-valg-tidspunkt ${optaget.has(t) ? "er-optaget" : ""}`}>
                        <input type="radio" name="tid" disabled={optaget.has(t)} checked={tid === t} onChange={() => setTid(t)} />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </>
          )}

          {nu === 3 && (
            <fieldset>
              <legend>Dine oplysninger</legend>
              <div className="fr-felter">
                <label>
                  Navn
                  <input type="text" autoComplete="name" value={navn} onChange={(e) => setNavn(e.target.value)} aria-invalid={fejl && !navn.trim()} />
                </label>
                <label>
                  Telefon
                  <input type="tel" inputMode="tel" autoComplete="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} aria-invalid={fejl && telefon.replace(/\D/g, "").length < 8} />
                  <small>Vi sender en sms dagen før. I demoen sendes intet.</small>
                </label>
              </div>
              {fejl && (
                <p className="fr-fejl" role="alert">
                  Skriv dit navn og et telefonnummer på otte cifre.
                </p>
              )}
            </fieldset>
          )}

          <div className="fr-book-knapper">
            {nu > 0 && (
              <button type="button" className="fr-knap fr-knap-kant" onClick={() => setNu(nu - 1)}>
                Tilbage
              </button>
            )}
            <button type="button" className="fr-knap" disabled={!klar} onClick={videre}>
              {nu === 3 ? "Bekræft booking" : "Videre"} <Ikon navn="pil" size={17} />
            </button>
          </div>
        </div>
      </div>

      <aside className="fr-book-kvittering fr-glas" aria-label="Din booking" aria-live="polite">
        <h2>Din booking</h2>
        <dl>
          <div>
            <dt>Behandling</dt>
            <dd>{behandling?.navn ?? "Ikke valgt"}</dd>
          </div>
          <div>
            <dt>Frisør</dt>
            <dd>{frisoerNavn ?? "Ikke valgt"}</dd>
          </div>
          <div>
            <dt>Tid</dt>
            <dd>{dagTekst && tid ? `${dagTekst} kl. ${tid}` : "Ikke valgt"}</dd>
          </div>
          <div>
            <dt>Varighed</dt>
            <dd>{behandling ? `${behandling.tid} min.` : "-"}</dd>
          </div>
        </dl>
        <p className="fr-book-total">
          <span>Pris</span>
          <strong>{behandling ? (behandling.pris === 0 ? "Gratis" : `${behandling.pris.toLocaleString("da-DK")} kr.`) : "-"}</strong>
        </p>
        <p className="fr-book-demo">Demo: intet sendes eller gemmes.</p>
      </aside>
    </div>
  );
}
