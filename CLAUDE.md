# CLAUDE.md: Klippegrunds demosider

Demosider for Klippegrund Digital. Firmaerne er fiktive. Samme regler som i `klippegrund-web/CLAUDE.md` (dansk, kort, commit kun med Emils ja, rør aldrig `.env.local`).

- Next.js 16 (App Router), React 19, TypeScript, ingen Tailwind.
- Én mappe pr. demo under `app/` med eget layout og egen CSS, scoped under en rodklasse (tømrer: `.tm`).
- Alt er skjult for søgemaskiner (`app/robots.ts`, `X-Robots-Tag` i `next.config.ts`, `robots` i metadata). Det må ikke fjernes.
- Hver demo er tydeligt mærket som demo. Formularer sender intet, telefonknapper viser en demobesked. Ingen cookies eller sporing.
- Start: `npm run dev`. Tjek: `npx tsc --noEmit` og `npx eslint app components lib`.

## Demo 1: tømrer (`/toemrer`)
- Sider: forside, `ydelser`, `projekter`, `kontakt`.
- Emil 23. nov.: demoen er ikke bundet til en pakke. Den er hans CV og skal vise, hvad han kan (gerne som en Pakke 2 eller en skræddersyet side). Hero-videoen er derfor med.
- Tekst og data: `lib/toemrer.ts`. Komponenter: `components/toemrer/`. CSS: `app/toemrer/toemrer.css`.
- Design (23. nov., efter ui-ux-pro-max): varm creme (#F4ECDF), mørkebrun tekst (#2A1A12), palisander (#30190F) på de mørke flader og eg (#A0591C) som accent (Emil 24. nov.: træfarverne fra referencen skal med). Inter Tight til overskrifter med ét ord i kursiv (Instrument Serif, skrives `_ord_` i `lib/toemrer.ts`), Inter til brødtekst. Tynde streger, meget luft, målestregen foran overlinjerne går igen. Mørke flader bruger `.tm-moerk`, som bytter farvevariablerne om.
- Animationer (`Effekter.tsx`, alle står stille ved "mindre bevægelse", og alt indhold er synligt uden JavaScript):
  1. Hero: overskriften kører op linje for linje, fotoet åbner sig (ren CSS).
  2. Om-afsnittet: ordene lyser op, mens man scroller (`data-ordlys`), og tallene tæller op (`data-tael`).
  3. Før/efter: håndtaget glider én gang frem og tilbage (`FoerEfter.tsx`).
  4. Ydelser: huset tegner sig selv gennem de fire trin (`HusTegning.tsx`, `data-tegning`).
- Fotos i `public/toemrer/billeder/` med filnavnene fra billedplanen. Mangler en fil, vises en træflade fra `public/toemrer/pladsholder/` med filnavnet i hjørnet (`Foto.tsx`). En `.webp` med samme navn bruges før `.jpg`.
- Valgfri hero-video: læg `hero.mp4` i `public/toemrer/billeder/`, så spiller den i heroen med `hero.jpg` som startbillede (`HeroVideo.tsx`).
- Version 1 (kopi af reference nr. 4) ligger som `v1-forside-kode.tar.gz` i projektfilerne under `demo-toemrer/`.
