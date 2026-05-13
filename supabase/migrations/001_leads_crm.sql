create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text not null,
  business_name text not null,
  website text,
  service text not null,
  budget text,
  message text,
  source text default 'web',
  status text not null default 'nuevo' check (status in ('nuevo', 'contactado', 'propuesta_enviada', 'cerrado', 'perdido')),
  estimated_value numeric(12,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- No permitimos lectura pública de leads.
drop policy if exists "No public select leads" on public.leads;
create policy "No public select leads" on public.leads for select using (false);

-- Inserciones públicas solo se recomiendan vía API server-side usando service role.
-- Si quieres permitir insert directo con anon, crea una policy controlada en fase posterior.

drop trigger if exists set_leads_updated_at on public.leads;
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_service_idx on public.leads(service);
