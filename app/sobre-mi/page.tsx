import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Sobre Andrés Fabián Rendón | IA, web premium y sistemas digitales",
  description: "Constructor de sistemas digitales con IA, webs premium, automatizaciones, SEO local y SaaS para negocios.",
  path: "/sobre-mi",
});

export default function AboutPage() {
  return (
    <Section eyebrow="Sobre mí" title="Construyo presencia digital premium con mentalidad de producto y ventas.">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <PremiumCard>
          <h1 className="text-3xl font-semibold text-white">Andrés Fabián Rendón</h1>
          <p className="mt-4 leading-7 text-slate-300">
            Trabajo creando webs premium, automatizaciones con IA, sistemas SaaS, dashboards y estrategias SEO para negocios que quieren captar clientes y operar con más control.
          </p>
        </PremiumCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {['IA aplicada', 'Automatización comercial', 'SEO local', 'SaaS vertical', 'Diseño premium', 'CRM y dashboards'].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 text-white">{item}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}
