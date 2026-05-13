import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

const modules = [
  "Reservas por servicio y barbero",
  "Clientes con historial",
  "Caja diaria y métricas",
  "QR para reservas y reseñas",
  "Dashboard comercial",
  "Marketing y automatizaciones",
];

const faqs = [
  { question: "¿BarberíaOS es un caso real o una demo?", answer: "Es un SaaS vertical y caso demostrativo en construcción. No se presentan métricas reales de clientes ni resultados no verificados." },
  { question: "¿Qué problema resuelve?", answer: "Ordena reservas, clientes, caja, QR, marketing y seguimiento para que la barbería no dependa solo de Instagram y mensajes manuales." },
  { question: "¿Se puede construir algo parecido para otro negocio?", answer: "Sí. La misma lógica puede adaptarse a restaurantes, clínicas, limpieza, pizzerías o servicios locales con reservas y leads." },
];

export const metadata = createMetadata({
  title: "BarberíaOS | Caso SaaS para barberías de Andrés Fabián Rendón Ramírez",
  description: "Caso BarberíaOS: SaaS vertical para barberías con reservas, clientes, caja, QR, dashboard, marketing y automatizaciones con IA.",
  path: "/casos/barberiaos",
});

export default function BarberiaOsCasePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd("BarberíaOS", "Caso demostrativo de SaaS para barberías con reservas, caja, clientes, dashboard, QR, marketing y automatizaciones.", "/casos/barberiaos")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/casos/barberiaos" }, { name: "BarberíaOS", path: "/casos/barberiaos" }])),
        }}
      />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="premium-kicker text-sm">Caso SaaS vertical</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">
              BarberíaOS: el sistema que una barbería necesita cuando Instagram y WhatsApp ya no bastan.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Un caso demostrativo construido por Andrés Fabián Rendón Ramírez para mostrar cómo una barbería puede controlar reservas, clientes, caja, QR, dashboard, marketing y automatizaciones desde un sistema propio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis?source=caso-barberiaos">Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/servicios/sistemas-de-reservas" variant="secondary">Ver sistemas de reservas</ButtonLink>
            </div>
          </div>
          <PremiumCard className="bg-cyan-300/[.08]">
            <p className="text-sm font-semibold text-gold">Caso demostrativo</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Sin métricas infladas. Sin promesas falsas.</h2>
            <p className="mt-4 leading-7 text-slate-300">El objetivo del caso es enseñar el sistema, los módulos y el resultado esperado si se implementa en una operación real.</p>
          </PremiumCard>
        </div>
      </section>

      <Section eyebrow="Problema" title="La barbería vende por atención, pero opera con herramientas sueltas.">
        <div className="grid gap-5 md:grid-cols-3">
          {["Reservas dispersas por mensajes", "Clientes sin historial útil", "Caja y marketing sin lectura clara"].map((item) => (
            <PremiumCard key={item}><p className="leading-7 text-slate-200">{item}</p></PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Solución" title="Un sistema vertical para controlar la operación y volver a vender.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[.045] p-5 text-slate-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Resultado esperado" title="Más control sobre agenda, clientes y oportunidades de fidelización.">
        <PremiumCard>
          <p className="text-lg leading-8 text-slate-200">
            Resultado esperado: reducir errores de agenda, ordenar datos de clientes, ver métricas comerciales y crear una base para marketing, reseñas y automatización. Caso demostrativo, sin resultados reales atribuidos.
          </p>
        </PremiumCard>
      </Section>

      <Section eyebrow="Enlaces internos" title="Servicios conectados con BarberíaOS">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["/servicios/software-saas-para-empresas", "Software SaaS"],
            ["/servicios/sistemas-de-reservas", "Sistemas de reservas"],
            ["/nichos/software-para-barberias", "Software para barberías"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-white/[.08]">
              {label}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
