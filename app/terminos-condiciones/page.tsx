import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export const metadata = createMetadata({
  title: "Términos y condiciones | Andrés Rendón",
  description: "Términos y condiciones de uso de andresrendon.com: uso del sitio, solicitudes de auditoría, presupuestos, contenidos y responsabilidad.",
  path: "/terminos-condiciones",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Condiciones"
      title="Términos y condiciones"
      intro="Condiciones básicas que regulan el uso de andresrendon.com y las solicitudes realizadas a través del sitio."
      ctaHref="/auditoria-gratis"
      ctaLabel="Solicitar auditoría"
    >
      <section>
        <h2>Uso de la web</h2>
        <p>El usuario se compromete a usar andresrendon.com de forma legal, respetuosa y compatible con la finalidad informativa y profesional del sitio.</p>
      </section>

      <section>
        <h2>Solicitudes de auditoría</h2>
        <p>La auditoría gratis permite enviar información sobre un negocio para recibir una valoración inicial de oportunidades digitales. El envío del formulario no implica obligación de contratación ni garantiza disponibilidad, resultado concreto o entrega de un informe extenso.</p>
      </section>

      <section>
        <h2>Carácter informativo de los contenidos</h2>
        <p>Los contenidos publicados sobre IA, SEO, webs, automatización, CRM, dashboards, chatbots o SaaS tienen finalidad divulgativa y comercial. No constituyen asesoramiento legal, fiscal, financiero ni garantía de resultados.</p>
      </section>

      <section>
        <h2>Presupuestos personalizados</h2>
        <p>Los servicios se presupuestan de forma personalizada según alcance, objetivos, complejidad, integraciones, contenidos, urgencia y requisitos técnicos. Cualquier referencia económica publicada tendrá carácter orientativo salvo acuerdo escrito.</p>
      </section>

      <section>
        <h2>Propiedad intelectual</h2>
        <p>El usuario no adquiere derechos sobre contenidos, diseños, textos, marca, metodología o materiales del sitio por el simple uso de la web. Cualquier uso comercial requiere autorización previa.</p>
      </section>

      <section>
        <h2>Limitación de responsabilidad</h2>
        <p>Andrés Rendón no se hace responsable de daños derivados de un uso incorrecto del sitio, interrupciones ajenas, decisiones tomadas exclusivamente con base en contenido informativo o enlaces externos de terceros.</p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>Para dudas sobre estas condiciones, puede escribirse a fa.andres18@hotmail.com.</p>
      </section>

      <section>
        <h2>Ley aplicable</h2>
        <p>Estas condiciones se interpretarán conforme a la legislación española, sin perjuicio de la normativa imperativa que pueda resultar aplicable al usuario.</p>
      </section>
    </LegalPage>
  );
}
