import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource/instrument-serif/400-italic.css";
import "./toemrer.css";
import Header from "@/components/toemrer/Header";
import Footer from "@/components/toemrer/Footer";
import DemoRing from "@/components/toemrer/DemoRing";
import Effekter from "@/components/toemrer/Effekter";
import { firma } from "@/lib/toemrer";

export const metadata: Metadata = {
  title: { default: `${firma.navn} | Tømrer i ${firma.by} (demo)`, template: `%s | ${firma.navn} (demo)` },
  description: `Demo: ${firma.navn} er et fiktivt tømrerfirma. Siden er lavet af Klippegrund Digital.`,
  robots: { index: false, follow: false },
};

export default function ToemrerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tm">
      {/* Sættes før første tegning, så indhold med [data-vis] ikke blinker. Uden JavaScript er alt synligt. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('tm-js')" }} />
      <div className="tm-demobjaelke">
        Demo: {firma.navn} er et fiktivt firma. Siden er lavet af{" "}
        <a href="https://klippegrund.dk" rel="noopener">
          Klippegrund Digital
        </a>
        .
      </div>
      <Header />
      {/* Firmanavnet stort øverst på alle sider (flyttet op fra sidefoden, Emil 25. nov.) */}
      <div className="tm-ordmaerke" aria-hidden="true">
        <span className="tm-ordmaerke-baand">{firma.kortNavn}</span>
        <span className="tm-ordmaerke-under">{firma.kortNavn}</span>
      </div>
      {children}
      <Footer />
      <DemoRing telefon={firma.telefon} className="tm-ringknap" tekst={`Ring ${firma.telefon}`} />
      <Effekter />
    </div>
  );
}
