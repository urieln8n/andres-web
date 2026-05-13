import Link from "next/link";
import { legalLinks } from "@/components/legal-page";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_.7fr_.7fr_.8fr]">
        <div>
          <p className="text-xl font-semibold text-white">Andrés Fabián Rendón Ramírez</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Webs premium, IA, automatización, SEO local y sistemas digitales para negocios que quieren captar más clientes.
          </p>
          <p className="mt-4 max-w-md text-xs leading-5 text-slate-500">
            Andrés Fabián Rendón Ramírez — consultor de IA, automatización, SEO local, webs premium y sistemas digitales para negocios locales en Barcelona.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Navegación</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/servicios">Servicios</Link>
            <Link href="/nichos">Nichos</Link>
            <Link href="/auditoria-gratis">Auditoría gratis</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">CTA principal</p>
          <p className="mt-4 text-sm text-slate-400">Convierte tu presencia digital en un sistema de captación.</p>
        </div>
      </div>
    </footer>
  );
}
