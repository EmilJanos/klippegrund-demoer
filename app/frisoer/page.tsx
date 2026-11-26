import Link from "next/link";
import { preload } from "react-dom";
import Foto, { fotoSrcSet, fotoSti, medieSti } from "@/components/frisoer/Foto";
import Ikon from "@/components/frisoer/Ikon";
import { Kursiv } from "@/components/frisoer/Tekst";
import BaandTraek from "@/components/frisoer/BaandTraek";
import Farveskyder from "@/components/frisoer/Farveskyder";
import Gavekort from "@/components/frisoer/Gavekort";
import HeroVideo from "@/components/frisoer/HeroVideo";
import { afslutning, behandlinger, farver, firma, galleri, grafik, hero, om, tal, udtalelser } from "@/lib/frisoer";

export default function Forside() {
  const heroVideo = medieSti("hero.mp4");
  const bogstavVideo = medieSti("bogstaver.mp4");
  const bogstavFoto = fotoSti("bogstaver.jpg");
  const raekker = [galleri.slice(0, 6), galleri.slice(6)];
  const heroPlakat = fotoSti("hero.jpg");
  // Heroens startbillede er det største på skærmen, så det hentes først
  if (heroPlakat) {
    const srcSet = fotoSrcSet(heroPlakat);
    preload(heroPlakat, { as: "image", fetchPriority: "high", imageSrcSet: srcSet, imageSizes: srcSet ? "(max-width: 760px) 86vw, 500px" : undefined });
  }

  return (
    <main id="indhold">
      {/* Hero: tekst til venstre, foto eller video i en spejlbue til højre */}
      <section className="fr-hero">
        <div className="fr-indhold fr-hero-gitter">
          <div className="fr-hero-tekst">
            <p className="fr-overlinje">{hero.overlinje}</p>
            <h1>
              {hero.linjer.map((l, i) => (
                <span key={l} className="fr-linje" style={{ ["--i" as string]: i }}>
                  <span>
                    <Kursiv tekst={l} />
                  </span>
                </span>
              ))}
            </h1>
            <p className="fr-hero-brod">{hero.tekst}</p>
            <div className="fr-knapper">
              <Link href="/frisoer/book" className="fr-knap">
                Book tid <Ikon navn="pil" size={17} />
              </Link>
              <Link href="/frisoer/behandlinger" className="fr-knap fr-knap-kant">
                Se behandlinger
              </Link>
            </div>
            <p className="fr-hero-anmeldelse">
              <span className="fr-stjerner" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Ikon key={i} navn="stjerne" size={15} fyld />
                ))}
              </span>
              <span>
                <strong>{hero.anmeldelse.tal}</strong> af 5 · {hero.anmeldelse.antal}
              </span>
            </p>
          </div>
          <div className="fr-hero-medie">
            <span className="fr-hero-ring" aria-hidden="true" />
            <div className="fr-billede fr-form-facet">
              {heroVideo ? <HeroVideo src={heroVideo} plakat={heroPlakat ?? undefined} plakatSrcSet={heroPlakat ? fotoSrcSet(heroPlakat) : undefined} plakatSizes="(max-width: 760px) 86vw, 500px" prioritet /> : <Foto fil="hero.jpg" alt="Kvinde med langt, bølget hår i varmt lys" prioritet tone={2} />}
            </div>
            <div className="fr-hero-kort fr-glas">
              <Ikon navn="kalender" size={18} />
              <span>
                <strong>Næste ledige tid</strong>
                I morgen kl. 10.30
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Firmanavnet med levende billeder inde i bogstaverne (billedformen Bogstaver) */}
      <section className="fr-bogstaver" aria-label={firma.navn}>
        <div className="fr-bogstaver-medie">
          {bogstavVideo ? (
            <HeroVideo src={bogstavVideo} plakat={bogstavFoto ?? undefined} utenKnap />
          ) : bogstavFoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bogstavFoto} alt="" />
          ) : (
            <span className="fr-bogstaver-ph" />
          )}
        </div>
        <div className="fr-bogstaver-ord" aria-hidden="true">
          {firma.kortNavn}
        </div>
      </section>

      {/* Tal */}
      <section className="fr-indhold">
        <ul className="fr-tal fr-glas" data-vis>
          {tal.map((t) => (
            <li key={t.tekst}>
              <Ikon navn={t.ikon} size={30} />
              <span>
                <strong>
                  <span data-tael={t.tal}>{t.tal.toLocaleString("da-DK")}</span>
                  {t.efter}
                </strong>
                {t.tekst}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Behandlinger */}
      <section className="fr-sektion fr-indhold">
        <div className="fr-sektion-top" data-vis>
          <div>
            <p className="fr-overlinje">Behandlinger</p>
            <h2>
              <Kursiv tekst="Klip. Farve. _Pleje_." />
            </h2>
          </div>
          <Link href="/frisoer/behandlinger" className="fr-knap fr-knap-kant fr-knap-lille">
            Alle behandlinger og priser <Ikon navn="pil" size={16} />
          </Link>
        </div>
        <ul className="fr-kort-raekke">
          {behandlinger.map((b, i) => (
            <li key={b.navn} data-vis style={{ ["--i" as string]: i }}>
              <Link href="/frisoer/behandlinger" className="fr-kort fr-glas" data-lys>
                <span className="fr-billede fr-form-skraa">
                  <Foto fil={b.fil} alt="" sizes="(max-width: 760px) 80vw, 260px" />
                </span>
                <span className="fr-kort-ikon">
                  <Ikon navn={b.ikon} size={19} />
                </span>
                <span className="fr-kort-navn">{b.navn}</span>
                <span className="fr-kort-tekst">{b.tekst}</span>
                <span className="fr-kort-fra">
                  {b.fra} <Ikon navn="pil" size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Før og efter */}
      <section className="fr-sektion fr-indhold fr-delt">
        <div data-vis>
          <p className="fr-overlinje">{farver.overlinje}</p>
          <h2>
            <Kursiv tekst={farver.titel} />
          </h2>
          <p className="fr-brod">{farver.tekst}</p>
          <Link href="/frisoer/book" className="fr-knap fr-knap-kant">
            Book en samtale om dit hår
          </Link>
        </div>
        <div data-vis className="fr-skyder-ramme">
          <Farveskyder foer={<Foto fil={farver.foer.fil} alt="Før: mørkt, ensfarvet hår" tone={1} />} efter={<Foto fil={farver.efter.fil} alt="Efter: lys balayage" tone={3} />} foerTekst={farver.foer.tekst} efterTekst={farver.efter.tekst} />
        </div>
      </section>

      {/* Galleri: to rækker, der glider hver sin vej og kan trækkes med finger eller mus (BaandTraek). Hver række står der fire gange, så båndet altid fylder skærmen. */}
      <section className="fr-sektion fr-galleri" aria-label="Billeder fra salonen">
        <div className="fr-indhold fr-sektion-top" data-vis>
          <div>
            <p className="fr-overlinje">Galleri</p>
            <h2>
              <Kursiv tekst="Hår, vi er _stolte_ af" />
            </h2>
          </div>
        </div>
        {raekker.map((r, n) => (
          <div key={n} className={`fr-baand ${n ? "fr-baand-modsat" : ""}`}>
            <ul>
              {[...r, ...r, ...r, ...r].map((fil, i) => (
                <li key={i} className="fr-billede fr-form-skraa" aria-hidden={i >= r.length}>
                  <Foto fil={fil} alt={i < r.length ? "Frisure lavet i salonen" : ""} sizes="(max-width: 760px) 200px, 320px" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Grafik: gavekort og egen plejeserie */}
      <section className="fr-sektion fr-indhold fr-delt fr-delt-omvendt">
        <div data-vis>
          <Gavekort />
        </div>
        <div data-vis>
          <p className="fr-overlinje">{grafik.overlinje}</p>
          <h2>
            <Kursiv tekst={grafik.titel} />
          </h2>
          <p className="fr-brod">{grafik.tekst}</p>
          <ul className="fr-flueben">
            {grafik.punkter.map((p) => (
              <li key={p}>
                <Ikon navn="flueben" size={17} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Om salonen */}
      <section className="fr-sektion fr-indhold fr-delt">
        <div className="fr-billede fr-form-boelge fr-om-foto" data-vis>
          <Foto fil="salon.jpg" alt="Salonen med sorte stole, spejle og varmt lys" tone={4} />
        </div>
        <div data-vis>
          <p className="fr-overlinje">{om.overlinje}</p>
          <h2>
            <Kursiv tekst={om.titel} />
          </h2>
          <p className="fr-brod">{om.tekst}</p>
          <ul className="fr-punkter">
            {om.punkter.map((p) => (
              <li key={p.tekst}>
                <Ikon navn={p.ikon} size={22} /> {p.tekst}
              </li>
            ))}
          </ul>
          <Link href="/frisoer/team" className="fr-knap fr-knap-kant">
            Mød teamet <Ikon navn="pil" size={16} />
          </Link>
        </div>
      </section>

      {/* Udtalelser: endeløst bånd i fuld bredde ligesom galleriet */}
      <section className="fr-sektion">
        <div className="fr-indhold fr-sektion-top" data-vis>
          <div>
            <p className="fr-overlinje">Kunderne siger</p>
            <h2>
              <Kursiv tekst="Derfor kommer de _igen_" />
            </h2>
          </div>
        </div>
        <div className="fr-baand fr-udtalelser-baand">
          <ul className="fr-udtalelser">
            {[...udtalelser, ...udtalelser].map((u, i) => (
              <li key={i} className="fr-glas" data-lys aria-hidden={i >= udtalelser.length}>
                <span className="fr-stjerner" aria-label="5 af 5 stjerner" role="img">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Ikon key={s} navn="stjerne" size={15} fyld />
                  ))}
                </span>
                <blockquote>{u.tekst}</blockquote>
                <p>
                  <strong>{u.navn}</strong> · {u.by}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gør båndene (galleri og udtalelser) til at trække i */}
      <BaandTraek />

      {/* Afslutning */}
      <section className="fr-indhold fr-sektion-bund">
        <div className="fr-cta fr-glas" data-vis>
          <span className="fr-cta-ikon">
            <Ikon navn="kalender" size={30} />
          </span>
          <div>
            <h2>
              <Kursiv tekst={afslutning.titel} />
            </h2>
            <p>{afslutning.tekst}</p>
          </div>
          <Link href="/frisoer/book" className="fr-knap">
            Book tid <Ikon navn="pil" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
