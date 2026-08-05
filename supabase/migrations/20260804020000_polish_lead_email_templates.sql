create or replace function public.send_lead_emails()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  resend_key text;
  applicant_subject text;
  applicant_message text;
  status_color text;
  status_label text;
  applicant_html text;
  admin_html text;
  safe_name text := replace(replace(new.name, '&', '&amp;'), '<', '&lt;');
begin
  select decrypted_secret into resend_key
  from vault.decrypted_secrets
  where name = 'resend_api_key'
  limit 1;

  if resend_key is null then
    raise warning 'Resend API key is not configured';
    return new;
  end if;

  if new.qualification_status = 'Qualified' then
    status_color := '#ef4444';
    status_label := 'HIGH-PRIORITY LEAD';
    applicant_subject := 'Your Vektiss application looks like a strong fit';
    applicant_message := 'Based on your answers, your business looks like a strong potential fit for Vektiss Voice. The next step is a personalized consultation so we can learn about your current call flow and show you what a custom system could look like.';
  elsif new.qualification_status = 'Needs Review' then
    status_color := '#f59e0b';
    status_label := 'REVIEW';
    applicant_subject := 'We received your Vektiss application';
    applicant_message := 'Thank you for telling us about your business. Our team is reviewing your answers and will contact you if Vektiss Voice appears to be the right fit for your current lead flow and goals.';
  else
    status_color := '#64748b';
    status_label := 'NURTURE';
    applicant_subject := 'We received your Vektiss application';
    applicant_message := 'Thank you for your interest in Vektiss Voice. Based on your answers, a custom managed system may not be the right fit at this time. We have saved your information and may reach out if a more suitable option becomes available.';
  end if;

  applicant_html := '<!doctype html><html><body style="margin:0;padding:0;background:#f3f7fc;font-family:Arial,Helvetica,sans-serif;color:#202027"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(20,20,35,.08);border-top:6px solid #1287f7"><tr><td style="padding:28px 36px 20px;background:#ffffff"><img src="https://go.vektiss.com/assets/vektiss-logo-cropped-BYYAB0Wu.webp" width="180" alt="Vektiss" style="display:block;width:180px;max-width:55%;height:auto;border:0"><h1 style="margin:24px 0 0;color:#111827;font-size:28px;line-height:1.2">Your application is in.</h1></td></tr><tr><td style="padding:24px 36px 36px"><h2 style="margin:0 0 18px;font-size:25px;line-height:1.25;color:#202027">Hey ' || safe_name || ' &#128075;</h2><p style="margin:0 0 18px;font-size:17px;line-height:1.7;color:#52525b">You took the first step toward capturing more serious leads without staying tied to the phone.</p><p style="margin:0;font-size:17px;line-height:1.7;color:#52525b">' || applicant_message || '</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;background:#eef6ff;border-radius:12px;border-left:4px solid #1287f7"><tr><td style="padding:18px 20px"><div style="font-size:13px;font-weight:700;color:#0875dc;text-transform:uppercase;letter-spacing:1px">What happens next</div><div style="margin-top:8px;font-size:15px;line-height:1.6;color:#52525b">Keep an eye on your inbox and phone. If we need anything else, a member of the Vektiss team will reach out.</div></td></tr></table><p style="margin:30px 0 0;font-size:15px;line-height:1.6;color:#52525b">To more freedom,<br><strong style="color:#202027">The Vektiss Team</strong></p></td></tr><tr><td style="padding:20px 36px;background:#f8f8fa;color:#8a8a96;font-size:12px;line-height:1.6">Vektiss Technologies &middot; Automated lead capture and qualification<br>This email was sent because you submitted an application at Vektiss.</td></tr></table></td></tr></table></body></html>';

  admin_html := '<!doctype html><html><body style="margin:0;padding:0;background:#f3f7fc;font-family:Arial,Helvetica,sans-serif;color:#202027"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(20,20,35,.08);border-top:6px solid #1287f7"><tr><td style="padding:28px 36px 20px;background:#ffffff"><img src="https://go.vektiss.com/assets/vektiss-logo-cropped-BYYAB0Wu.webp" width="180" alt="Vektiss" style="display:block;width:180px;max-width:55%;height:auto;border:0"><h1 style="margin:24px 0 18px;color:#111827;font-size:28px;line-height:1.25">&#128293; New Lead &mdash; ' || safe_name || '</h1><span style="display:inline-block;padding:9px 16px;border-radius:999px;background:' || status_color || ';color:#ffffff;font-size:12px;font-weight:800;letter-spacing:1px">' || status_label || '</span></td></tr><tr><td style="padding:24px 36px 36px"><p style="margin:0 0 25px;color:#52525b;font-size:17px;line-height:1.65">A new lead submitted the Vektiss application and scored <strong style="color:#202027">' || new.qualification_status || ' (' || new.qualification_score || '/23)</strong>.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Name</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || safe_name || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Email</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700"><a href="mailto:' || new.email || '" style="color:#202027">' || new.email || '</a></td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Phone</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700"><a href="tel:' || new.phone || '" style="color:#202027">' || new.phone || '</a></td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Business</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.business_name || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Business type</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.business_type || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Monthly leads</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.monthly_calls || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Client value</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.client_value || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Challenge</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.challenge || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Timeline</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.timeline || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Investment ready</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.investment_readiness || '</td></tr>' ||
    '<tr><td style="padding:13px 0;border-bottom:1px solid #e8e8ed;color:#8a8a96">Decision authority</td><td align="right" style="padding:13px 0;border-bottom:1px solid #e8e8ed;font-weight:700">' || new.purchasing_authority || '</td></tr>' ||
    '<tr><td style="padding:13px 0;color:#8a8a96">Submitted</td><td align="right" style="padding:13px 0;font-weight:700">' || to_char(new.created_at at time zone 'America/Chicago', 'FMMM/FMDD/YYYY FMHH12:MI AM') || ' CT</td></tr></table>' ||
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px"><tr><td style="border-radius:999px;background:#1287f7"><a href="https://go.vektiss.com/admin" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none">Open Lead in CRM&nbsp;&rarr;</a></td><td width="10"></td><td style="border:1px solid #1287f7;border-radius:999px"><a href="mailto:' || new.email || '?subject=Your Vektiss application" style="display:inline-block;padding:12px 20px;color:#0875dc;font-size:15px;font-weight:700;text-decoration:none">Reply to Lead</a></td></tr></table></td></tr><tr><td style="padding:18px 36px;background:#f8f8fa;color:#8a8a96;font-size:12px">Source: ' || coalesce(new.lead_source, 'direct') || ' &middot; Lead ID: ' || new.id || '</td></tr></table></td></tr></table></body></html>';

  perform net.http_post(url := 'https://api.resend.com/emails', headers := jsonb_build_object('Authorization', 'Bearer ' || resend_key, 'Content-Type', 'application/json'), body := jsonb_build_object('from', 'Vektiss Applications <applications@vektiss.com>', 'to', jsonb_build_array('rrose@vektiss.com'), 'reply_to', new.email, 'subject', case when new.qualification_status = 'Qualified' then '🔥 New High-Priority Lead: ' else 'New Vektiss Lead: ' end || new.name || ' — ' || new.qualification_status, 'html', admin_html));
  perform net.http_post(url := 'https://api.resend.com/emails', headers := jsonb_build_object('Authorization', 'Bearer ' || resend_key, 'Content-Type', 'application/json'), body := jsonb_build_object('from', 'Vektiss Applications <applications@vektiss.com>', 'to', jsonb_build_array(new.email), 'reply_to', 'rrose@vektiss.com', 'subject', applicant_subject, 'html', applicant_html));
  return new;
end;
$$;

revoke all on function public.send_lead_emails() from public, anon, authenticated;
