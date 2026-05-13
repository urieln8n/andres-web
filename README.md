# Andres personal SEO megaweb kit

Web personal premium de Andres Rendon para vender sistemas digitales con IA, SEO local, automatizacion, CRM, dashboards, chatbots, SaaS y captacion de leads.

Dominio de produccion:

```txt
https://andresrendon.com
```

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber + Drei + Three
- Supabase preparado para leads/CRM
- SEO con metadata, canonical, sitemap, robots y JSON-LD

## Instalacion

```bash
npm install
npm run dev
```

## Comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Variables de entorno

```env
NEXT_PUBLIC_SITE_URL=https://andresrendon.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

`SUPABASE_SERVICE_ROLE_KEY` solo debe usarse en servidor. No debe importarse en componentes cliente.

## Estructura

- `app/`: rutas App Router, metadata, sitemap, robots, API de leads.
- `components/`: navbar, footer, cards, formulario, dashboard y 3D.
- `components/three/`: experiencia 3D procedural optimizada.
- `lib/seo.ts`: metadata y JSON-LD.
- `lib/site-data.ts`: paginas SEO por servicios, nichos y Barcelona.
- `supabase/`: base preparada para leads.
- `demo-html/`: demo independiente para enviar por WhatsApp o email.
- `docs/`: roadmap, SEO, oferta, produccion y deploy.

## SEO

La URL base se define en `lib/utils.ts` con `SITE_URL`:

```ts
NEXT_PUBLIC_SITE_URL || "https://andresrendon.com"
```

Para editar paginas SEO, actualiza `lib/site-data.ts`. El sitemap lee servicios, nichos, paginas Barcelona y blog desde esa fuente.

## Supabase y CRM

El formulario envia a `app/api/leads/route.ts`. La API valida con Zod y usa Supabase desde servidor mediante `lib/supabase-admin.ts`. El dashboard actual es visual/mock y esta listo para conectar con Auth y tabla `leads`.

## Deploy en Vercel

1. Importar proyecto en Vercel.
2. Configurar variables de entorno.
3. Conectar dominio `andresrendon.com`.
4. Verificar `https://andresrendon.com/sitemap.xml`.
5. Verificar `https://andresrendon.com/robots.txt`.
6. Probar formulario de auditoria gratis.

## Automatizaciones

`LEAD_WEBHOOK_URL` permite enviar cada lead a n8n, CRM externo o automatizaciones internas. Mantener webhooks y claves privadas siempre en servidor.
