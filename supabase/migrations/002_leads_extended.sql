-- Migración 002: campos adicionales en leads + tablas de fase 2

-- Añadir columnas nuevas a leads (idempotente con IF NOT EXISTS)
alter table public.leads
  add column if not exists whatsapp text,
  add column if not exists instagram_url text,
  add column if not exists city text,
  add column if not exists main_problem text;

-- Índice por ciudad para filtros futuros
create index if not exists leads_city_idx on public.leads(city);

-- ─────────────────────────────────────────────
-- Tabla: audits
-- ─────────────────────────────────────────────
create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  score int check (score between 0 and 100),
  diagnosis text,
  opportunities jsonb,
  recommended_offer text,
  ai_summary text,
  created_at timestamptz not null default now()
);

alter table public.audits enable row level security;
drop policy if exists "No public select audits" on public.audits;
create policy "No public select audits" on public.audits for select using (false);

create index if not exists audits_lead_id_idx on public.audits(lead_id);

-- ─────────────────────────────────────────────
-- Tabla: proposals
-- ─────────────────────────────────────────────
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  title text not null,
  price text,
  package_type text,
  proposal_text text,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.proposals enable row level security;
drop policy if exists "No public select proposals" on public.proposals;
create policy "No public select proposals" on public.proposals for select using (false);

create index if not exists proposals_lead_id_idx on public.proposals(lead_id);
create index if not exists proposals_status_idx on public.proposals(status);

-- ─────────────────────────────────────────────
-- Tabla: followups
-- ─────────────────────────────────────────────
create table if not exists public.followups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  channel text not null default 'whatsapp' check (channel in ('whatsapp', 'email', 'call', 'other')),
  message text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.followups enable row level security;
drop policy if exists "No public select followups" on public.followups;
create policy "No public select followups" on public.followups for select using (false);

create index if not exists followups_lead_id_idx on public.followups(lead_id);
create index if not exists followups_scheduled_at_idx on public.followups(scheduled_at);
