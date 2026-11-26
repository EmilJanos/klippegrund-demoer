import type { Metadata } from "next";
import Link from "next/link";
import Sidehoved from "@/components/frisoer/Sidehoved";
import Afslutning from "@/components/frisoer/Afslutning";
import Foto, { fotoSrcSet, fotoSti, medieSti } from "@/components/frisoer/Foto";
import HeroVideo from "@/components/frisoer/HeroVideo";
import Ikon from "@/components/frisoer/Ikon";
import { behandlinger, prisliste, prisnote } from "@/lib/frisoer";

export const metadata: Metadata = { title: "Behandlinger & priser" };

export default function Behandlinger() {
  const flaske = medieSti("produkt-olie.mp4");
  const olieFoto = fotoSti("produkt-olie.jpg");
  return (
    <main id="indhold">
      <Sidehoved
        medieVenstre
        overlinje="Behandlinger & priser"
        titel="Faste priser, _ingen_ overraskelser"
        tekst="Alle priser er med vask, føn og en kop kaffe. Er du i tvivl om, hvad du skal vælge, så book en gratis samtale på 15 minutter."
        medie={flaske ? <HeroVideo src={flaske} plakat={olieFoto ?? undefined} plakatSrcSet={olieFoto ? fotoSrcSet(olieFoto) : undefined} plakatSizes="(max-width: 760px) 70vw, 340px" prioritet /> : <Foto fil="produkt-olie.jpg" alt="Hårolie fra plejeserien Prisme Care" prioritet />}
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
          <section key={g.id} id={g.id} className="fr-prisgruppe" data-vis>
            <div className={`fr-billede fr-form-blad fr-pris-foto-${g.id}`}>
              <Foto fil={behandlinger[n].fil} alt="" sizes="(max-width: 760px) 92vw, 30vw" />
            </div>
            <div className="fr-glas fr-prisgruppe-kort" data-lys>
              <h2>{g.navn}</h2>
              <ul>
                {g.punkter.map((p) => (
                  <li key={p.navn}>
                    <span className="fr-pris-navn">{p.navn}</span>
                    <span className="fr-pris-tid">{p.tid} min.</span>
                    <span className="fr-pris-prik" aria-hidden="true" />
                    <span className="fr-pris-kr">{p.pris.toLocaleString("da-DK")} kr.</span>
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
