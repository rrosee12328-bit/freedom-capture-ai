create extension if not exists pg_net with schema extensions;

create or replace function public.send_lead_emails()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  resend_key text;
  applicant_subject text;
  applicant_html text;
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

  applicant_subject := case new.qualification_status
    when 'Qualified' then 'Your Vektiss application looks like a potential fit'
    else 'We received your Vektiss application'
  end;

  applicant_html := '<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#171717">' ||
    '<h1 style="font-size:24px">Thank you for applying, ' || replace(new.name, '<', '&lt;') || '.</h1>' ||
    case new.qualification_status
      when 'Qualified' then '<p>Your application looks like a potential fit for Vektiss Voice.</p><p><a href="https://calendly.com/vektiss-info/30-minute-vektiss-discovery" style="display:inline-block;background:#6d5dfc;color:white;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:bold">Schedule your consultation</a></p>'
      when 'Needs Review' then '<p>Our team will review your information and contact you if Vektiss Voice appears to be the right fit for your business.</p>'
      else '<p>Based on your answers, a custom managed system may not be the right fit at this time. We have saved your information and may contact you if a more suitable option becomes available.</p>'
    end ||
    '<p style="color:#666;font-size:13px;margin-top:28px">Vektiss Technologies</p></div>';

  admin_html := '<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#171717">' ||
    '<h1 style="font-size:24px">New Vektiss lead: ' || replace(new.name, '<', '&lt;') || '</h1>' ||
    '<p><strong>Status:</strong> ' || new.qualification_status || ' &nbsp; <strong>Score:</strong> ' || new.qualification_score || '/23</p>' ||
    '<hr><p><strong>Email:</strong> ' || replace(new.email, '<', '&lt;') || '<br><strong>Phone:</strong> ' || replace(new.phone, '<', '&lt;') || '<br><strong>Business:</strong> ' || replace(new.business_name, '<', '&lt;') || '<br><strong>Business type:</strong> ' || replace(new.business_type, '<', '&lt;') || '<br><strong>Website:</strong> ' || coalesce(replace(new.website, '<', '&lt;'), 'Not provided') || '</p>' ||
    '<h2 style="font-size:18px">Qualification answers</h2><p><strong>Monthly calls/leads:</strong> ' || new.monthly_calls || '<br><strong>Client value:</strong> ' || new.client_value || '<br><strong>Challenge:</strong> ' || new.challenge || case when new.challenge_other is not null then ' — ' || replace(new.challenge_other, '<', '&lt;') else '' end || '<br><strong>Timeline:</strong> ' || new.timeline || '<br><strong>Investment:</strong> ' || new.investment_readiness || '<br><strong>Authority:</strong> ' || new.purchasing_authority || '<br><strong>Consultation commitment:</strong> ' || new.consultation_commitment || '</p></div>';

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || resend_key, 'Content-Type', 'application/json'),
    body := jsonb_build_object('from', 'Vektiss Applications <applications@vektiss.com>', 'to', jsonb_build_array('rrose@vektiss.com'), 'reply_to', new.email, 'subject', 'New lead: ' || new.name || ' — ' || new.qualification_status, 'html', admin_html)
  );

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || resend_key, 'Content-Type', 'application/json'),
    body := jsonb_build_object('from', 'Vektiss Applications <applications@vektiss.com>', 'to', jsonb_build_array(new.email), 'reply_to', 'rrose@vektiss.com', 'subject', applicant_subject, 'html', applicant_html)
  );

  return new;
end;
$$;

revoke all on function public.send_lead_emails() from public, anon, authenticated;

drop trigger if exists send_lead_emails_after_insert on public.leads;
create trigger send_lead_emails_after_insert
after insert on public.leads
for each row execute function public.send_lead_emails();
