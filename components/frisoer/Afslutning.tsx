import Link from "next/link";
import Ikon from "./Ikon";
import { Kursiv } from "./Tekst";
import { afslutning } from "@/lib/frisoer";

// Guldkantet bånd nederst på siderne med knap til booking.
export default function Afslutning() {
  return (
    <section className="fr-indhold fr-sektion-bund">
      <div className="fr-cta fr-glas" data-vis>
        <span className="fr-cta-ikon">
          <Ikon navn="kalender" size={30} />
        </span>
        <div>
          <h2>
            <Kursiv tekst={afslutning.titel} />
          </h2>
          <p>{afslutning.tekst}</p>
        </div>
        <Link href="/frisoer/book" className="fr-knap">
          Book tid <Ikon navn="pil" size={17} />
        </Link>
      </div>
    </section>
  );
}
