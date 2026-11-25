import Link from "next/link";
import Logo from "./Logo";
import { firma, menu } from "@/lib/toemrer";

export default function Footer() {
  return (
    <footer className="tm-footer tm-moerk">
      <div className="tm-indhold">
        <div className="tm-footer-gitter">
          <div className="tm-footer-firma">
            <Logo />
            <p>
              Tømrer og snedker i {firma.omraade}. Tag, vinduer, tilbygninger og indvendigt træarbejde siden {firma.startet}.
            </p>
          </div>
          <div>
            <h3>Sider</h3>
            <ul>
              {menu.map((m) => (
                <li key={m.href}>
                  <Link href={m.href}>{m.tekst}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Kontakt</h3>
            <ul>
              <li>{firma.telefon}</li>
              <li>{firma.mail}</li>
              <li>{firma.adresse}</li>
            </ul>
          </div>
          <div>
            <h3>Åbningstider</h3>
            <ul>
              {firma.aabent.map((t) => (
                <li key={t.dage}>
                  {t.dage}
                  <br />
                  <span>{t.tid}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tm-footer-bund">
          <span>
            © {firma.navn} · CVR {firma.cvr}
          </span>
          <span>
            Demo: firmaet er fiktivt. Hjemmesiden er lavet af{" "}
            <a href="https://klippegrund.dk" rel="noopener">
              Klippegrund Digital
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
