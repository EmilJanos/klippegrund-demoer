import type { Metadata } from "next";
import Link from "next/link";
import Sidehoved from "@/components/frisoer/Sidehoved";
import Afslutning from "@/components/frisoer/Afslutning";
import Foto from "@/components/frisoer/Foto";
import Ikon from "@/components/frisoer/Ikon";
import { Kursiv } from "@/components/frisoer/Tekst";
import { team, teamTekst } from "@/lib/frisoer";

export const metadata: Metadata = { title: "Team" };

export default function Team() {
  return (
    <main id="indhold">
      <Sidehoved overlinje={teamTekst.overlinje} titel={teamTekst.titel} tekst={teamTekst.tekst} />

      <ul className="fr-indhold fr-team">
        {team.map((t, i) => (
          <li key={t.id} data-vis style={{ ["--i" as string]: i }}>
            <Link href={`/frisoer/book?frisoer=${t.id}`} className="fr-teamkort fr-glas" data-lys>
              <span className="fr-billede">
                <Foto fil={t.fil} alt={`Portræt af ${t.navn}`} />
              </span>
              <span className="fr-teamkort-tekst">
                <strong>{t.navn}</strong>
                <span className="fr-teamkort-rolle">{t.rolle}</span>
                <span>{t.tekst}</span>
                <span className="fr-maerker">
                  {t.fag.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </span>
                <span className="fr-kort-fra">
                  Book hos {t.navn.split(" ")[0]} <Ikon navn="pil" size={15} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Billedformen Ringe: fotoet ligger i ringe, der breder sig ud fra midten */}
      <section className="fr-sektion fr-indhold fr-delt">
        <div className="fr-ringe-ramme" data-vis>
          <div className="fr-billede fr-form-ringe">
            <Foto fil="ringe.jpg" alt="En frisør føntørrer en kundes hår foran spejlet" tone={3} />
          </div>
        </div>
        <div data-vis>
          <p className="fr-overlinje">{teamTekst.ringe.overlinje}</p>
          <h2>
            <Kursiv tekst={teamTekst.ringe.titel} />
          </h2>
          <p className="fr-brod">{teamTekst.ringe.tekst}</p>
        </div>
      </section>

      <Afslutning />
    </main>
  );
}
