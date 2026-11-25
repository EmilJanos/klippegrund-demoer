import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./frisoer.css";
import Header from "@/components/frisoer/Header";
import Footer from "@/components/frisoer/Footer";
import Effekter from "@/components/frisoer/Effekter";
import { firma } from "@/lib/frisoer";

export const metadata: Metadata = {
  title: { default: `${firma.navn} | Frisør i ${firma.by} (demo)`, template: `%s | ${firma.navn} (demo)` },
  description: `Demo: ${firma.navn} er en fiktiv frisørsalon. Siden er lavet af Klippegrund Digital.`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0b0a09" };

export default function FrisoerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fr">
      {/* Sættes før første tegning, så indhold med [data-vis] ikke blinker. Uden JavaScript er alt synligt. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('fr-js')" }} />
      <a href="#indhold" className="fr-spring">
        Spring til indhold
      </a>
      <div className="fr-demobjaelke">
        Demo: {firma.navn} er et fiktivt firma. Siden er lavet af{" "}
        <a href="https://klippegrund.dk" rel="noopener">
          Klippegrund Digital
        </a>
        .
      </div>
      <Header />
      {children}
      <Footer />
      {/* Fast bookingknap i bunden på mobil */}
      <Link href="/frisoer/book" className="fr-knap fr-bundknap">
        Book tid
      </Link>
      <Effekter />
      {/* Billedformen Bølge: underkanten løber som en blød bølge (fra design-skabelonerne) */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="fr-boelge" clipPathUnits="objectBoundingBox">
            <path d="M0 0H1V0.93C0.9 0.99 0.8 1 0.68 0.95C0.56 0.9 0.46 0.9 0.34 0.95C0.22 1 0.1 0.99 0 0.93Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
