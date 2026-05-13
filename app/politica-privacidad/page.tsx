import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export const metadata = createMetadata({
  title: "Política de privacidad | Andrés Rendón",
  description: "Política de privacidad de andresrendon.com: responsable, datos recogidos, finalidades, base legal, conservación, proveedores y derechos RGPD.",
  path: "/politica-privacidad",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad"
      title="Política de privacidad"
      intro="Información sobre cómo se tratan los datos personales enviados a través de formularios y comunicaciones de andresrendon.com."
      ctaHref="/auditoria-gratis"
      ctaLabel="Solicitar auditoría"
    >
      <section>
        <h2>Responsable del tratamiento</h2>
        <p>Responsable: Andrés Fabián Rendón, marca profesional Andrés Rendón.</p>
        <p>Dominio: https://andresrendon.com</p>
        <p>Email para privacidad y ejercicio de derechos: fa.andres18@hotmail.com</p>
      </section>

      <section>
        <h2>Datos que se recogen</h2>
        <p>Mediante formularios de contacto o auditoría gratis pueden recogerse datos como nombre, email, teléfono o WhatsApp, nombre del negocio, web o Instagram, sector, objetivo principal, servicio de interés, presupuesto aproximado y mensaje enviado.</p>
        <p>También pueden generarse datos técnicos básicos asociados al uso normal del sitio, como dirección IP, fecha de solicitud o información necesaria para seguridad y funcionamiento.</p>
      </section>

      <section>
        <h2>Finalidades del tratamiento</h2>
        <p>Los datos se tratan para responder solicitudes, preparar auditorías gratuitas, contactar con la persona interesada, analizar necesidades comerciales indicadas por el usuario y enviar información relacionada con los servicios solicitados.</p>
        <p>No se usarán los datos para comunicaciones comerciales no solicitadas sin una base legal adecuada.</p>
      </section>

      <section>
        <h2>Base legal</h2>
        <p>La base principal es el consentimiento del usuario al enviar voluntariamente un formulario o comunicación. También puede aplicarse el interés legítimo para responder a solicitudes iniciadas por el usuario, conservar evidencias de comunicaciones y proteger la seguridad del sitio.</p>
      </section>

      <section>
        <h2>Conservación de datos</h2>
        <p>Los datos se conservarán durante el tiempo necesario para gestionar la solicitud, mantener la relación profesional si llega a existir y atender posibles responsabilidades legales. Cuando ya no sean necesarios, se eliminarán o bloquearán según corresponda.</p>
      </section>

      <section>
        <h2>Destinatarios y proveedores tecnológicos</h2>
        <p>Los datos no se venden a terceros. Pueden tratarse mediante proveedores técnicos necesarios para alojar la web, recibir formularios, almacenar leads o activar automatizaciones.</p>
        <p>Si se configuran en el proyecto, pueden intervenir servicios como Vercel para hosting y despliegue, Supabase para base de datos o CRM, y herramientas de automatización como webhooks o n8n. Estos proveedores deberán usarse bajo sus condiciones y acuerdos aplicables.</p>
      </section>

      <section>
        <h2>Derechos del usuario</h2>
        <p>El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos.</p>
        <p>Para ejercerlos, puede escribir a fa.andres18@hotmail.com indicando el derecho que desea ejercer y aportando información suficiente para identificar la solicitud.</p>
        <p>También puede presentar reclamación ante la Agencia Española de Protección de Datos si considera que el tratamiento no se ajusta a la normativa aplicable.</p>
      </section>

      <section>
        <h2>Seguridad y confidencialidad</h2>
        <p>Se aplicarán medidas técnicas y organizativas razonables para proteger la confidencialidad, integridad y disponibilidad de los datos. Las claves privadas y credenciales de proveedores no deben exponerse en cliente ni en repositorios públicos.</p>
      </section>
    </LegalPage>
  );
}
