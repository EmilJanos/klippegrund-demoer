import fs from "node:fs";
import path from "node:path";

// Viser et foto fra public/frisoer/billeder. Mangler filen endnu (Emils Gemini-fotos),
// vises en mørk flade med filnavnet, så layoutet kan ses imens. En .webp med samme navn bruges før .jpg.
// Foto skal ligge i en .fr-billede, som bestemmer format og hjørner.

const mappe = path.join(process.cwd(), "public", "frisoer", "billeder");

export function fotoSti(fil: string): string | null {
  const webp = fil.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(path.join(mappe, webp))) return `/frisoer/billeder/${webp}`;
  if (fs.existsSync(path.join(mappe, fil))) return `/frisoer/billeder/${fil}`;
  return null;
}

export function medieSti(fil: string): string | null {
  return fs.existsSync(path.join(mappe, fil)) ? `/frisoer/billeder/${fil}` : null;
}

export default function Foto({ fil, alt, prioritet, tone }: { fil: string; alt: string; prioritet?: boolean; tone?: number }) {
  const src = fotoSti(fil);
  if (!src) {
    const t = tone ?? ([...fil].reduce((s, c) => s + c.charCodeAt(0), 0) % 4) + 1;
    return (
      <span className={`fr-ph fr-ph-${t}`} role="img" aria-label={alt}>
        <span className="fr-ph-navn">{fil}</span>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={prioritet ? "eager" : "lazy"} fetchPriority={prioritet ? "high" : undefined} decoding="async" />
  );
}
