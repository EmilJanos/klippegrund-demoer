import Link from "next/link";
import Ikon from "./Ikon";
import DemoRing from "./DemoRing";
import { Kursiv } from "./Tekst";
import { afslutning, firma } from "@/lib/toemrer";

// Mørkt afslutningsbånd, der går i ét med sidefoden.
export default function Afslutning() {
  return (
    <section className="tm-afslutning tm-moerk">
      <div className="tm-indhold">
        <p className="tm-overlinje" data-vis>
          {afslutning.overlinje}
        </p>
        <h2 className="tm-display" data-vis>
          <Kursiv tekst={afslutning.titel} />
        </h2>
        <div className="tm-afslutning-bund" data-vis>
          <p>{afslutning.tekst}</p>
          <div className="tm-knapper">
            <Link href="/toemrer/kontakt" className="tm-knap tm-knap-lys">
              Få et tilbud
              <span className="tm-knap-pil">
                <Ikon navn="pil" size={18} />
              </span>
            </Link>
            <DemoRing telefon={firma.telefon} className="tm-knap tm-knap-kant" />
          </div>
        </div>
      </div>
    </section>
  );
}
