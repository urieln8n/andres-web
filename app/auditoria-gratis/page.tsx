import { CheckCircle2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { LeadForm } from "@/components/lead-form";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

const faqs = [
  { question: "¿La auditoría gratis tiene compromiso?", answer: "No. Sirve para detectar oportunidades reales y decidir si tiene sentido construir una web, automatización, CRM o sistema completo." },
  { question: "¿Qué negocio puedo enviar?", answer: "Barberías, restaurantes, pizzerías, clínicas, gimnasios, empresas locales, autónomos y negocios de servicios." },
  { question: "¿Qué revisas exactamente?", answer: "Web, SEO, Instagram, WhatsApp, velocidad, experiencia móvil, propuesta de valor, competencia y oportunidades de automatización." },
];

export const metadata = createMetadata({
  title: "Auditoría gratis | Web, SEO, WhatsApp, IA y captación",
  description: "Solicita una auditoría gratis con Andrés Fabián Rendón Ramírez para revisar web, SEO, WhatsApp, captación y automatización con IA.",
  path: "/auditoria-gratis",
});

export default function AuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd("Auditoría gratis de captación digital", "Revisión de web, SEO, WhatsApp, captación, experiencia móvil y oportunidades de automatización con IA.", "/auditoria-gratis")) }} />
      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="premium-kicker text-sm">Auditoría digital gratis</p>
            <h1 className="text-balance mt-5 text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Auditoría gratis para descubrir qué frena tu captación digital.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Soy Andrés Fabián Rendón Ramírez. Analizaré tu web, Instagram, WhatsApp, SEO y oportunidades de automatización para decirte cómo convertir tu presencia digital en un sistema de captación.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {["Diagnóstico profesional", "Errores principales", "Oportunidades rápidas", "Propuesta de mejora", "Plan de acción"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <Section eyebrow="Qué reviso" title="La auditoría mira el sistema completo, no solo si la web se ve bonita.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Web", "SEO", "Instagram", "WhatsApp", "Automatizaciones", "Competencia", "Experiencia móvil", "Velocidad"].map((item) => (
            <PremiumCard key={item}><Search className="mb-4 h-6 w-6 text-cyan-300" /><h3 className="font-semibold text-white">{item}</h3></PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Qué recibes" title="Un diagnóstico accionable para mejorar captación, confianza y seguimiento.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Diagnóstico", "Una lectura clara de lo que bloquea conversión, confianza y visibilidad."],
            ["Oportunidades rápidas", "Acciones que pueden mejorar captación sin esperar meses."],
            ["Plan de acción", "Prioridades para web, SEO, WhatsApp, CRM y automatización."],
          ].map(([title, text]) => (
            <PremiumCard key={title}>
              <Sparkles className="mb-5 h-7 w-7 text-gold" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Confianza" title="Pensado para negocios que quieren vender más, no solo cambiar el diseño.">
        <PremiumCard>
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <ShieldCheck className="h-12 w-12 text-emerald-300" />
            <div>
              <h2 className="text-2xl font-semibold text-white">Tus datos se usan solo para revisar tu caso y contactarte.</h2>
              <p className="mt-3 text-slate-300">El formulario está preparado para Supabase desde servidor. No se exponen claves privadas ni service role en componentes cliente.</p>
            </div>
          </div>
        </PremiumCard>
      </Section>

      <Section eyebrow="FAQs" title="Preguntas frecuentes sobre la auditoría gratis">
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <PremiumCard key={faq.question}>
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>
    </>
  );
}
