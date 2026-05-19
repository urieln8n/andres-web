-- Migración 003: schema completo para dashboard
-- Ejecutar DESPUÉS de 001 y 002

-- ─────────────────────────────────────────────
-- Columnas adicionales en leads
-- ─────────────────────────────────────────────
alter table public.leads
  add column if not exists sector text,
  add column if not exists goal text,
  add column if not exists internal_notes text;

-- Migrar valores de status de español a inglés (safe: solo afecta rows existentes)
update public.leads set status = 'new'           where status = 'nuevo';
update public.leads set status = 'contacted'     where status = 'contactado';
update public.leads set status = 'proposal_sent' where status = 'propuesta_enviada';
update public.leads set status = 'won'           where status = 'cerrado';
update public.leads set status = 'lost'          where status = 'perdido';
-- Cualquier valor desconocido -> 'new'
update public.leads set status = 'new'
  where status not in ('new','contacted','audit_generated','proposal_sent','won','lost','follow_up');

-- Reemplazar constraint de status
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads
  add constraint leads_status_check
  check (status in ('new','contacted','audit_generated','proposal_sent','won','lost','follow_up'));
alter table public.leads alter column status set default 'new';

-- Índices de apoyo para dashboard
create index if not exists leads_sector_idx       on public.leads(sector);
create index if not exists leads_business_name_idx on public.leads(lower(business_name));

-- ─────────────────────────────────────────────
-- Actualizar tabla audits (añadir columnas que faltan)
-- ─────────────────────────────────────────────
alter table public.audits
  add column if not exists weaknesses     jsonb,
  add column if not exists whatsapp_message text,
  add column if not exists seven_day_plan jsonb;

-- ─────────────────────────────────────────────
-- Relajar constraint NOT NULL en proposals.title
-- ─────────────────────────────────────────────
alter table public.proposals alter column title drop not null;

-- ─────────────────────────────────────────────
-- Policy de insert anónimo para leads
-- (el formulario /auditoria-gratis inserta vía server action con service role,
--  así que NO necesitamos policy pública de insert)
-- ─────────────────────────────────────────────
-- Sin cambios en RLS — lectura y escritura públicas siguen bloqueadas.
-- El dashboard usa service role desde servidor.
