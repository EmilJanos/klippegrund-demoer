import fs from "node:fs";
import path from "node:path";

// Viser et foto fra public/toemrer/billeder. Findes filen ikke endnu (Emils Gemini-fotos),
// vises en træflade fra public/toemrer/pladsholder med filnavnet i hjørnet, så layoutet kan ses imens.
// Ligger der en .webp med samme navn, bruges den i stedet for .jpg.
// Foto skal altid ligge i en .tm-billede, som bestemmer format og hjørner.

const mappe = path.join(process.cwd(), "public", "toemrer", "billeder");

export function fotoSti(fil: string): string | null {
  const webp = fil.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(path.join(mappe, webp))) return `/toemrer/billeder/${webp}`;
  if (fs.existsSync(path.join(mappe, fil))) return `/toemrer/billeder/${fil}`;
  return null;
}

// Andre filer i samme mappe, fx den valgfri video hero.mp4.
export function medieSti(fil: string): string | null {
  return fs.existsSync(path.join(mappe, fil)) ? `/toemrer/billeder/${fil}` : null;
}

const toner = ["eg-lys", "eg-varm", "valnoed", "lys"] as const;
export type Tone = (typeof toner)[number] | "graa";

export function pladsholder(fil: string, tone?: Tone): string {
  const t = tone ?? toner[[...fil].reduce((s, c) => s + c.charCodeAt(0), 0) % toner.length];
  return `/toemrer/pladsholder/${t}.jpg`;
}

type Props = {
  fil: string;
  alt: string;
  prioritet?: boolean;
  tone?: Tone;
};

export default function Foto({ fil, alt, prioritet, tone }: Props) {
  const src = fotoSti(fil);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src ?? pladsholder(fil, tone)}
        alt={alt}
        loading={prioritet ? "eager" : "lazy"}
        fetchPriority={prioritet ? "high" : undefined}
        decoding="async"
      />
      {!src && <span className="tm-ph-navn">{fil}</span>}
    </>
  );
}
