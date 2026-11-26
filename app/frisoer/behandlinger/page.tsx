import type { Metadata } from "next";
import Link from "next/link";
import Sidehoved from "@/components/frisoer/Sidehoved";
import Afslutning from "@/components/frisoer/Afslutning";
import Foto, { fotoSrcSet, fotoSti, medieSti } from "@/components/frisoer/Foto";
import HeroVideo from "@/components/frisoer/HeroVideo";
import Ikon from "@/components/frisoer/Ikon";
import { behandlinger, elevGruppe, elevnote, farvenote, prisliste, prisnote } from "@/lib/frisoer";

export const metadata: Metadata = { title: "Behandlinger & priser" };

export default function Behandlinger() {
  const flaske = medieSti("produkt-olie.mp4");
  const olieFoto = fotoSti("produkt-olie.jpg");
  return (
    <main id="indhold">
      <Sidehoved
        medieVenstre
        overlinje="Behandlinger & priser"
        titel="Erfaring, du kan _mærke_"
        tekst="Er du i tvivl om, hvad du skal vælge, så book en gratis samtale om dit hår."
        medie={
          flaske ? (
            <div className="fr-flaske">
              <HeroVideo src={flaske} plakat={olieFoto ?? undefined} plakatSrcSet={olieFoto ? fotoSrcSet(olieFoto) : undefined} plakatSizes="(max-width: 760px) 70vw, 340px" prioritet />
            </div>
          ) : (
            <Foto fil="produkt-olie.jpg" alt="Hårolie fra plejeserien Prisme Care" prioritet />
          )
        }
      />

      <nav className="fr-indhold fr-hop" aria-label="Spring til behandling">
        {prisliste.map((g) => (
          <a key={g.id} href={`#${g.id}`}>
            <Ikon navn={g.ikon} size={16} /> {g.navn}
          </a>
        ))}
      </nav>

      <div className="fr-indhold fr-prisliste">
        {prisliste.map((g, n) => (
          <section key={g.id} id={g.id} className={`fr-prisgruppe ${behandlinger[n] ? "" : "fr-prisgruppe-bred"}`} data-vis>
            {/* Elevbehandlingerne har ikke deres eget foto og fylder hele bredden */}
            {behandlinger[n] && (
              <div className={`fr-billede fr-form-blad fr-pris-foto-${g.id}`}>
                <Foto fil={behandlinger[n].fil} alt="" sizes="(max-width: 760px) 92vw, 30vw" />
              </div>
            )}
            <div className="fr-glas fr-prisgruppe-kort" data-lys>
              <h2>{g.navn}</h2>
              {g.id === elevGruppe && <p className="fr-elevnote">{elevnote}</p>}
              {g.id === "farve" && <p className="fr-elevnote">{farvenote}</p>}
              <ul>
                {g.punkter.map((p) => (
                  <li key={p.navn}>
                    <span className="fr-pris-navn">{p.navn}</span>
                    <span className="fr-pris-tid">{p.tid} min.</span>
                    <span className="fr-pris-prik" aria-hidden="true" />
                    <span className="fr-pris-kr">
                      {"normal" in p && (
                        <s className="fr-pris-normal">
                          <span className="fr-skjult">Normalpris </span>
                          {p.normal.toLocaleString("da-DK")} kr.
                        </s>
                      )}
                      {p.pris === 0 ? "Gratis" : `${p.pris.toLocaleString("da-DK")} kr.`}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href={`/frisoer/book?behandling=${g.id}`} className="fr-knap fr-knap-kant fr-knap-lille">
                Book {g.navn.toLowerCase()} <Ikon navn="pil" size={15} />
              </Link>
            </div>
          </section>
        ))}
        <p className="fr-prisnote">{prisnote}</p>
      </div>

      <Afslutning />
    </main>
  );
}
