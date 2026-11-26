-- Estadísticas de «¿Te ve ChatGPT?» (/nota-ia y /auditoria-aeo).
-- Sin datos personales: ni IP, ni cookies. Solo qué pasó, dónde, de qué canal y, en comprobaciones, la web pública y su nota.
create table if not exists public.nota_ia_eventos (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  tipo text not null check (tipo in ('visita','comprobacion','informe','whatsapp','compartir','sello')),
  pagina text,
  canal text,
  dominio text,
  nota int
);
create index if not exists nota_ia_eventos_creado_idx on public.nota_ia_eventos (creado desc);

alter table public.nota_ia_eventos enable row level security;
-- Sin políticas: solo el servidor (service role) lee y escribe.
