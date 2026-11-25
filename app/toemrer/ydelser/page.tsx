import type { Metadata } from "next";
import Link from "next/link";
import Foto from "@/components/toemrer/Foto";
import Sidehoved from "@/components/toemrer/Sidehoved";
import HusTegning from "@/components/toemrer/HusTegning";
import Afslutning from "@/components/toemrer/Afslutning";
import { ogsaa, proces, sider, ydelser } from "@/lib/toemrer";

export const metadata: Metadata = { title: "Ydelser" };

const d = (n: number) => ({ ["--d" as string]: n });

export default function Ydelser() {
  return (
    <main id="indhold" tabIndex={-1}>
      <Sidehoved {...sider.ydelser} />

      {/* De tre hovedydelser, skiftevis billede til venstre og højre */}
      <section className="tm-sektion tm-sektion-taet">
        <div className="tm-indhold tm-blokke">
          {ydelser.map((y, n) => (
            <article key={y.id} id={y.id} className={`tm-blok ${n % 2 ? "tm-blok-omvendt" : ""}`}>
              <div className="tm-billede tm-billede-4-3" data-vis>
                <Foto fil={y.billede} alt={y.titel} prioritet={n === 0} />
              </div>
              <div className="tm-blok-tekst" data-vis style={d(1)}>
                <span className="tm-nr">0{n + 1}</span>
                <h2 className="tm-h2 tm-h2-lille">{y.titel}</h2>
                <p>{y.tekst}</p>
                <ul className="tm-punkter">
                  {y.punkter.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link href={`/toemrer/kontakt?emne=${encodeURIComponent(y.emne)}`} className="tm-link">
                  Få et tilbud på {y.titel.toLowerCase()}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* De mindre opgaver */}
      <section className="tm-sektion tm-sektion-kant">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Mindre opgaver</p>
              <h2 className="tm-h2">
                Det tager vi <em>også</em>
              </h2>
            </div>
          </div>
          {/* Listen til venstre, værkstedet til højre (Emil 25. nov.) */}
          <div className="tm-ogsaa-gitter">
            <ul className="tm-ogsaa" data-vis>
              {ogsaa.map((o, n) => (
                <li key={o}>
                  {o}
                  <span>0{n + 1}</span>
                </li>
              ))}
            </ul>
            <div className="tm-billede tm-ogsaa-foto tm-form-hoevlspaan-liggende" data-vis>
              <Foto fil="vaerksted.jpg" alt="Værkstedet med maskiner og stablet træ" />
            </div>
          </div>
        </div>
      </section>

      {/* Sådan foregår det: huset tegner sig selv gennem de fire trin */}
      <section className="tm-proces">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Sådan foregår det</p>
              <h2 className="tm-h2">
                Fra første besøg til <em>færdigt arbejde</em>
              </h2>
            </div>
          </div>
          <div className="tm-proces-gitter" data-tegning>
            <div className="tm-proces-tegning">
              <HusTegning />
            </div>
            <ol className="tm-proces-trin">
              {proces.map((t, n) => (
                <li key={t.titel} data-trin>
                  <span className="tm-nr">0{n + 1}</span>
                  <h3 className="tm-h3">{t.titel}</h3>
                  <p>{t.tekst}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Afslutning />
    </main>
  );
}
