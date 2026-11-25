import { firma } from "@/lib/toemrer";

// Logo til det fiktive firma: et tag over to planker. Følger tekstfarven, den nederste planke er eg.
export default function Logo() {
  return (
    <span className="tm-logo">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M4 14.5 15 5l11 9.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="18" width="14" height="2.6" rx="0.6" fill="currentColor" />
        <rect x="8" y="23" width="14" height="2.6" rx="0.6" className="tm-logo-eg" />
      </svg>
      <span className="tm-logo-navn">{firma.kortNavn}</span>
      <span className="tm-logo-under">{firma.undertitel}</span>
    </span>
  );
}
