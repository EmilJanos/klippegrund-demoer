import type { Metadata } from "next";
import DemoRing from "@/components/toemrer/DemoRing";
import KontaktFormular from "@/components/toemrer/KontaktFormular";
import { Kursiv } from "@/components/toemrer/Tekst";
import { firma, kontaktEmner, sider } from "@/lib/toemrer";
import Foto from "@/components/toemrer/Foto";

export const metadata: Metadata = { title: "Kontakt" };

const i = (n: number) => ({ ["--i" as string]: n });

// ?emne=... vælger emnet på forhånd, fx fra knapperne på Ydelser.
export default async function Kontakt({ searchParams }: { searchParams: Promise<{ emne?: string }> }) {
  const { emne } = await searchParams;
  const s = sider.kontakt;

  return (
    <main>
      <section className="tm-kontakt">
        <div className="tm-indhold tm-kontakt-gitter">
          <div className="tm-kontakt-info">
            <p className="tm-overlinje tm-ind" style={i(0)}>
              {s.overlinje}
            </p>
            <h1 className="tm-display tm-display-lille">
              <span className="tm-linje">
                <span style={i(1)}>
                  <Kursiv tekst={s.titel} />
                </span>
              </span>
            </h1>
            <p className="tm-kontakt-brod tm-ind" style={i(2)}>
              {s.tekst}
            </p>
            <dl className="tm-kontaktliste tm-ind" style={i(3)}>
              <div>
                <dt>Telefon</dt>
                <dd>
                  <DemoRing telefon={firma.telefon} className="tm-header-tlf" />
                </dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>{firma.mail}</dd>
              </div>
              <div>
                <dt>Adresse</dt>
                <dd>{firma.adresse}</dd>
              </div>
              <div>
                <dt>Åbningstider</dt>
                <dd>
                  {firma.aabent.map((t) => (
                    <span key={t.dage}>
                      {t.dage}: {t.tid}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="tm-kontakt-form tm-ind" style={i(3)}>
            <KontaktFormular emner={kontaktEmner} forvalgt={emne} />
          </div>
        </div>
        {/* Bredt værkstedsfoto under formularen (Emil 25. nov.) */}
        <div className="tm-indhold">
          <div className="tm-billede tm-kontakt-foto tm-form-skraasnit" data-vis>
            <Foto fil="kontakt.jpg" alt="Tømrer stemmer en tap ud i en egebjælke" />
          </div>
        </div>
      </section>
    </main>
  );
}
