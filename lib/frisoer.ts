// Demo 2: frisør. Al tekst og data til siden. Firmaet er fiktivt.
// Ord mellem _understregninger_ sættes i guld kursiv.

export const firma = {
  navn: "Prisme Hair Studio",
  kortNavn: "Prisme",
  by: "Aarhus",
  adresse: "Klostergade 14, 8000 Aarhus C",
  telefon: "86 00 00 00",
  mail: "hej@prisme-demo.dk",
};

export const menu = [
  { href: "/frisoer", tekst: "Forside" },
  { href: "/frisoer/behandlinger", tekst: "Behandlinger & priser" },
  { href: "/frisoer/team", tekst: "Team" },
  { href: "/frisoer/kontakt", tekst: "Kontakt" },
];

export const hero = {
  overlinje: "Frisør i hjertet af Aarhus",
  linjer: ["Hår, der", "føles som", "_dig_"],
  tekst: "Klip, farve og pleje hos frisører, der tager sig tid til at lytte. Du går herfra med et hår, du selv kan sætte derhjemme.",
  anmeldelse: { tal: "4,9", antal: "1.200+ anmeldelser" },
};

export const tal = [
  { ikon: "krone", tal: 12, efter: "", tekst: "år i Klostergade" },
  { ikon: "kunder", tal: 18000, efter: "+", tekst: "klip og farver" },
  { ikon: "saks", tal: 5, efter: "", tekst: "frisører og 2 elever" },
  { ikon: "blad", tal: 100, efter: " %", tekst: "veganske produkter" },
] as const;

export const behandlinger = [
  { fil: "behandling-klip.jpg", ikon: "saks", navn: "Klip & styling", tekst: "Et klip, der passer til dit hår og din hverdag.", fra: "fra 495 kr." },
  { fil: "behandling-farve.jpg", ikon: "pensel", navn: "Farve & balayage", tekst: "Fra diskrete reflekser til en helt ny farve.", fra: "fra 895 kr." },
  { fil: "behandling-pleje.jpg", ikon: "draabe", navn: "Kur & pleje", tekst: "Fugt og styrke til hår, der trænger.", fra: "fra 295 kr." },
  { fil: "behandling-opsaetning.jpg", ikon: "stjerne", navn: "Opsætning", tekst: "Til bryllup, galla og de store dage.", fra: "fra 695 kr." },
  { fil: "behandling-herre.jpg", ikon: "skaeg", navn: "Herre & skæg", tekst: "Skarpe linjer og velplejet skæg.", fra: "fra 395 kr." },
] as const;

export const farver = {
  overlinje: "Farveskift",
  titel: "Træk og se _forskellen_",
  tekst: "Samme kunde, samme lys. Før og efter en balayage hos os.",
  foer: { fil: "farve-foer.jpg", tekst: "Før" },
  efter: { fil: "farve-efter.jpg", tekst: "Efter" },
};

export const grafik = {
  overlinje: "Mere end en salon",
  titel: "Giv en _oplevelse_ videre",
  tekst: "Gavekortet gælder til alle behandlinger og til vores egen plejeserie, Prisme Care. Købes i salonen.",
  punkter: ["Gavekort på valgfrit beløb", "Prisme Care: shampoo, balsam og olie", "Smukt pakket ind, klar til at give væk"],
};

export const galleri = Array.from({ length: 12 }, (_, i) => `galleri-${i + 1}.jpg`);

export const om = {
  overlinje: "Om salonen",
  titel: "Ro, tid og _hænder_, der kan deres fag",
  tekst: "Vi åbnede i Klostergade i 2014 med én stol og en idé om, at et frisørbesøg skal være dagens rolige time. I dag er vi syv, og idéen er den samme.",
  punkter: [
    { ikon: "samtale", tekst: "Vi starter altid med en snak" },
    { ikon: "blad", tekst: "Veganske produkter" },
    { ikon: "tid", tekst: "Tid nok til hver kunde" },
    { ikon: "hjerte", tekst: "Ikke tilfreds? Vi retter det gratis" },
  ],
} as const;

export const udtalelser = [
  { navn: "Camilla", by: "Aarhus C", tekst: "Første gang i mange år, at jeg har fået præcis den farve, jeg viste på billedet." },
  { navn: "Jonas", by: "Risskov", tekst: "Hurtig booking, god kaffe og et klip, der stadig sidder godt efter seks uger." },
  { navn: "Sara", by: "Viby J", tekst: "De sagde ærligt, hvad mit hår kunne holde til. Det endte meget bedre end min egen idé." },
  { navn: "Mette", by: "Højbjerg", tekst: "Brudeopsætningen sad hele natten, også efter dansegulvet. Prøven gjorde mig helt rolig." },
  { navn: "Ali", by: "Aarhus N", tekst: "Endelig en fade, der er ens i begge sider. Jeg har fast tid hver tredje uge nu." },
  { navn: "Louise", by: "Brabrand", tekst: "Min søn hader at blive klippet, men her sad han stille hele vejen. Det siger alt." },
  { navn: "Peter", by: "Lystrup", tekst: "Jeg kom ind med en hjemmeklipning, der var gået galt. Jeg gik derfra og lignede mig selv igen." },
];

export const afslutning = {
  titel: "Klar til et _nyt_ udtryk?",
  tekst: "Book din tid på et minut. Du vælger selv behandling, frisør og tidspunkt.",
};

export const aabningstider = [
  ["Mandag til torsdag", "9.00-18.00"],
  ["Fredag", "9.00-19.00"],
  ["Lørdag", "9.00-15.00"],
  ["Søndag", "Lukket"],
];

// ---------- Behandlinger & priser ----------

export const prisliste = [
  {
    id: "klip",
    navn: "Klip & styling",
    ikon: "saks",
    punkter: [
      { navn: "Dameklip med vask og føn", tid: 60, pris: 595 },
      { navn: "Herreklip", tid: 30, pris: 395 },
      { navn: "Børneklip (under 12 år)", tid: 30, pris: 295 },
      { navn: "Pandehår eller nakke", tid: 15, pris: 150 },
      { navn: "Vask og føn", tid: 30, pris: 350 },
    ],
  },
  {
    id: "farve",
    navn: "Farve & balayage",
    ikon: "pensel",
    punkter: [
      { navn: "Bundfarve", tid: 75, pris: 895 },
      { navn: "Helfarve", tid: 105, pris: 1195 },
      { navn: "Balayage", tid: 180, pris: 1995 },
      { navn: "Striber, hele håret", tid: 150, pris: 1595 },
      { navn: "Toning", tid: 30, pris: 395 },
    ],
  },
  {
    id: "pleje",
    navn: "Kur & pleje",
    ikon: "draabe",
    punkter: [
      { navn: "Fugtkur", tid: 20, pris: 295 },
      { navn: "Genopbyggende kur", tid: 30, pris: 395 },
      { navn: "Hovedbundsbehandling", tid: 30, pris: 445 },
    ],
  },
  {
    id: "opsaetning",
    navn: "Opsætning",
    ikon: "stjerne",
    punkter: [
      { navn: "Festopsætning", tid: 60, pris: 695 },
      { navn: "Brudeopsætning med prøve", tid: 150, pris: 1895 },
    ],
  },
  {
    id: "herre",
    navn: "Herre & skæg",
    ikon: "skaeg",
    punkter: [
      { navn: "Klip og skæg", tid: 45, pris: 545 },
      { navn: "Skægtrim", tid: 20, pris: 225 },
      { navn: "Fade", tid: 40, pris: 445 },
    ],
  },
  {
    // Kun eleverne laver disse, og eleverne laver kun disse (se Booking.tsx). "normal" er prisen hos en uddannet frisør.
    id: "elev",
    navn: "Elevbehandlinger",
    ikon: "hjerte",
    punkter: [
      { navn: "Dameklip hos elev", tid: 75, pris: 395, normal: 595 },
      { navn: "Herreklip hos elev", tid: 45, pris: 275, normal: 395 },
      { navn: "Bundfarve hos elev", tid: 90, pris: 595, normal: 895 },
      { navn: "Fugtkur hos elev", tid: 30, pris: 195, normal: 295 },
    ],
  },
] as const;

export const elevGruppe = "elev";
export const elevnote = "Vores to elever klipper og farver til elevpris. En uddannet frisør ser med hele vejen, så sæt lidt ekstra tid af.";

export const prisnote = "Priserne er vejledende. Langt eller meget tykt hår kan koste lidt mere. Det aftaler vi, før vi går i gang.";

// ---------- Team ----------

export const team: { id: string; fil: string; navn: string; rolle: string; tekst: string; fag: string[]; elev?: boolean }[] = [
  { id: "maja", fil: "team-1.jpg", navn: "Maja Lindgaard", rolle: "Indehaver og frisør", tekst: "Åbnede salonen i 2014 og har klippet i 18 år. Rolig hånd og et skarpt øje for, hvad der klæder et ansigt.", fag: ["Korte klip", "Bob", "Bryllup"] },
  { id: "jacob", fil: "team-2.jpg", navn: "Jacob Krogh", rolle: "Frisør og barber", tekst: "Uddannet barber fra København. Går op i rene linjer og et skæg, der passer til ansigtet.", fag: ["Fade", "Skæg", "Herreklip"] },
  { id: "freja", fil: "team-3.jpg", navn: "Freja Holm", rolle: "Farvespecialist", tekst: "Har taget farvekurser i London og laver salonens fleste balayager. Ærlig om, hvad dit hår kan holde til.", fag: ["Balayage", "Blonde nuancer", "Farveretning"] },
  { id: "ida", fil: "team-4.jpg", navn: "Ida Rask", rolle: "Frisør", tekst: "Specialist i krøller og bølger. Lærer dig at sætte håret selv, så det også sidder derhjemme.", fag: ["Krøller", "Tørklip", "Pleje"] },
  { id: "noah", fil: "team-5.jpg", navn: "Noah Bach", rolle: "Frisør og stylist", tekst: "Kommer fra modeshows og fotooptagelser. Ham du skal have, når håret skal sættes op til en stor dag.", fag: ["Opsætning", "Langt hår", "Styling"] },
  { id: "alma", fil: "team-6.jpg", elev: true, navn: "Alma Winther", rolle: "Elev på 2. år", tekst: "Går på frisørskolen i Aarhus og er i salonen tre dage om ugen. Grundig med saksen og god til at spørge, før hun klipper.", fag: ["Dameklip", "Føn", "Fugtkur"] },
  { id: "liam", fil: "team-7.jpg", elev: true, navn: "Liam Coren", rolle: "Elev på 3. år", tekst: "Kom til Aarhus fra Manchester og er næsten udlært. Farve er hans yndlingsfag, og herreklip sidder allerede på rygraden.", fag: ["Herreklip", "Bundfarve", "Dameklip"] },
];

export const teamTekst = {
  overlinje: "Team",
  titel: "Mød dem, der står bag _stolen_",
  tekst: "Fem frisører med hver deres speciale og to elever, der er godt på vej. Du vælger selv, hvem du vil klippes af, når du booker.",
  elever: { overlinje: "Elever", titel: "Næste _generation_", tekst: "Alma og Liam er under uddannelse hos os. Du kan booke udvalgte behandlinger hos dem til elevpris, og en uddannet frisør ser altid med." },
  ringe: { overlinje: "Håndværket", titel: "Vi bliver ved med at _øve_ os", tekst: "Hele teamet er på kursus fire gange om året, og hver mandag morgen øver vi nye teknikker på hinanden. Så ved vi, at det virker, før du sætter dig i stolen." },
};

// ---------- Book tid ----------

export const tider = ["9.00", "9.30", "10.30", "11.00", "12.30", "13.00", "14.30", "15.00", "16.30", "17.00"];
