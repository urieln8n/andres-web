-- Fase 3: auditorías IA estructuradas para leads locales

create extension if not exists pgcrypto;

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  score int check (score between 0 and 100),
  diagnosis text,
  weaknesses jsonb,
  opportunities jsonb,
  recommended_offer text,
  ai_summary text,
  whatsapp_message text,
  seven_day_plan jsonb,
  next_steps jsonb,
  generated_by text default 'ai',
  model_used text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.audits
  add column if not exists weaknesses jsonb,
  add column if not exists opportunities jsonb,
  add column if not exists recommended_offer text,
  add column if not exists ai_summary text,
  add column if not exists whatsapp_message text,
  add column if not exists seven_day_plan jsonb,
  add column if not exists next_steps jsonb,
  add column if not exists generated_by text default 'ai',
  add column if not exists model_used text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.audits
  drop constraint if exists audits_score_check;

alter table public.audits
  add constraint audits_score_check check (score between 0 and 100);

alter table public.audits enable row level security;

drop policy if exists "No public select audits" on public.audits;
create policy "No public select audits" on public.audits for select using (false);

drop policy if exists "No public insert audits" on public.audits;
create policy "No public insert audits" on public.audits for insert with check (false);

drop policy if exists "No public update audits" on public.audits;
create policy "No public update audits" on public.audits for update using (false);

drop policy if exists "No public delete audits" on public.audits;
create policy "No public delete audits" on public.audits for delete using (false);

drop trigger if exists set_audits_updated_at on public.audits;
create trigger set_audits_updated_at
before update on public.audits
for each row execute function public.set_updated_at();

create index if not exists audits_lead_id_idx on public.audits(lead_id);
create index if not exists audits_created_at_idx on public.audits(created_at desc);
create index if not exists audits_generated_by_idx on public.audits(generated_by);
