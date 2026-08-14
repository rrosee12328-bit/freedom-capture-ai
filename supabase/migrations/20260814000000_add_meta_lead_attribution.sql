alter table public.leads
  add column if not exists meta_lead_event_id text,
  add column if not exists meta_schedule_event_id text,
  add column if not exists landing_page_url text,
  add column if not exists referrer_url text,
  add column if not exists meta_fbp text,
  add column if not exists meta_fbc text,
  add column if not exists calendly_event_uri text,
  add column if not exists scheduled_at timestamptz;

create unique index if not exists leads_meta_lead_event_id_key
  on public.leads (meta_lead_event_id)
  where meta_lead_event_id is not null;

create unique index if not exists leads_meta_schedule_event_id_key
  on public.leads (meta_schedule_event_id)
  where meta_schedule_event_id is not null;

comment on column public.leads.meta_lead_event_id is
  'Shared browser and Meta Conversions API event ID used for Lead deduplication.';

comment on column public.leads.meta_schedule_event_id is
  'Shared browser and Meta Conversions API event ID used for Schedule deduplication.';

comment on column public.leads.meta_fbp is
  'Meta browser identifier captured at lead submission for advertising attribution.';

comment on column public.leads.meta_fbc is
  'Meta click identifier captured at lead submission for advertising attribution.';
