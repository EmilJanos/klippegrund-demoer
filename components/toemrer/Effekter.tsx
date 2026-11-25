"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Sidens små effekter samlet ét sted. Alt indhold er synligt uden JavaScript,
// og alt står stille, hvis brugeren har bedt om mindre bevægelse.
//  - [data-vis]      glider frem, når det kommer til syne
//  - [data-tael]     tal, der tæller op
//  - [data-ordlys]   sætning, hvor ordene lyser op, mens man scroller
//  - [data-tegning]  huset, der tegner sig selv gennem de fire trin (Ydelser)
//  - .tm-header      får en streg under sig, når siden er rullet

const klem = (v: number) => Math.min(1, Math.max(0, v));

export default function Effekter() {
  const sti = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("tm-js");
    const rolig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alle = <T extends Element>(v: string) => Array.from(document.querySelectorAll<T>(v));

    // Tæl op
    const tael = (el: HTMLElement) => {
      const maal = Number(el.dataset.tael);
      if (rolig || !Number.isFinite(maal)) return;
      const start = performance.now();
      const varighed = 1500;
      const trin = (nu: number) => {
        const t = klem((nu - start) / varighed);
        el.textContent = String(Math.round(maal * (1 - Math.pow(1 - t, 4))));
        if (t < 1) requestAnimationFrame(trin);
      };
      requestAnimationFrame(trin);
    };

    // Glid frem
    const vis = alle<HTMLElement>(".tm [data-vis]");
    let io: IntersectionObserver | null = null;
    if (rolig || !("IntersectionObserver" in window)) {
      vis.forEach((el) => el.classList.add("er-synlig"));
    } else {
      io = new IntersectionObserver(
        (poster) =>
          poster.forEach((p) => {
            if (!p.isIntersecting) return;
            p.target.classList.add("er-synlig");
            p.target.querySelectorAll<HTMLElement>("[data-tael]").forEach(tael);
            io?.unobserve(p.target);
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      vis.forEach((el) => io?.observe(el));
    }

    // Det, der følger scrollet
    const header = document.querySelector<HTMLElement>(".tm-header");
    const ordlys = alle<HTMLElement>(".tm [data-ordlys]").map((el) => ({ el, ord: Array.from(el.querySelectorAll<HTMLElement>(".tm-ord")) }));
    const tegninger = alle<HTMLElement>(".tm [data-tegning]").map((el) => ({
      el,
      streger: Array.from(el.querySelectorAll<SVGElement>("[data-fra]")),
      trin: Array.from(el.querySelectorAll<HTMLElement>("[data-trin]")),
    }));

    let ramme = 0;
    const maal = () => {
      ramme = 0;
      const vh = window.innerHeight;
      header?.classList.toggle("er-rullet", window.scrollY > 16);

      for (const { el, ord } of ordlys) {
        const r = el.getBoundingClientRect();
        const p = rolig ? 1 : klem((vh * 0.82 - r.top) / (r.height + vh * 0.34));
        const taendt = Math.round(p * ord.length);
        ord.forEach((o, i) => o.classList.toggle("er-lyst", i < taendt));
      }

      for (const { el, streger, trin } of tegninger) {
        const r = el.getBoundingClientRect();
        const p = rolig ? 1 : klem((vh * 0.7 - r.top) / Math.max(1, r.height - vh * 0.15));
        for (const s of streger) {
          const fra = Number(s.dataset.fra);
          const til = Number(s.dataset.til);
          const lokal = klem((p - fra) / (til - fra));
          if (s.dataset.toning !== undefined) s.style.opacity = String(lokal);
          else s.style.strokeDashoffset = String(1 - lokal);
        }
        trin.forEach((t, i) => t.classList.toggle("er-naaet", rolig || p >= i / trin.length - 0.001));
      }
    };
    const paaScroll = () => {
      if (!ramme) ramme = requestAnimationFrame(maal);
    };
    window.addEventListener("scroll", paaScroll, { passive: true });
    window.addEventListener("resize", paaScroll);
    maal();

    return () => {
      io?.disconnect();
      cancelAnimationFrame(ramme);
      window.removeEventListener("scroll", paaScroll);
      window.removeEventListener("resize", paaScroll);
    };
  }, [sti]);

  return null;
}
