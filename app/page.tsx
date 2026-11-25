import Link from "next/link";

// Oversigt over demoerne. Kun til Emil og intern brug.
export default function Oversigt() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "64px auto", padding: "0 16px", lineHeight: 1.6 }}>
      <h1>Demoer fra Klippegrund Digital</h1>
      <p>Firmaerne er fiktive. Siderne viser, hvad en hjemmeside fra Klippegrund kan se ud som.</p>
      <ul>
        <li>
          <Link href="/toemrer">Demo 1: tømrer</Link>
        </li>
      </ul>
    </main>
  );
}
