import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

const features = [
  "Responde preguntas frecuentes al instante",
  "Recoge nombre, necesidad y datos de contacto",
  "Cualifica leads antes de llegar al equipo",
  "Deriva a humano cuando hay oportunidad sensible",
  "Registra cada conversación en CRM",
  "Disponible 24/7 sin supervisión manual",
];

const pains = [
  "Respondes tarde y el cliente ya eligió a la competencia.",
  "Repites los mismos horarios, precios y disponibilidad cada día.",
  "Las conversaciones no recogen datos útiles para vender.",
  "No hay registro ni seguimiento de leads que llegan por WhatsApp.",
  "El equipo pierde tiempo en mensajes que no generan venta.",
];

const process = [
  { title: "Auditoría de mensajes", text: "Reviso qué preguntas se repiten y dónde se pierden reservas, presupuestos o ventas en tus conversaciones actuales." },
  { title: "Guion conversacional", text: "Diseño flujos cortos para responder, cualificar, enviar información y derivar a tu equipo cuando el lead está listo." },
  { title: "CRM y alertas", text: "Registro nombre, WhatsApp, necesidad, servicio de interés y estado para que nada quede perdido en el chat." },
  { title: "Optimización continua", text: "Pruebo escenarios reales y ajusto el tono para mantener velocidad sin perder la cercanía que hace que confíen en ti." },
];

const faqs = [
  { question: "¿La IA sustituye a mi equipo?", answer: "No. Responde lo repetido, ordena datos y avisa a tu equipo cuando hay una oportunidad real que necesita trato humano." },
  { question: "¿Se puede conectar con reservas?", answer: "Sí. Puede recoger datos, mostrar disponibilidad o enviar al sistema de reservas si ya existe." },
  { question: "¿Sirve para barberías, restaurantes o clínicas?", answer: "Sí, adaptando preguntas, horarios, servicios y reglas de derivación al negocio concreto." },
  { question: "¿Necesito cambiar mi WhatsApp?", answer: "Depende de la configuración actual. En la auditoría revisamos el camino más práctico y sin interrupciones." },
];

export const metadata = createMetadata({
  title: "Recepcionista IA para WhatsApp | Responde leads 24/7 sin perder ventas",
  description: "Recepcionista IA para WhatsApp que responde preguntas, recoge datos, cualifica leads y deriva a tu equipo. Para negocios locales que no quieren perder ventas por responder tarde.",
  path: "/servicios/recepcionista-ia-whatsapp",
});

export default function RecepcionistaIaWhatsappPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd("Recepcionista IA para WhatsApp", "Asistente WhatsApp con IA para responder leads 24/7, cualificar conversaciones y registrar oportunidades en CRM.", "/servicios/recepcionista-ia-whatsapp")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />

      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div>
            <p className="premium-kicker text-sm">WhatsApp + IA</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Recepcionista IA para WhatsApp que trabaja mientras tú atiendes tu negocio.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Responde preguntas frecuentes, recoge datos del lead, cualifica la conversación y avisa a tu equipo cuando hay una oportunidad real. Sin perder el trato humano.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis?source=recepcionista-ia-whatsapp">Solicitar auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/servicios/chatbot-whatsapp-ia" variant="secondary">Ver chatbot WhatsApp IA</ButtonLink>
            </div>
          </div>
          <PremiumCard className="bg-cyan-300/[.08]">
            <MessageCircle className="h-10 w-10 text-cyan-300" />
            <h2 className="mt-4 text-2xl font-semibold text-white">Lo que hace tu recepcionista IA</h2>
            <ul className="mt-5 grid gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />{f}
                </li>
              ))}
            </ul>
          </PremiumCard>
        </div>
      </section>

      <Section eyebrow="El problema" title="Cada minuto sin respuesta es un lead que se enfría.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pains.map((item, i) => (
            <PremiumCard key={item}>
              <p className="text-sm font-semibold text-cyan-200">0{i + 1}</p>
              <p className="mt-4 text-sm leading-6 text-slate-200">{item}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Cómo funciona" title="Un proceso claro para que tu WhatsApp convierta sin improvisar.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <PremiumCard key={step.title}>
              <p className="text-sm font-semibold text-gold">0{i + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQs" title="Preguntas frecuentes sobre el recepcionista IA para WhatsApp">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <PremiumCard key={faq.question}>
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Servicios relacionados" title="Completa tu sistema de captación">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["/servicios/automatizacion-con-inteligencia-artificial", "Automatización IA", "Flujos completos para captar, responder y hacer seguimiento."],
            ["/servicios/crm-para-negocios-locales", "CRM para negocios", "Pipeline visual para controlar leads y oportunidades."],
            ["/auditoria-gratis", "Auditoría gratis", "Revisión de tu WhatsApp, web, SEO e Instagram."],
          ].map(([href, title, text]) => (
            <Link key={href} href={href} className="group">
              <PremiumCard className="h-full group-hover:bg-white/[.08]">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Ver más <ArrowRight className="h-4 w-4" /></span>
              </PremiumCard>
            </Link>
          ))}
        </div>
      </Section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-border spotlight-panel mx-auto max-w-5xl rounded-[2rem] bg-white/[.06] p-8 text-center shadow-premium md:p-12">
          <p className="premium-kicker text-sm">Siguiente paso</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Solicita una auditoría gratis de tu WhatsApp.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Revisaré cómo llegan los mensajes, qué preguntas se repiten y qué mejoraría primero para no perder leads.</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/auditoria-gratis?source=recepcionista-ia-whatsapp">Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
