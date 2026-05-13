import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export const metadata = createMetadata({
  title: "Aviso legal | Andrés Rendón",
  description: "Aviso legal de andresrendon.com: titularidad, actividad profesional, propiedad intelectual, responsabilidad y uso correcto del sitio.",
  path: "/aviso-legal",
});

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Aviso legal"
      intro="Información general sobre la titularidad, actividad y condiciones básicas de uso de andresrendon.com."
    >
      <section>
        <h2>Titular de la web</h2>
        <p>El titular de este sitio web es Andrés Fabián Rendón, que opera bajo la marca profesional Andrés Rendón.</p>
        <p>Dominio: https://andresrendon.com</p>
        <p>Email de contacto: fa.andres18@hotmail.com</p>
      </section>

      <section>
        <h2>Actividad profesional</h2>
        <p>La actividad principal consiste en consultoría y construcción de sistemas digitales con IA, automatización, webs premium, SEO, CRM, dashboards, chatbots y SaaS para negocios locales, autónomos y empresas.</p>
      </section>

      <section>
        <h2>Objeto del sitio web</h2>
        <p>Este sitio tiene finalidad informativa y comercial. Permite conocer servicios, proyectos, contenidos de blog y solicitar una auditoría gratis o contacto profesional.</p>
      </section>

      <section>
        <h2>Propiedad intelectual e industrial</h2>
        <p>Los textos, estructura, diseño, componentes visuales, código, marca y contenidos publicados en este sitio pertenecen a Andrés Rendón o se usan con autorización o bajo licencias compatibles.</p>
        <p>No se permite copiar, distribuir, transformar o reutilizar el contenido con fines comerciales sin autorización previa y por escrito.</p>
      </section>

      <section>
        <h2>Responsabilidad de contenidos</h2>
        <p>Los contenidos se preparan con criterio profesional, pero pueden contener errores, quedar desactualizados o no ajustarse a una situación concreta. La información publicada no sustituye asesoramiento técnico, legal, fiscal o profesional personalizado.</p>
      </section>

      <section>
        <h2>Enlaces externos</h2>
        <p>Este sitio puede enlazar a herramientas, proveedores o contenidos de terceros. Andrés Rendón no controla ni se hace responsable de sus contenidos, políticas, disponibilidad o seguridad.</p>
      </section>

      <section>
        <h2>Uso correcto del sitio</h2>
        <p>El usuario se compromete a usar la web de forma lícita, diligente y respetuosa, sin dañar sistemas, introducir código malicioso, intentar acceder a zonas privadas o usar formularios para spam, suplantación o comunicaciones abusivas.</p>
      </section>
    </LegalPage>
  );
}
