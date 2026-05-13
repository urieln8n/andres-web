# Prompt profesional para Codex — Continuar Mega Web Personal de Andrés

Actúa como arquitecto senior full-stack, experto en Next.js App Router, SEO programático, UI/UX premium, CRO, Supabase y automatizaciones con IA.

## Contexto

Este repositorio es la base de la web personal profesional de Andrés Fabián Rendón. Debe funcionar como:

1. Carta de presentación premium.
2. Máquina SEO para atraer leads.
3. Portafolio de proyectos y demos.
4. Sistema de captación con auditoría gratuita.
5. CRM privado simple para gestionar oportunidades.
6. Base futura para vender webs, automatizaciones, SaaS y consultoría IA.

## Posicionamiento

Andrés ayuda a negocios locales y emprendedores a captar más clientes, automatizar procesos y construir sistemas digitales con IA.

Servicios centrales:

- Webs premium para negocios.
- Automatización con inteligencia artificial.
- Chatbots WhatsApp para empresas.
- SEO local.
- Software SaaS para empresas.
- Auditoría digital.
- CRM para negocios locales.
- Sistemas de reservas.

Nichos prioritarios:

- Barberías.
- Restaurantes.
- Pizzerías.
- Empresas de limpieza.
- Clínicas.
- Gimnasios.
- Inmobiliarias.
- Autónomos.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Zod
- SEO metadata avanzada
- Sitemap dinámico
- Robots dinámico
- Componentes reutilizables

## Reglas absolutas

- No hacer diseño básico.
- No convertirlo en un portfolio barato.
- Mantener estética premium tipo Apple + Stripe + Vercel.
- Priorizar mobile-first.
- Priorizar velocidad, SEO, claridad y conversión.
- No saturar con 3D pesado.
- Usar profundidad visual, gradients, glass cards y mockups.
- Mantener código limpio y escalable.
- No romper rutas existentes.
- No eliminar páginas SEO actuales.
- Crear componentes reutilizables.
- Ejecutar `npm run lint` y `npm run build`.

## Tareas Fase 1

1. Revisar toda la estructura actual.
2. Mejorar la home con copy más agresivo y premium.
3. Mejorar mobile navbar.
4. Crear layout visual para página `/servicios`.
5. Crear layout visual para página `/nichos`.
6. Conectar formulario de `/auditoria-gratis` con `/api/leads`.
7. Preparar el dashboard para leer leads de Supabase cuando haya sesión.
8. Añadir loading states y mensajes de éxito/error.
9. Mejorar metadata por cada slug SEO.
10. Añadir JSON-LD para Persona, Organization, Service y LocalBusiness.

## Tareas Fase 2

Crear mínimo 20 páginas SEO nuevas usando la estructura de `lib/site-data.ts`:

Servicios:
- diseño web con IA
- landing pages de alta conversión
- automatización de WhatsApp
- embudos digitales para negocios
- auditoría SEO local
- dashboard comercial

Nichos:
- clínicas estéticas
- gimnasios
- inmobiliarias
- abogados
- academias
- talleres mecánicos
- centros de estética

Locales:
- diseño web premium en Barcelona
- automatización IA en Barcelona
- chatbot WhatsApp Barcelona
- SEO local Barcelona
- web para restaurantes Barcelona
- web para empresas de limpieza Barcelona

## Tareas Fase 3

1. Añadir blog real con MDX o archivos de contenido.
2. Crear 10 artículos SEO iniciales.
3. Añadir lead magnets:
   - Auditoría gratis.
   - Checklist web premium.
   - Guía de automatización WhatsApp.
4. Crear formulario multi-step.
5. Añadir score de lead.
6. Crear panel de seguimiento de leads.
7. Añadir export CSV.

## Criterios de calidad

- Lighthouse objetivo: performance > 90, SEO > 95, accessibility > 90.
- Mobile perfecto.
- CTA visible en hero, mitad de página y final.
- Cada página SEO debe tener H1 único, title, description, canonical y CTA.
- Ninguna página debe parecer generada sin intención.
- Cada página debe atacar un dolor comercial real.

## Entrega esperada

Al terminar, responder con:

- Archivos modificados.
- Rutas creadas.
- Cómo probar localmente.
- Resultado de lint/build.
- Qué falta para producción.
