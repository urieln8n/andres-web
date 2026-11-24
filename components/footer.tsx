import Link from "next/link";
import { legalLinks } from "@/components/legal-page";
import { INSTAGRAM_URL } from "@/lib/seo";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308";

export function Footer() {
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Andrés, quiero una demo gratis de la web de mi negocio.")}`;
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.65fr_.65fr_.8fr]">
        <div>
          <p className="text-xl font-semibold text-white">Andrés Rendón</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-gold">Growth Engine</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Sistemas digitales con IA para negocios locales. Más clientes desde WhatsApp, Google e Instagram.
          </p>
          <p className="mt-4 max-w-md text-xs leading-5 text-slate-500">
            Andrés Fabián Rendón Ramírez — IA, automatización, SEO local, webs premium y sistemas digitales para negocios locales.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Navegación</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/servicios" className="transition hover:text-white">Servicios</Link>
            <Link href="/proyectos" className="transition hover:text-white">Proyectos</Link>
            <Link href="/auditoria-gratis" className="transition hover:text-white">Auditoría gratis</Link>
            <Link href="/blog" className="transition hover:text-white">Blog</Link>
            <Link href="/contacto" className="transition hover:text-white">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Productos</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/casos/barberiaos" className="transition hover:text-white">BarberíaOS</Link>
            <Link href="/servicios/webs-premium-para-negocios" className="transition hover:text-white">Web Premium</Link>
            <Link href="/servicios/automatizacion-con-inteligencia-artificial" className="transition hover:text-white">Automatizaciones IA</Link>
            <Link href="/servicios/chatbot-whatsapp-ia" className="transition hover:text-white">Recepcionista WhatsApp</Link>
            <Link href="/servicios/seo-local-para-negocios" className="transition hover:text-white">SEO Local</Link>
          </div>
          <p className="mt-6 font-semibold text-white">Legal</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">¿Hablamos?</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Solicita una auditoría gratis y descubre qué está fallando en tu captación digital.
          </p>
          <Link
            href="/auditoria-gratis"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
          >
            Auditoría gratis
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[.05] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[.1]"
          >
            Escribir por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[.05] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[.1]"
          >
            Sígueme en Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
