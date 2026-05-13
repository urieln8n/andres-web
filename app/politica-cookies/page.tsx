import { createMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";

export const metadata = createMetadata({
  title: "Política de cookies | Andrés Rendón",
  description: "Política de cookies de andresrendon.com: qué son las cookies, tipos posibles, cookies técnicas, analíticas, terceros y configuración.",
  path: "/politica-cookies",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Política de cookies"
      intro="Información sobre el uso actual y futuro de cookies en andresrendon.com."
    >
      <section>
        <h2>Qué son las cookies</h2>
        <p>Las cookies son pequeños archivos o tecnologías similares que se almacenan en el navegador del usuario para permitir el funcionamiento de una web, recordar preferencias o medir el uso del sitio.</p>
      </section>

      <section>
        <h2>Uso actual de cookies</h2>
        <p>Actualmente esta web no tiene configurado un sistema de analítica activa ni cookies no esenciales desde el código del proyecto. Por ello no se muestra un banner invasivo de consentimiento.</p>
        <p>Si en el futuro se activan cookies analíticas, publicitarias o de terceros no necesarias, se deberá implementar un banner o panel de consentimiento adecuado antes de cargarlas.</p>
      </section>

      <section>
        <h2>Cookies técnicas</h2>
        <p>La web puede usar cookies o tecnologías técnicas necesarias para navegación, seguridad, carga de páginas, envío de formularios o prevención de abuso. Estas cookies son necesarias para prestar el servicio solicitado y no requieren consentimiento cuando son estrictamente imprescindibles.</p>
      </section>

      <section>
        <h2>Cookies analíticas</h2>
        <p>Si se activan herramientas de analítica, podrían usarse para conocer páginas visitadas, origen del tráfico, eventos de conversión o rendimiento general. En ese caso, se informará de la herramienta usada y se solicitará consentimiento cuando proceda.</p>
      </section>

      <section>
        <h2>Cookies de terceros</h2>
        <p>Si se integran servicios externos como vídeos, mapas, calendarios, chat, CRM, analítica o píxeles publicitarios, dichos terceros podrían instalar cookies según sus propias políticas. Estas integraciones deberán revisarse antes de producción si no son estrictamente necesarias.</p>
      </section>

      <section>
        <h2>Aceptar, rechazar o configurar cookies</h2>
        <p>Cuando existan cookies no esenciales, el usuario deberá poder aceptarlas, rechazarlas o configurarlas desde un panel claro. Mientras no se usen cookies no esenciales, no se solicita consentimiento mediante banner.</p>
      </section>

      <section>
        <h2>Cambiar preferencias</h2>
        <p>El usuario puede borrar o bloquear cookies desde la configuración de su navegador. Si en el futuro se añade un panel de consentimiento, esta página deberá enlazar también al mecanismo para cambiar preferencias.</p>
      </section>
    </LegalPage>
  );
}
