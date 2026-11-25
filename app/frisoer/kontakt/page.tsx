import type { Metadata } from "next";
import Sidehoved from "@/components/frisoer/Sidehoved";
import KontaktFormular from "@/components/frisoer/KontaktFormular";
import Kort from "@/components/frisoer/Kort";
import { aabningstider, firma } from "@/lib/frisoer";

export const metadata: Metadata = { title: "Kontakt" };

export default function Kontakt() {
  return (
    <main id="indhold">
      <Sidehoved overlinje="Kontakt" titel="Kig _forbi_ i Klostergade" tekst="Ring, skriv eller kom ind fra gaden. Vi har som regel en ledig stol til en hurtig snak om dit hår." />
      <div className="fr-indhold fr-sektion-bund fr-kontakt">
        <div className="fr-kontakt-info">
          <div className="fr-billede fr-kontakt-kort" data-vis>
            <Kort />
          </div>
          <div className="fr-kontakt-bokse">
            <div className="fr-glas" data-vis>
              <h2>Find os</h2>
              <p>
                {firma.adresse}
                <br />
                {firma.telefon}
                <br />
                {firma.mail}
              </p>
            </div>
            <div className="fr-glas" data-vis>
              <h2>Åbningstider</h2>
              <dl>
                {aabningstider.map(([dag, tid]) => (
                  <div key={dag}>
                    <dt>{dag}</dt>
                    <dd>{tid}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div data-vis>
          <KontaktFormular />
        </div>
      </div>
    </main>
  );
}
