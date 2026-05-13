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

## Dominio principal: no-www

El dominio canonico principal es:

```txt
https://andresrendon.com
```

Usa `NEXT_PUBLIC_SITE_URL=https://andresrendon.com` en Vercel. El codigo normaliza `https://www.andresrendon.com` a `https://andresrendon.com` para canonical, Open Graph, Twitter Cards, sitemap, robots y JSON-LD.

Configuracion recomendada:

1. En Vercel, anade `andresrendon.com` como dominio principal del proyecto.
2. Anade tambien `www.andresrendon.com`, pero configuralo como redirect hacia `andresrendon.com`.
3. En Cloudflare, crea registros DNS para apex y `www` segun indique Vercel.
4. Activa SSL/TLS en modo Full o Full strict si el certificado esta correcto.
5. Crea una regla de redireccion 301 de `https://www.andresrendon.com/*` a `https://andresrendon.com/$1`.
6. Verifica que `https://www.andresrendon.com` redirige a `https://andresrendon.com` sin cadenas intermedias.

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

Checklist SEO antes de indexar:

- `NEXT_PUBLIC_SITE_URL` apunta a `https://andresrendon.com`.
- `https://andresrendon.com/robots.txt` permite marketing y bloquea `/api/` y `/dashboard`.
- `https://andresrendon.com/sitemap.xml` incluye home, servicios, nichos, Barcelona, blog, proyectos, auditoria, contacto y sobre mi.
- Cada pagina comercial tiene H1 unico, metadata unica, canonical y CTA hacia auditoria.
- Los datos estructurados no inventan metricas ni resultados reales.
- Search Console tiene propiedad de dominio y sitemap enviado.
- Google Business Profile enlaza al dominio no-www.

## Supabase y CRM

El formulario envia a `app/api/leads/route.ts`. La API valida con Zod y usa Supabase desde servidor mediante `lib/supabase-admin.ts`. El dashboard actual es visual/mock y esta listo para conectar con Auth y tabla `leads`.

Para conectar Supabase:

1. Ejecuta la migracion de `supabase/migrations/001_leads_crm.sql`.
2. Configura `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en Vercel.
3. Mantén `SUPABASE_SERVICE_ROLE_KEY` solo en rutas servidor.
4. Prueba `/auditoria-gratis` y confirma insercion en tabla `leads`.

Para proteger `/dashboard` antes de mostrar datos reales:

1. Anadir Supabase Auth o middleware de sesion.
2. Bloquear lectura de leads sin usuario autorizado.
3. Mantener `/dashboard` como demo publica hasta que exista autenticacion.
4. No exponer service role ni consultas privadas en componentes cliente.

## Deploy en Vercel

1. Importar proyecto en Vercel.
2. Configurar variables de entorno.
3. Conectar dominio `andresrendon.com`.
4. Verificar `https://andresrendon.com/sitemap.xml`.
5. Verificar `https://andresrendon.com/robots.txt`.
6. Probar formulario de auditoria gratis.

Checklist Cloudflare/Vercel:

- Apex `andresrendon.com` apunta a Vercel.
- `www` existe solo para redirigir.
- No hay mezcla de canonical `www` y no-www.
- HTTPS funciona en ambas versiones.
- La redireccion `www -> apex` es 301.
- Vercel tiene las mismas variables en Production, Preview si aplica y Development si se usa.

## Como anadir paginas SEO

1. Edita `lib/site-data.ts`.
2. Anade una entrada en `services`, `niches`, `localPages`, `projectStudies` o `blogPosts`.
3. Usa H1, title y description unicos.
4. Anade dolores, proceso, FAQs y enlaces internos cuando sea una pagina comercial.
5. Ejecuta `npm run lint`, `npm run typecheck` y `npm run build`.

## Automatizaciones

`LEAD_WEBHOOK_URL` permite enviar cada lead a n8n, CRM externo o automatizaciones internas. Mantener webhooks y claves privadas siempre en servidor.
