import { createMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/lead-form";

export const metadata = createMetadata({
  title: "Contacto | Andrés Fabián Rendón",
  description: "Contacta para crear una web premium, automatización con IA, chatbot WhatsApp, SEO local o sistema SaaS.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">Contacto</p>
        <h1 className="mt-5 text-5xl font-semibold text-white">Cuéntame qué quieres construir.</h1>
        <p className="mt-5 text-slate-300">Responderé con una ruta clara para tu web, automatización o sistema digital.</p>
        <div className="mt-10"><LeadForm /></div>
      </div>
    </section>
  );
}
