import type { ReactNode } from "react";
import { Kursiv } from "./Tekst";

// Toppen på undersiderne: overlinje, stor overskrift og en kort tekst.
// Valgfrit medie (foto eller video) til højre, som glider ud i den sorte baggrund.
export default function Sidehoved({ overlinje, titel, tekst, medie }: { overlinje: string; titel: string; tekst?: string; medie?: ReactNode }) {
  return (
    <section className={`fr-sidehoved fr-indhold ${medie ? "fr-sidehoved-medie" : ""}`}>
      <div>
        <p className="fr-overlinje">{overlinje}</p>
        <h1>
          <span className="fr-linje">
            <span>
              <Kursiv tekst={titel} />
            </span>
          </span>
        </h1>
        {tekst && <p className="fr-hero-brod">{tekst}</p>}
      </div>
      {medie && <div className="fr-sidehoved-flade">{medie}</div>}
    </section>
  );
}
