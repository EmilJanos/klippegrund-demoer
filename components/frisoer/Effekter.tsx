"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Sidens små effekter samlet ét sted. Alt indhold er synligt uden JavaScript,
// og alt står stille, hvis brugeren har bedt om mindre bevægelse.
//  - [data-vis]   glider frem, når det kommer til syne
//  - [data-tael]  tal, der tæller op
//  - [data-lys]   glaskort, der lyser op, hvor musen er
//  - [data-vip]   gavekortet, der vipper efter musen
//  - .fr-header   bliver til glas, når siden er rullet

export default function Effekter() {
  const sti = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("fr-js");
    const rolig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alle = <T extends Element>(v: string) => Array.from(document.querySelectorAll<T>(v));
    const ryd: Array<() => void> = [];

    const tael = (el: HTMLElement) => {
      const maal = Number(el.dataset.tael);
      if (rolig || !Number.isFinite(maal)) return;
      const start = performance.now();
      const trin = (nu: number) => {
        const t = Math.min(1, (nu - start) / 1600);
        el.textContent = Math.round(maal * (1 - Math.pow(1 - t, 4))).toLocaleString("da-DK");
        if (t < 1) requestAnimationFrame(trin);
      };
      requestAnimationFrame(trin);
    };

    const vis = alle<HTMLElement>(".fr [data-vis]");
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

    const header = document.querySelector<HTMLElement>(".fr-header");
    const rul = () => header?.classList.toggle("er-rullet", window.scrollY > 16);
    window.addEventListener("scroll", rul, { passive: true });
    rul();
    ryd.push(() => window.removeEventListener("scroll", rul));

    // Lys og vip følger kun en rigtig mus, ikke fingre
    if (!rolig && window.matchMedia("(hover: hover)").matches) {
      for (const el of alle<HTMLElement>(".fr [data-lys]")) {
        const flyt = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        el.addEventListener("pointermove", flyt);
        ryd.push(() => el.removeEventListener("pointermove", flyt));
      }
      for (const el of alle<HTMLElement>(".fr [data-vip]")) {
        const flyt = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
          el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        };
        const slip = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", flyt);
        el.addEventListener("pointerleave", slip);
        ryd.push(() => {
          el.removeEventListener("pointermove", flyt);
          el.removeEventListener("pointerleave", slip);
        });
      }
    }

    return () => {
      io?.disconnect();
      ryd.forEach((f) => f());
    };
  }, [sti]);

  return null;
}
