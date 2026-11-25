import { foerEfter } from "@/lib/toemrer";
import { fotoSti, pladsholder } from "./Foto";
import type { Par } from "./FoerEfter";

// Finder billederne til før/efter-skyderen. Mangler et foto, bruges en træflade, og filnavnet vises i mærket.
export function foerEfterPar(): Par[] {
  return foerEfter.map((p) => {
    const foer = fotoSti(p.foer);
    const efter = fotoSti(p.efter);
    return {
      titel: p.titel,
      tekst: p.tekst,
      foer: foer ?? pladsholder(p.foer, "graa"),
      efter: efter ?? pladsholder(p.efter, "eg-lys"),
      foerNavn: foer ? undefined : p.foer,
      efterNavn: efter ? undefined : p.efter,
    };
  });
}
