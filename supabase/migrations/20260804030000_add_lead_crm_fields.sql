alter table public.leads
  add column if not exists follow_up_status text not null default 'New'
    check (follow_up_status in ('New', 'Contacted', 'Consultation Booked', 'Won', 'Lost', 'Nurture')),
  add column if not exists admin_notes text,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists deal_value numeric(12,2),
  add column if not exists updated_at timestamptz not null default now();

drop policy if exists "Authenticated admins can update leads" on public.leads;
create policy "Authenticated admins can update leads"
on public.leads for update
to authenticated
using (true)
with check (true);

grant update on public.leads to authenticated;
create index if not exists leads_follow_up_status_idx on public.leads (follow_up_status);
create index if not exists leads_next_follow_up_idx on public.leads (next_follow_up_at);
