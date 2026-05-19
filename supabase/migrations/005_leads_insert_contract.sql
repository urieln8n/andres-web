-- Fase 3 hotfix: contrato estable para creación de leads desde /auditoria-gratis

create extension if not exists pgcrypto;

alter table public.leads
  add column if not exists whatsapp text,
  add column if not exists website_url text,
  add column if not exists instagram_url text,
  add column if not exists sector text,
  add column if not exists city text,
  add column if not exists main_problem text,
  add column if not exists service_interest text,
  add column if not exists budget text,
  add column if not exists message text,
  add column if not exists source text default 'andresrendon.com',
  add column if not exists updated_at timestamptz not null default now();

-- Mantener compatibilidad con columnas legacy usadas por dashboard/auditorías.
alter table public.leads
  add column if not exists website text,
  add column if not exists service text,
  add column if not exists goal text;

update public.leads
set
  website_url = coalesce(website_url, website),
  website = coalesce(website, website_url),
  service_interest = coalesce(service_interest, service),
  service = coalesce(service, service_interest),
  main_problem = coalesce(main_problem, goal),
  goal = coalesce(goal, main_problem),
  whatsapp = coalesce(whatsapp, phone),
  source = coalesce(source, 'andresrendon.com')
where
  website_url is null
  or website is null
  or service_interest is null
  or service is null
  or main_problem is null
  or goal is null
  or whatsapp is null
  or source is null;

update public.leads set status = 'new' where status = 'nuevo';
update public.leads set status = 'contacted' where status = 'contactado';
update public.leads set status = 'proposal_sent' where status = 'propuesta_enviada';
update public.leads set status = 'won' where status = 'cerrado';
update public.leads set status = 'lost' where status = 'perdido';
update public.leads
set status = 'new'
where status is null
  or status not in ('new','contacted','audit_generated','proposal_sent','won','lost','follow_up');

alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads
  add constraint leads_status_check
  check (status in ('new','contacted','audit_generated','proposal_sent','won','lost','follow_up'));
alter table public.leads alter column status set default 'new';
alter table public.leads alter column source set default 'andresrendon.com';

alter table public.leads enable row level security;

drop policy if exists "No public select leads" on public.leads;
create policy "No public select leads" on public.leads for select using (false);

-- El formulario inserta vía Route Handler con service role. No se permite insert público.
drop policy if exists "No public insert leads" on public.leads;
create policy "No public insert leads" on public.leads for insert with check (false);

create index if not exists leads_website_url_idx on public.leads(website_url);
create index if not exists leads_service_interest_idx on public.leads(service_interest);
