// Små teksthjælpere.

// Ord mellem _understregninger_ sættes i kursiv (serif), fx "der _holder_ i mange år".
export function Kursiv({ tekst }: { tekst: string }) {
  const dele = tekst.split(/_(.+?)_/g);
  return <>{dele.map((d, i) => (i % 2 ? <em key={i}>{d}</em> : d))}</>;
}

// Deler en sætning i ord, så de kan lyse op ét ad gangen, når man scroller (se Effekter.tsx).
export function Ordlys({ tekst, className }: { tekst: string; className?: string }) {
  const ord = tekst.split(" ");
  return (
    <p className={className} data-ordlys>
      {ord.map((o, i) => (
        <span key={i} className="tm-ord">
          {o}
          {i < ord.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
