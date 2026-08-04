create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) <= 255),
  phone text not null check (char_length(phone) <= 30),
  business_name text not null check (char_length(business_name) <= 120),
  website text check (website is null or char_length(website) <= 255),
  business_type text not null check (char_length(business_type) <= 120),
  monthly_calls text not null,
  client_value text not null,
  challenge text not null,
  challenge_other text check (challenge_other is null or char_length(challenge_other) <= 1000),
  timeline text not null,
  investment_readiness text not null,
  purchasing_authority text not null,
  consultation_commitment text not null,
  consent boolean not null check (consent = true),
  qualification_score integer not null check (qualification_score between 0 and 23),
  qualification_status text not null check (qualification_status in ('Qualified', 'Needs Review', 'Not Currently Qualified')),
  lead_source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

alter table public.leads enable row level security;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads for insert
to anon, authenticated
with check (consent = true);

drop policy if exists "Authenticated admins can view leads" on public.leads;
create policy "Authenticated admins can view leads"
on public.leads for select
to authenticated
using (true);

revoke update, delete, truncate on public.leads from anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant select on public.leads to authenticated;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (qualification_status);
