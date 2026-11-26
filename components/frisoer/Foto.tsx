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

// Mindre udgaver (navn-480.webp, -800.webp, -1100.webp), så telefoner ikke henter de store filer.
export function fotoSrcSet(src: string): string | undefined {
  if (!src.endsWith(".webp")) return undefined;
  const fil = path.basename(src, ".webp");
  const dele = [480, 800, 1100].filter((b) => fs.existsSync(path.join(mappe, `${fil}-${b}.webp`))).map((b) => `/frisoer/billeder/${fil}-${b}.webp ${b}w`);
  return dele.length ? [...dele, `${src} 1400w`].join(", ") : undefined;
}

export default function Foto({ fil, alt, prioritet, tone, sizes }: { fil: string; alt: string; prioritet?: boolean; tone?: number; sizes?: string }) {
  const src = fotoSti(fil);
  if (!src) {
    const t = tone ?? ([...fil].reduce((s, c) => s + c.charCodeAt(0), 0) % 4) + 1;
    return (
      <span className={`fr-ph fr-ph-${t}`} role="img" aria-label={alt}>
        <span className="fr-ph-navn">{fil}</span>
      </span>
    );
  }
  const srcSet = fotoSrcSet(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? "(max-width: 760px) 92vw, 45vw") : undefined}
      alt={alt}
      loading={prioritet ? "eager" : "lazy"}
      fetchPriority={prioritet ? "high" : undefined}
      decoding="async"
    />
  );
}
