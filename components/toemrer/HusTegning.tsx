// Stregtegning af et hus, der tegner sig selv, mens man scroller gennem de fire trin (se Effekter.tsx).
// data-fra og data-til er, hvor langt i forløbet (0-1) stregen begynder og er færdig.
// Uden JavaScript står hele tegningen færdig.

type Streg = { d: string; fra: number; til: number; eg?: boolean };

const streger: Streg[] = [
  // Trin 1: grunden måles op
  { d: "M24 300H496", fra: 0, til: 0.12 },
  { d: "M110 332H390", fra: 0.08, til: 0.2, eg: true },
  { d: "M110 325V339", fra: 0.17, til: 0.21, eg: true },
  { d: "M390 325V339", fra: 0.19, til: 0.23, eg: true },
  // Trin 2: vægge og dør tegnes
  { d: "M110 300V190H390V300", fra: 0.25, til: 0.42 },
  { d: "M232 300V222H272V300", fra: 0.4, til: 0.5 },
  // Trin 3: tag, skorsten og tilbygning
  { d: "M92 196 250 92 408 196", fra: 0.5, til: 0.64 },
  { d: "M306 129V100H328V143", fra: 0.61, til: 0.68 },
  { d: "M390 234H478M472 234V300", fra: 0.64, til: 0.74, eg: true },
  { d: "M406 252H456V300M406 252V300M431 252V300", fra: 0.7, til: 0.77, eg: true },
  // Trin 4: vinduer og det sidste
  { d: "M140 216H202V266H140Z", fra: 0.76, til: 0.85 },
  { d: "M300 216H362V266H300Z", fra: 0.79, til: 0.88 },
  { d: "M171 216V266M140 241H202M331 216V266M300 241H362", fra: 0.85, til: 0.92 },
  { d: "M265 150A15 15 0 1 1 235 150A15 15 0 1 1 265 150M250 135V165M235 150H265", fra: 0.86, til: 0.94 },
  { d: "M62 300V258M84 236A22 22 0 1 1 40 236A22 22 0 1 1 84 236", fra: 0.9, til: 1 },
];

export default function HusTegning() {
  return (
    <svg viewBox="0 0 520 372" className="tm-hus" role="img" aria-label="Stregtegning af et hus med tilbygning">
      {streger.map((s) => (
        <path key={s.d} d={s.d} pathLength={1} className={s.eg ? "tm-streg tm-streg-eg" : "tm-streg"} data-fra={s.fra} data-til={s.til} />
      ))}
      <text x="250" y="356" textAnchor="middle" className="tm-hus-maal" data-fra={0.18} data-til={0.25} data-toning>
        8,40 m
      </text>
      <circle cx="264" cy="264" r="2.2" className="tm-hus-prik" data-fra={0.46} data-til={0.5} data-toning />
    </svg>
  );
}
