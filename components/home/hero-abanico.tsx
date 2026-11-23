"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Pieza = { src: string; alt: string; movil?: boolean };

// Abanico de webs reales: al cargar se abren como cartas y siguen un poco al puntero.
export function HeroAbanico({ piezas }: { piezas: Pieza[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Se abre cuando entra en pantalla (en el móvil está por debajo del titular)
    let temporizador = 0;
    const abrir = () => {
      el.classList.add("abierto");
      temporizador = window.setTimeout(() => el.classList.add("listo"), 2200);
    };
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          abrir();
          observador.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observador.observe(el);
    if (reducido) {
      return () => {
        observador.disconnect();
        window.clearTimeout(temporizador);
      };
    }

    // Al bajar, el abanico se abre más y se inclina hacia atrás, como si lo dejaras sobre la mesa
    let rafScroll = 0;
    const alScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        // Avance según la posición del abanico en pantalla, no del scroll total
        const r = el.getBoundingClientRect();
        const p = Math.min(Math.max((window.innerHeight * 0.75 - r.top) / (window.innerHeight * 0.9), 0), 1);
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    if (window.matchMedia("(pointer: coarse)").matches) {
      return () => {
        window.removeEventListener("scroll", alScroll);
        cancelAnimationFrame(rafScroll);
        window.clearTimeout(temporizador);
        observador.disconnect();
      };
    }
    let raf = 0;
    const mover = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", mover);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("scroll", alScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafScroll);
      window.clearTimeout(temporizador);
      observador.disconnect();
    };
  }, []);

  const centro = (piezas.length - 1) / 2;

  return (
    <div ref={ref} className="abanico" aria-hidden="true">
      <div className="abanico__escena">
        {piezas.map((p, i) => {
          const d = i - centro;
          return (
            <figure
              key={p.src}
              className={`abanico__carta ${p.movil ? "abanico__carta--movil" : ""}`}
              style={{ "--d": d, "--abs": Math.abs(d), zIndex: 10 - Math.round(Math.abs(d) * 2) } as React.CSSProperties}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 70vw, 34vw" priority={Math.abs(d) < 1.5} className="object-cover object-top" />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
