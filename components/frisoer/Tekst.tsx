// Ord mellem _understregninger_ sættes i guld kursiv, fx "Dit _udtryk_."
export function Kursiv({ tekst }: { tekst: string }) {
  const dele = tekst.split(/_(.+?)_/g);
  return <>{dele.map((d, i) => (i % 2 ? <em key={i}>{d}</em> : d))}</>;
}
