-- Panel de clientes: enlaces y QR con seguimiento (/r/[cliente]/[canal]) y panel privado (/panel/[token]).
-- Sin datos personales de quien escanea: ni IP ni cookies, solo cliente, canal y fecha.
create table if not exists public.panel_clientes (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,40}$'),
  nombre text not null,
  dominio text,
  token text not null unique,
  activo boolean not null default true
);
create table if not exists public.panel_enlaces (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  cliente text not null references public.panel_clientes(slug) on update cascade on delete cascade,
  canal text not null check (canal ~ '^[a-z0-9-]{1,30}$'),
  etiqueta text,
  destino text not null check (destino ~ '^https://'),
  unique (cliente, canal)
);
create table if not exists public.panel_clics (
  id bigint generated always as identity primary key,
  creado timestamptz not null default now(),
  cliente text not null,
  canal text not null
);
create index if not exists panel_clics_cliente_creado_idx on public.panel_clics (cliente, creado desc);
alter table public.panel_clientes enable row level security;
alter table public.panel_enlaces enable row level security;
alter table public.panel_clics enable row level security;
-- Sin políticas: solo el servidor (service role) lee y escribe.
