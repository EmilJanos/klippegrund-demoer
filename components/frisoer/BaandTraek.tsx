"use client";

import { useEffect } from "react";

// Båndene (galleri og udtalelser) kan trækkes og skydes afsted med finger eller mus.
// Uden JavaScript kører båndet på CSS-animationen. Her overtager vi bevægelsen, så alt hænger sammen:
//  - båndet har sin egen rolige fart (den samme som CSS-animationen) og sin egen retning
//  - mens man trækker, følger det fingeren
//  - når man slipper, fortsætter det med fingerens fart og bremser blødt ned til sin egen rytme igen
// Udtalelserne holder stadig pause, når musen er over dem, så man kan læse et kort.
// Har brugeren bedt om mindre bevægelse, står båndet stille, men kan stadig trækkes.
export default function BaandTraek() {
  useEffect(() => {
    const rolig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ryd: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".fr .fr-baand").forEach((baand) => {
      const ul = baand.querySelector<HTMLElement>("ul");
      if (!ul) return;

      // Egen fart i px pr. ms, læst fra CSS-animationen, før vi slår den fra
      const varighed = parseFloat(getComputedStyle(ul).animationDuration) * 1000 || 60000;
      const retning = baand.classList.contains("fr-baand-modsat") ? 1 : -1;
      // Galleriets rækker står der fire gange, udtalelserne to gange
      const laeseBaand = baand.classList.contains("fr-udtalelser-baand");
      const kopier = laeseBaand ? 2 : 4;
      let periode = ul.scrollWidth / kopier;
      let musOver = false;
      const egenFart = () => (rolig || musOver ? 0 : (retning * periode) / varighed);

      let x = retning > 0 ? -periode : 0; // båndets placering i px, altid mellem -periode og 0
      let fart = egenFart();
      let nede = false;
      let traekker = false;
      let startX = 0;
      let sidstX = 0;
      let sidstTid = 0;
      let synlig = true;
      let ramme = 0;
      let forrige = 0;

      baand.classList.add("er-styret");

      const tegn = () => {
        if (periode > 0) x = ((x % periode) - periode) % periode;
        ul.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      };

      const trin = (nu: number) => {
        const dt = Math.min(48, nu - (forrige || nu));
        forrige = nu;
        if (!traekker) {
          // Farten nærmer sig båndets egen fart: hurtigt i starten, blødt til sidst (ca. 1,5 sek. i alt)
          const maal = egenFart();
          fart = maal + (fart - maal) * Math.exp(-dt / 420);
          x += fart * dt;
          tegn();
        }
        ramme = synlig ? requestAnimationFrame(trin) : 0;
      };

      const start = () => {
        if (ramme || !synlig) return;
        forrige = 0;
        ramme = requestAnimationFrame(trin);
      };

      const ned = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        nede = true;
        traekker = false;
        startX = sidstX = e.clientX;
        sidstTid = e.timeStamp;
      };

      const flyt = (e: PointerEvent) => {
        if (!nede) return;
        if (!traekker) {
          if (Math.abs(e.clientX - startX) < 6) return;
          traekker = true;
          fart = 0;
          baand.classList.add("er-trukket");
          try {
            baand.setPointerCapture(e.pointerId);
          } catch {}
        }
        const dx = e.clientX - sidstX;
        const dt = Math.max(1, e.timeStamp - sidstTid);
        // Glattet fingerfart, så et lille ryk til sidst ikke bestemmer det hele
        fart = fart * 0.55 + (dx / dt) * 0.45;
        sidstX = e.clientX;
        sidstTid = e.timeStamp;
        x += dx;
        tegn();
      };

      const slip = (e: PointerEvent) => {
        if (!nede) return;
        nede = false;
        if (!traekker) return;
        traekker = false;
        baand.classList.remove("er-trukket");
        // Holdt fingeren stille, før den slap, skal båndet ikke skydes afsted
        if (e.timeStamp - sidstTid > 90) fart = 0;
        fart = Math.max(-3.2, Math.min(3.2, fart));
      };

      const maal = () => {
        const ny = ul.scrollWidth / kopier;
        if (ny > 0 && periode > 0) x = (x / periode) * ny;
        periode = ny;
        tegn();
      };

      const io = new IntersectionObserver(
        ([p]) => {
          synlig = p.isIntersecting;
          if (synlig) start();
        },
        { rootMargin: "120px 0px" },
      );
      io.observe(baand);
      const ro = new ResizeObserver(maal);
      ro.observe(ul);

      const ind = (e: PointerEvent) => {
        if (laeseBaand && e.pointerType === "mouse") musOver = true;
      };
      const ud = () => {
        musOver = false;
      };
      baand.addEventListener("pointerenter", ind);
      baand.addEventListener("pointerleave", ud);
      baand.addEventListener("pointerdown", ned);
      baand.addEventListener("pointermove", flyt);
      baand.addEventListener("pointerup", slip);
      baand.addEventListener("pointercancel", slip);
      tegn();
      start();

      ryd.push(() => {
        cancelAnimationFrame(ramme);
        io.disconnect();
        ro.disconnect();
        baand.removeEventListener("pointerenter", ind);
        baand.removeEventListener("pointerleave", ud);
        baand.removeEventListener("pointerdown", ned);
        baand.removeEventListener("pointermove", flyt);
        baand.removeEventListener("pointerup", slip);
        baand.removeEventListener("pointercancel", slip);
        baand.classList.remove("er-styret", "er-trukket");
        ul.style.transform = "";
      });
    });

    return () => ryd.forEach((f) => f());
  }, []);

  return null;
}
