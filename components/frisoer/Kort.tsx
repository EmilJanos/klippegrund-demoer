// Et tegnet kort over kvarteret i guld på sort. Det er pynt og ikke et rigtigt kort: adressen er fiktiv.
export default function Kort() {
  return (
    <svg className="fr-kortgrafik" viewBox="0 0 600 380" role="img" aria-label="Tegnet kort, der viser salonen i Klostergade midt i Aarhus">
      <rect width="600" height="380" fill="#0f0d0b" />
      {/* åen */}
      <path d="M-10 300C120 270 200 330 320 300S520 250 610 290" fill="none" stroke="rgba(209,173,114,0.22)" strokeWidth="26" strokeLinecap="round" />
      {/* gader */}
      <g fill="none" stroke="rgba(243,237,227,0.14)" strokeWidth="10" strokeLinecap="round">
        <path d="M40 -10 110 400M230 -10 250 400M420 -10 380 400M540 -10 560 400" />
        <path d="M-10 70 610 40M-10 180 610 150M-10 250 610 230" />
      </g>
      <g fill="none" stroke="rgba(243,237,227,0.07)" strokeWidth="5" strokeLinecap="round">
        <path d="M150 -10 170 400M320 -10 310 400M480 -10 470 400M-10 120 610 95M-10 340 610 350" />
      </g>
      {/* Klostergade fremhævet */}
      <path className="fr-kort-gade" d="M-10 180 610 150" fill="none" stroke="#d1ad72" strokeWidth="2.5" strokeDasharray="1" pathLength="1" />
      <text x="70" y="168" className="fr-kort-tekst" transform="rotate(-2.8 70 168)">
        KLOSTERGADE
      </text>
      {/* nålen */}
      <g className="fr-kort-naal" transform="translate(312 164)">
        <circle r="34" fill="rgba(209,173,114,0.12)" className="fr-kort-puls" />
        <circle r="14" fill="#0b0a09" stroke="#ecd7a8" strokeWidth="1.5" />
        <path d="M0 -6 6 5H-6Z" fill="none" stroke="#ecd7a8" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
