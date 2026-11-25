import type { Metadata } from "next";
import Foto from "@/components/toemrer/Foto";
import Sidehoved from "@/components/toemrer/Sidehoved";
import FoerEfter from "@/components/toemrer/FoerEfter";
import Afslutning from "@/components/toemrer/Afslutning";
import { foerEfterPar } from "@/components/toemrer/foerEfterPar";
import { projekter, sider } from "@/lib/toemrer";

export const metadata: Metadata = { title: "Projekter" };

export default function Projekter() {
  return (
    <main id="indhold" tabIndex={-1}>
      <Sidehoved {...sider.projekter} />

      <section className="tm-sektion tm-sektion-taet">
        <div className="tm-indhold" data-vis>
          <FoerEfter par={foerEfterPar()} />
        </div>
      </section>

      <section className="tm-sektion tm-sektion-kant">
        <div className="tm-indhold">
          <div className="tm-sektionshoved" data-vis>
            <div>
              <p className="tm-overlinje">Udvalgte projekter</p>
              <h2 className="tm-h2">
                Færdigt <em>arbejde</em>
              </h2>
            </div>
          </div>
          <div className="tm-galleri">
            {projekter.map((p, n) => (
              <figure key={p.titel} className="tm-projekt" data-vis style={{ ["--d" as string]: n % 2 }}>
                <div className={`tm-billede tm-billede-4-3${p.form ? ` tm-form-${p.form}` : ""}`}>
                  <Foto fil={p.billede} alt={p.titel} />
                </div>
                <figcaption>
                  <span>{p.titel}</span>
                  <span>
                    {p.type} · {p.sted}, {p.aar}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Afslutning />
    </main>
  );
}
