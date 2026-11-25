import { Kursiv } from "./Tekst";

// Toppen på undersiderne: lille overlinje, stor overskrift og en kort tekst til højre.
export default function Sidehoved({ overlinje, titel, tekst }: { overlinje: string; titel: string; tekst: string }) {
  return (
    <section className="tm-sidehoved">
      <div className="tm-indhold">
        <p className="tm-overlinje tm-ind" style={{ ["--i" as string]: 0 }}>
          {overlinje}
        </p>
        <div className="tm-sidehoved-raekke">
          <h1 className="tm-display">
            <span className="tm-linje">
              <span style={{ ["--i" as string]: 1 }}>
                <Kursiv tekst={titel} />
              </span>
            </span>
          </h1>
          <p className="tm-ind" style={{ ["--i" as string]: 3 }}>
            {tekst}
          </p>
        </div>
      </div>
    </section>
  );
}
