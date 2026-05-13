# Guia deploy Vercel y dominio

1. Importar el repositorio en Vercel.
2. Configurar variables de entorno.
3. Ejecutar build con `npm run build`.
4. Anadir dominio `andresrendon.com` en Project Settings > Domains.
5. Configurar DNS segun indique Vercel.
6. Verificar `https://andresrendon.com`, `/sitemap.xml` y `/robots.txt`.

Variables:

```env
NEXT_PUBLIC_SITE_URL=https://andresrendon.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
LEAD_WEBHOOK_URL=
```
