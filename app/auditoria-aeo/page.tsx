import { Bot, Eye, FileCode2, MessageSquareQuote, Search, ShieldCheck } from "lucide-react";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { AeoAuditTool } from "@/components/aeo-audit-tool";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

const ACTUALIZADO = "2026-11-23";

export const metadata = createMetadata({
  title: "Auditoría AEO gratis: ¿te encuentra ChatGPT?",
  description: "Comprueba gratis en 30 segundos si ChatGPT, Perplexity, Claude y Google pueden leer y citar tu web. Nota de 0 a 100 e informe con lo que hay que arreglar primero.",
  path: "/auditoria-aeo",
});

const faqs = [
  { question: "¿Qué es el AEO?", answer: "AEO (Answer Engine Optimization) es preparar tu web para que los buscadores con IA, como ChatGPT, Perplexity, Claude o los resúmenes con IA de Google, puedan leerla, entenderla y citarla cuando alguien pregunta por un negocio como el tuyo." },
  { question: "¿En qué se diferencia del SEO de toda la vida?", answer: "Google ejecuta JavaScript al leer tu web; la mayoría de crawlers de IA no. Una web puede verse perfecta en Google y estar casi vacía para ChatGPT. El AEO revisa justo esa diferencia, además de los datos estructurados y si tu contenido responde a preguntas concretas." },
  { question: "¿Qué revisa la auditoría gratis?", answer: "Ocho puntos: si tu robots.txt deja entrar a los buscadores de IA, cuánto texto se lee sin JavaScript, tus datos estructurados (schema.org), si respondes a preguntas, tus datos de contacto y de marca, si el contenido está fechado, la base del SEO (título, descripción, sitemap) y la velocidad de respuesta." },
  { question: "¿Me garantizas que ChatGPT me va a citar?", answer: "No. Nadie controla qué cita un modelo de IA. Lo que sí se puede hacer es cumplir las condiciones para que pueda leerte, entenderte y fiarse de tu web. Eso es lo que mide y mejora la auditoría." },
  { question: "¿Cuánto cuesta arreglar lo que salga?", answer: "Depende de la plataforma de tu web. Muchas mejoras son de minutos (robots.txt, descripción, sitemap); otras, como hacer que el contenido se lea sin JavaScript, pueden llevar días. En el informe cada punto indica el esfuerzo estimado." },
  { question: "¿Qué hacéis con mis datos?", answer: "Los uso para enviarte el informe y, si lo aceptas, algunos consejos por email. Puedes darte de baja en cualquier momento desde el propio email. No los vendo ni los cedo." },
];

const ejes = [
  { icono: Bot, titulo: "Acceso de los crawlers de IA", texto: "Si tu robots.txt bloquea a OAI-SearchBot, PerplexityBot o Claude-SearchBot, no apareces en sus respuestas. Bloquear GPTBot (entrenamiento) no te saca de ChatGPT; bloquear OAI-SearchBot (búsqueda) sí." },
  { icono: Eye, titulo: "Lectura sin JavaScript", texto: "Descargamos tu página como lo hace un crawler de IA. Si tus servicios, precios o preguntas frecuentes solo aparecen tras ejecutar JavaScript, para la IA no existen." },
  { icono: FileCode2, titulo: "Datos estructurados", texto: "La ficha en schema.org que dice qué tipo de negocio eres, dónde estás, qué vendes y en qué horario. Es lo que las IA leen para entenderte sin adivinar." },
  { icono: MessageSquareQuote, titulo: "Respuestas citables", texto: "Las IA citan párrafos que responden a una pregunta concreta. Secciones como «¿Cuánto cuesta…?» o «¿Abrís los domingos?» tienen muchas más opciones de aparecer." },
  { icono: ShieldCheck, titulo: "Marca y confianza", texto: "Teléfono, dirección, aviso legal y perfiles enlazados: señales que permiten a la IA confirmar que existes y recomendarte en búsquedas locales." },
  { icono: Search, titulo: "Base SEO y velocidad", texto: "Título, descripción, sitemap, fecha de actualización y tiempo de respuesta. Lo básico que cualquier crawler necesita para encontrar y fechar tu información." },
];

export default function AuditoriaAeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceJsonLd("Auditoría AEO gratis", "Análisis gratuito de si ChatGPT, Perplexity, Claude y Google pueden leer y citar la web de un negocio, con nota de 0 a 100 e informe de mejoras.", "/auditoria-aeo"), offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, dateModified: ACTUALIZADO }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Auditoría AEO gratis", path: "/auditoria-aeo" }])) }} />

      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <p className="premium-kicker text-sm">Auditoría AEO gratis</p>
            <h1 className="text-balance mt-5 text-5xl font-semibold tracking-tight text-white md:text-6xl">
              ¿Te encuentra ChatGPT cuando buscan un negocio como el tuyo?
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Cada vez más clientes preguntan a ChatGPT, Perplexity o Google con IA «¿dónde me corto el pelo en Gràcia?» en lugar de buscar en Google. La IA solo recomienda las webs que puede leer y entender.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Escribe tu web y en 30 segundos sabrás tu nota de 0 a 100 y qué arreglar primero. Gratis y sin llamadas comerciales.
            </p>
            <p className="mt-6 text-sm text-slate-500">Actualizado el <time dateTime={ACTUALIZADO}>23 de noviembre de 2026</time> · Por Andrés Rendón</p>
          </div>
          <AeoAuditTool />
        </div>
      </section>

      <Section eyebrow="Qué mide" title="Lo que decide si la IA te puede recomendar">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ejes.map(({ icono: Icono, titulo, texto }) => (
            <PremiumCard key={titulo}>
              <Icono className="mb-5 h-7 w-7 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{titulo}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{texto}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Por qué ahora" title="¿Por qué una web que va bien en Google puede no existir para ChatGPT?">
        <div className="grid gap-6 lg:grid-cols-2">
          <PremiumCard>
            <h3 className="text-xl font-semibold text-white">Google lee lo que ve una persona</h3>
            <p className="mt-3 leading-7 text-slate-300">Googlebot ejecuta el JavaScript de tu web antes de leerla, así que ve lo mismo que tus clientes. Por eso muchas webs hechas con constructores o aplicaciones modernas posicionan bien en Google.</p>
          </PremiumCard>
          <PremiumCard>
            <h3 className="text-xl font-semibold text-white">La IA lee solo el HTML en crudo</h3>
            <p className="mt-3 leading-7 text-slate-300">Los crawlers de ChatGPT, Perplexity y Claude descargan la página sin ejecutar JavaScript. Si tu contenido se pinta después, para ellos la página está vacía: ni servicios, ni precios, ni reseñas.</p>
          </PremiumCard>
        </div>
      </Section>

      <Section eyebrow="Preguntas frecuentes" title="Lo que más me preguntan sobre el AEO">
        <div className="grid gap-4">
          {faqs.map((f) => (
            <details key={f.question} className="group rounded-3xl border border-white/10 bg-white/[.04] p-6 open:bg-white/[.06]">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:hidden">
                <h3 className="inline">{f.question}</h3>
              </summary>
              <p className="mt-3 leading-7 text-slate-300">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="#auditoria-aeo">Analizar mi web gratis</ButtonLink>
        </div>
      </Section>
    </>
  );
}
