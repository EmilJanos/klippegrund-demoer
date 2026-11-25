import Link from "next/link";
import Foto, { fotoSti, medieSti, pladsholder } from "@/components/toemrer/Foto";
import Ikon from "@/components/toemrer/Ikon";
import FoerEfter from "@/components/toemrer/FoerEfter";
import HeroVideo from "@/components/toemrer/HeroVideo";
import Afslutning from "@/components/toemrer/Afslutning";
import { Kursiv, Ordlys } from "@/components/toemrer/Tekst";
import { foerEfterPar } from "@/components/toemrer/foerEfterPar";
import { anmeldelser, hero, omFirmaet, projekter, styrker, ydelser } from "@/lib/toemrer";

const i = (n: number) => ({ ["--i" as string]: n });
const d = (n: number) => ({ ["--d" as string]: n });

export default function ToemrerForside() {
  const heroPc = fotoSti("hero.jpg");
  const heroMobil = fotoSti("hero-mobil.jpg");
  const heroVideo = medieSti("hero.mp4");
  const heroSrc = heroPc ?? pladsholder("hero.jpg", "eg-varm");

  return (
    <main id="indhold" tabIndex={-1}>
      {/* Hero: stor overskrift på lys baggrund, fotoet (eller videoen) i en ramme nedenunder */}
      <section className="tm-hero">
        <div className="tm-indhold">
          <p className="tm-overlinje tm-ind" style={i(0)}>
            {hero.overlinje}
          </p>
          <h1 className="tm-display">
            {hero.linjer.map((l, n) => (
              <span key={l} className="tm-linje">
                <span style={i(n + 1)}>
                  <Kursiv tekst={l} />
                </span>
              </span>
            ))}
          </h1>
          <div className="tm-hero-bund">
            <p className="tm-hero-brod tm-ind" style={i(3)}>
              {hero.tekst}
            </p>
            <div className="tm-hero-valg tm-ind" style={i(4)}>
              <Link href="/toemrer/kontakt" className="tm-knap">
                {hero.knap}
                <span className="tm-knap-pil">
                  <Ikon navn="pil" size={18} />
                </span>
              </Link>
              <Link href="/toemrer/projekter" className="tm-link">
                {hero.link}
              </Link>
            </div>
          </div>
          <div className="tm-hero-medie tm-billede tm-form-braedder">
            {heroVideo ? (
              <HeroVideo src={heroVideo} plakat={heroSrc} />
            ) : (
              <picture>
                <source media="(max-width: 760px)" srcSet={heroMobil ?? pladsholder("hero-mobil.jpg", "eg-varm")} />
                <img src={heroSrc} alt="Tømrer høvler en egeplanke i værkstedet" fetchPriority="high" decoding="async" />
              </picture>
            )}
            {!heroPc && !heroVideo && <span className="tm-ph-navn">hero.jpg · hero-mobil.jpg</span>}
            <p className="tm-hero-skilt">
              <span className="tm-prik" aria-hidden="true" />
              {hero.skilt}
            </p>
          </div>
        </div>
      </section>

      {/* Fire styrker */}
      <section className="tm-styrker" aria-label="Det kan du regne med">
        <div className="tm-indhold tm-styrker-gitter">
          {styrker.map((s, n) => (
            <div key={s.titel} className="tm-styrke" data-vis style={d(n)}>
              <Ikon navn={s.ikon} size={22} />
              <h2 className="tm-h3">{s.titel}</h2>
              <p>{s.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ydelser */}
      <section className="tm-sektion">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Ydelser</p>
              <h2 className="tm-h2">
                Det <em>laver</em> vi
              </h2>
            </div>
            <Link href="/toemrer/ydelser" className="tm-link">
              Alle ydelser
            </Link>
          </div>
          <div className="tm-ydelser">
            {ydelser.map((y, n) => (
              <Link key={y.id} href={`/toemrer/ydelser#${y.id}`} className="tm-ydelse" data-vis style={d(n)}>
                <div className="tm-billede tm-billede-kvadrat">
                  <Foto fil={y.billede} alt="" />
                </div>
                <div className="tm-ydelse-top">
                  <span className="tm-nr">0{n + 1}</span>
                  <h3 className="tm-h3">{y.titel}</h3>
                  <span className="tm-rundpil">
                    <Ikon navn="pilop" size={18} />
                  </span>
                </div>
                <p>{y.tekst}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Om firmaet: mørk flade, ordene lyser op, tallene tæller */}
      <section className="tm-om tm-moerk">
        <div className="tm-indhold tm-om-gitter">
          <div className="tm-om-tekst">
            <p className="tm-overlinje">{omFirmaet.overlinje}</p>
            <Ordlys tekst={omFirmaet.udsagn} className="tm-udsagn" />
            <p className="tm-om-brod" data-vis>
              {omFirmaet.tekst}
            </p>
            <div className="tm-tal" data-vis>
              {omFirmaet.tal.map((t) => (
                <p key={t.tekst}>
                  <strong>
                    <span data-tael={t.tal}>{t.tal.toLocaleString("da-DK")}</span>
                    {t.efter}
                  </strong>
                  {t.tekst}
                </p>
              ))}
            </div>
          </div>
          <div className="tm-om-foto tm-billede tm-form-forskudt" data-vis>
            <Foto fil={omFirmaet.billede} alt="Tømrermesteren i værkstedet" tone="valnoed" />
          </div>
        </div>
      </section>

      {/* Før og efter + udvalgte projekter */}
      <section className="tm-sektion">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Før og efter</p>
              <h2 className="tm-h2">
                Se <em>forskellen</em>
              </h2>
            </div>
          </div>
          <div data-vis>
            <FoerEfter par={foerEfterPar()} />
          </div>

          <div className="tm-sektionshoved tm-sektionshoved-lille" data-vis>
            <h3 className="tm-h3">Udvalgte projekter</h3>
            <Link href="/toemrer/projekter" className="tm-link">
              Alle projekter
            </Link>
          </div>
          <div className="tm-galleri">
            {projekter.slice(0, 4).map((p, n) => (
              <figure key={p.titel} className="tm-projekt" data-vis style={d(n % 2)}>
                <div className="tm-billede tm-billede-4-3">
                  <Foto fil={p.billede} alt={p.titel} />
                </div>
                <figcaption>
                  <span>{p.titel}</span>
                  <span>
                    {p.sted}, {p.aar}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Anmeldelser (fiktive) */}
      <section className="tm-sektion tm-sektion-kant">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Anmeldelser</p>
              <h2 className="tm-h2">
                Det siger <em>kunderne</em>
              </h2>
            </div>
            <p className="tm-note">Eksempler. Navne og udtalelser er fiktive.</p>
          </div>
          <div className="tm-anmeldelser">
            {anmeldelser.map((a, n) => (
              <blockquote key={a.navn} className="tm-anmeldelse" data-vis style={d(n)}>
                <div className="tm-stjerner" role="img" aria-label="5 ud af 5 stjerner">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Ikon key={s} navn="stjerne" size={14} />
                  ))}
                </div>
                <p>{a.tekst}</p>
                <footer>
                  <span className="tm-initialer" aria-hidden="true">
                    {a.navn
                      .split(/\s+/)
                      .filter((x) => /^[A-ZÆØÅ]/.test(x))
                      .map((x) => x[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <strong>{a.navn}</strong>
                    {a.by}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Afslutning />
    </main>
  );
}
