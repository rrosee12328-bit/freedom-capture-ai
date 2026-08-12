alter table public.leads
  alter column business_name drop not null,
  alter column business_type drop not null,
  alter column monthly_calls drop not null,
  alter column client_value drop not null,
  alter column challenge drop not null,
  alter column timeline drop not null,
  alter column investment_readiness drop not null,
  alter column purchasing_authority drop not null,
  alter column consultation_commitment drop not null,
  alter column qualification_score drop not null,
  alter column qualification_status drop not null;

drop trigger if exists send_lead_emails_after_insert on public.leads;
create trigger send_lead_emails_after_insert
after insert on public.leads
for each row
when (new.lead_source is distinct from 'pre_calendly_form')
execute function public.send_lead_emails();

create or replace function public.send_pre_calendly_admin_email()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  resend_key text;
  safe_name text := replace(replace(replace(replace(new.name, '&', '&amp;'), '<', '&lt;'), '>', '&gt;'), '"', '&quot;');
  safe_email text := replace(replace(replace(replace(new.email, '&', '&amp;'), '<', '&lt;'), '>', '&gt;'), '"', '&quot;');
  safe_phone text := replace(replace(replace(replace(new.phone, '&', '&amp;'), '<', '&lt;'), '>', '&gt;'), '"', '&quot;');
  safe_source text := replace(replace(replace(replace(coalesce(new.utm_source, 'Direct'), '&', '&amp;'), '<', '&lt;'), '>', '&gt;'), '"', '&quot;');
  admin_html text;
begin
  select decrypted_secret into resend_key
  from vault.decrypted_secrets
  where name = 'resend_api_key'
  limit 1;

  if resend_key is null then
    raise warning 'Resend API key is not configured';
    return new;
  end if;

  admin_html := '<!doctype html><html><body style="margin:0;padding:0;background:#f3f7fc;font-family:Arial,Helvetica,sans-serif;color:#202027"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(20,20,35,.08);border-top:6px solid #1287f7"><tr><td style="padding:28px 36px 20px;background:#ffffff"><img src="https://go.vektiss.com/assets/vektiss-logo-cropped-BYYAB0Wu.webp" width="180" alt="Vektiss" style="display:block;width:180px;max-width:55%;height:auto;border:0"><h1 style="margin:24px 0 18px;color:#111827;font-size:28px;line-height:1.25">New Calendar Lead &mdash; ' || safe_name || '</h1><span style="display:inline-block;padding:9px 16px;border-radius:999px;background:#1287f7;color:#ffffff;font-size:12px;font-weight:800;letter-spacing:1px">SCHEDULING STARTED</span></td></tr><tr><td style="padding:24px 36px 36px"><p style="margin:0 0 25px;color:#52525b;font-size:17px;line-height:1.65">A visitor submitted their contact details and continued to your Calendly page. Their appointment may not be confirmed yet.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Name</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || safe_name || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Email</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700"><a href="mailto:' || safe_email || '" style="color:#202027">' || safe_email || '</a></td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Phone</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700"><a href="tel:' || safe_phone || '" style="color:#202027">' || safe_phone || '</a></td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Source</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || safe_source || '</td></tr>' ||
    '<tr><td style="padding:13px 0;color:#8a8a96">Captured</td><td align="right" style="padding:13px 0;font-weight:700">' || to_char(new.created_at at time zone 'America/Chicago', 'FMMM/FMDD/YYYY FMHH12:MI AM') || ' CT</td></tr></table>' ||
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px"><tr><td style="border-radius:999px;background:#1287f7"><a href="https://go.vektiss.com/admin" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none">Open Lead in CRM&nbsp;&rarr;</a></td><td width="10"></td><td style="border:1px solid #1287f7;border-radius:999px"><a href="mailto:' || new.email || '?subject=Your Vektiss consultation" style="display:inline-block;padding:12px 20px;color:#0875dc;font-size:15px;font-weight:700;text-decoration:none">Email Lead</a></td></tr></table></td></tr><tr><td style="padding:18px 36px;background:#f8f8fa;color:#8a8a96;font-size:12px">Pre-Calendly contact capture &middot; Lead ID: ' || new.id || '</td></tr></table></td></tr></table></body></html>';

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || resend_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'Vektiss Leads <applications@vektiss.com>',
      'to', jsonb_build_array('rrose@vektiss.com'),
      'reply_to', new.email,
      'subject', 'New Calendar Lead: ' || new.name || ' — Scheduling Started',
      'html', admin_html
    )
  );

  return new;
end;
$$;

revoke all on function public.send_pre_calendly_admin_email() from public, anon, authenticated;

drop trigger if exists send_pre_calendly_admin_email_after_insert on public.leads;
create trigger send_pre_calendly_admin_email_after_insert
after insert on public.leads
for each row
when (new.lead_source = 'pre_calendly_form')
execute function public.send_pre_calendly_admin_email();
