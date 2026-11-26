import type { Metadata } from "next";
import Sidehoved from "@/components/frisoer/Sidehoved";
import Booking from "@/components/frisoer/Booking";
import Foto, { fotoSti } from "@/components/frisoer/Foto";
import { team } from "@/lib/frisoer";

export const metadata: Metadata = { title: "Book tid" };

export default function Book() {
  return (
    <main id="indhold">
      <Sidehoved overlinje="Book tid" titel="Din tid på et _minut_" tekst="Vælg behandling, frisør og tidspunkt. Du kan ændre eller aflyse gratis indtil 24 timer før." />
      <div className="fr-indhold fr-sektion-bund fr-book-ramme">
        {/* Findes portrættet endnu ikke, viser bookingen initialer i stedet */}
        <Booking portraetter={team.map((t) => (fotoSti(t.fil) ? <Foto key={t.id} fil={t.fil} alt="" sizes="64px" /> : null))} />
      </div>
    </main>
  );
}
