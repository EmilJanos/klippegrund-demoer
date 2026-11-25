import Link from "next/link";
import Logo from "./Logo";
import { aabningstider, firma, menu } from "@/lib/frisoer";

export default function Footer() {
  return (
    <footer className="fr-footer">
      <div className="fr-indhold fr-footer-gitter">
        <div>
          <Logo />
          <p className="fr-footer-tekst">Klip, farve og pleje i Klostergade siden 2014.</p>
        </div>
        <div>
          <h2>Find os</h2>
          <p>
            {firma.adresse}
            <br />
            {firma.telefon}
            <br />
            {firma.mail}
          </p>
        </div>
        <div>
          <h2>Åbningstider</h2>
          <dl>
            {aabningstider.map(([dag, tid]) => (
              <div key={dag}>
                <dt>{dag}</dt>
                <dd>{tid}</dd>
              </div>
            ))}
          </dl>
        </div>
        <nav aria-label="Sidefod">
          <h2>Sider</h2>
          {menu.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.tekst}
            </Link>
          ))}
          <Link href="/frisoer/book">Book tid</Link>
        </nav>
      </div>
      <div className="fr-indhold fr-footer-bund">
        <span>Demo: {firma.navn} er et fiktivt firma.</span>
        <span>
          Siden er lavet af{" "}
          <a href="https://klippegrund.dk" rel="noopener">
            Klippegrund Digital
          </a>
        </span>
      </div>
    </footer>
  );
}
