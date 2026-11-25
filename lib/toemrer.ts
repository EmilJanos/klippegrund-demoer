// Al tekst og alle data til demo 1 (tømrer). Firmaet er fiktivt.
// Skift navn, by eller telefon her, så følger hele demoen med.
// Ord mellem _understregninger_ i overskrifter sættes i kursiv (se components/toemrer/Tekst.tsx).

export const firma = {
  navn: "Egebyg Tømrer & Snedker",
  kortNavn: "Egebyg",
  undertitel: "Tømrer & Snedker",
  by: "Silkeborg",
  omraade: "Silkeborg og omegn",
  telefon: "12 34 56 78", // fiktivt nummer, ring-knappen viser en demobesked
  mail: "kontakt@egebyg-demo.dk",
  adresse: "Værkstedsvej 1, 8600 Silkeborg",
  cvr: "00000000",
  aabent: [
    { dage: "Mandag til torsdag", tid: "7.00-16.00" },
    { dage: "Fredag", tid: "7.00-14.00" },
  ],
  startet: 2004,
};

export const menu = [
  { tekst: "Forside", href: "/toemrer" },
  { tekst: "Ydelser", href: "/toemrer/ydelser" },
  { tekst: "Projekter", href: "/toemrer/projekter" },
  { tekst: "Kontakt", href: "/toemrer/kontakt" },
];

export const hero = {
  overlinje: "Tømrer og snedker i Silkeborg",
  linjer: ["Solidt træarbejde,", "der _holder_ i mange år"],
  tekst: "Tag, vinduer, tilbygninger og alt det imellem. Du får en fast pris, før vi går i gang, og vi rydder op efter os.",
  knap: "Få et tilbud",
  link: "Se projekter",
  skilt: "Vi kører i Silkeborg og 30 minutter omkring",
};

export const styrker = [
  { ikon: "pris", titel: "Fast pris", tekst: "Du kender prisen, før vi starter. Ingen overraskelser på regningen." },
  { ikon: "svar", titel: "Svar inden for et døgn", tekst: "Ring eller skriv, så vender vi tilbage samme dag eller dagen efter." },
  { ikon: "oprydning", titel: "Vi rydder op", tekst: "Pladsen er fejet, og affaldet er kørt væk, når vi går hjem." },
  { ikon: "lokal", titel: "Lokalt firma", tekst: "Vi bor her selv og kører ikke længere end en halv time." },
];

export const ydelser = [
  {
    id: "tag",
    titel: "Tag og spær",
    tekst: "Nyt tag, efterisolering og udskiftning af rådne spær. Vi tager os også af tagrender og inddækninger.",
    billede: "ydelse-tag.jpg",
    punkter: [
      "Nyt tag i tegl, stål eller tagpap",
      "Efterisolering af loft og skråvægge",
      "Udskiftning af spær og lægter",
      "Tagrender, inddækninger og ovenlys",
    ],
    emne: "Tag og spær",
  },
  {
    id: "vinduer",
    titel: "Vinduer og døre",
    tekst: "Gamle vinduer og døre skiftes, så huset bliver tæt og varmt igen. Vi monterer og fuger færdigt.",
    billede: "ydelse-vinduer.jpg",
    punkter: [
      "Vinduer i træ, træ/alu og plast",
      "Yderdøre og terrassedøre",
      "Indvendige døre og karme",
      "Fuger og lister, så det slutter tæt",
    ],
    emne: "Vinduer og døre",
  },
  {
    id: "tilbygning",
    titel: "Tilbygning og ombygning",
    tekst: "Fra første skitse til sidste fodliste. Vi samarbejder med murer, elektriker og VVS, så du kun har én at ringe til.",
    billede: "ydelse-tilbygning.jpg",
    punkter: [
      "Tilbygninger og havestuer",
      "Ny rumfordeling og skillevægge",
      "Hjælp til tegninger og byggetilladelse",
      "Én kontaktperson gennem hele byggeriet",
    ],
    emne: "Tilbygning og ombygning",
  },
];

export const ogsaa = [
  "Terrasser og hegn",
  "Carporte og skure",
  "Trægulve",
  "Køkkener og indbyggede skabe",
  "Lofter og vægbeklædning",
  "Reparationer og småopgaver",
];

export const proces = [
  { titel: "Vi kommer forbi", tekst: "Vi ser på opgaven, måler op og hører, hvad du ønsker. Besøget er gratis." },
  { titel: "Du får en fast pris", tekst: "Inden for få dage har du et skriftligt tilbud med pris og tidsplan." },
  { titel: "Vi bygger", tekst: "Du har den samme tømrer på opgaven fra start til slut, og vi rydder op hver dag." },
  { titel: "Vi afleverer", tekst: "Vi går det hele igennem sammen. Først når du er tilfreds, er vi færdige." },
];

export const omFirmaet = {
  overlinje: "Om Egebyg",
  udsagn:
    "Egebyg er et familiefirma med fem tømrere og en lærling. Vi har bygget tage, tilbygninger og køkkener i Silkeborg siden 2004.",
  tekst: "Du har den samme kontaktperson fra første besøg til sidste skrue, og vi siger det ærligt, hvis noget ikke kan betale sig.",
  billede: "om-mester.jpg",
  tal: [
    { tal: new Date().getFullYear() - 2004, efter: "", tekst: "års erfaring" },
    { tal: 480, efter: "+", tekst: "afsluttede opgaver" },
    { tal: 6, efter: "", tekst: "mand på holdet" },
  ],
};

export const foerEfter = [
  { titel: "Terrasse", foer: "terrasse-foer.jpg", efter: "terrasse-efter.jpg", tekst: "Gammel terrasse skiftet til lærketræ med trappe ned til haven." },
  { titel: "Køkken", foer: "koekken-foer.jpg", efter: "koekken-efter.jpg", tekst: "Køkken fra firserne skiftet til fronter og bordplade i lys eg." },
];

export const projekter = [
  { titel: "Reol og bænk under skråvindue", type: "Snedkerarbejde", sted: "Silkeborg", aar: 2025, billede: "projekt-1.jpg" },
  { titel: "Nyt egetræsgulv i stue", type: "Gulv", sted: "Them", aar: 2025, billede: "projekt-2.jpg" },
  { titel: "Carport i sort træ", type: "Udendørs", sted: "Sejs", aar: 2024, billede: "projekt-3.jpg" },
  { titel: "Trappe med åbne trin i eg", type: "Snedkerarbejde", sted: "Virklund", aar: 2024, billede: "projekt-4.jpg" },
  { titel: "Nyt tag på parcelhus", type: "Tag", sted: "Kjellerup", aar: 2024, billede: "projekt-5.jpg" },
  { titel: "Havestue med glasparti", type: "Tilbygning", sted: "Silkeborg", aar: 2023, billede: "projekt-6.jpg" },
];

// Fiktive udtalelser. Mærkes tydeligt på siden.
export const anmeldelser = [
  { navn: "Hanne L.", by: "Silkeborg", tekst: "De holdt både tid og pris, og der var ryddet op hver dag. Vores nye tag ser rigtig godt ud." },
  { navn: "Jesper M.", by: "Them", tekst: "God dialog fra start. De sagde ærligt, hvad der kunne betale sig, og hvad vi kunne vente med." },
  { navn: "Sofie og Anders", by: "Kjellerup", tekst: "Tilbygningen blev præcis, som vi havde tegnet den på et stykke papir. Kan varmt anbefales." },
];

export const afslutning = {
  overlinje: "Kontakt",
  titel: "Skal vi kigge på _dit projekt?_",
  tekst: "Vi kommer gerne ud og ser på opgaven. Det er gratis og uforpligtende.",
};

export const sider = {
  ydelser: {
    overlinje: "Ydelser",
    titel: "Fra tagryg til _fodliste_",
    tekst: "Vi tager både de store opgaver og de små. Her er det, vi laver mest.",
  },
  projekter: {
    overlinje: "Projekter",
    titel: "Se, hvad vi har _bygget_",
    tekst: "Et udvalg af opgaver fra de seneste år. Træk i håndtaget, og se før og efter.",
  },
  kontakt: {
    overlinje: "Kontakt",
    titel: "Fortæl os om _opgaven_",
    tekst: "Skriv et par linjer, eller ring. Vi vender tilbage inden for et døgn.",
  },
};

export const kontaktEmner = [
  "Tag og spær",
  "Vinduer og døre",
  "Tilbygning og ombygning",
  "Terrasse eller carport",
  "Indvendigt træarbejde",
  "Andet",
];
