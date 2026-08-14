# Meta CAPI setup for Freedom Capture AI

This repository now records an initial `Lead` event after the pre-Calendly CRM row is saved and a `Schedule` event only after the embedded Calendly widget emits `calendly.event_scheduled`. The browser Pixel and Conversions API share the same event ID for deduplication.

## Supabase changes

Run `supabase/migrations/20260814000000_add_meta_lead_attribution.sql` once. It stores the browser/server event IDs, Meta attribution, and confirmed Calendly booking details on the existing CRM lead. On confirmation, the Edge Function updates `follow_up_status` to `Consultation Booked` with its server-side service-role credential; the public browser does not receive update access.

## Required Edge Function secrets

Set these secrets in the connected Supabase project before deploying or invoking `meta-capi`.

| Secret                      | Value                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `META_CAPI_PIXEL_ID`        | The Meta Pixel ID to receive server events. Use the pixel selected for campaign optimization. |
| `META_CAPI_ACCESS_TOKEN`    | A Conversions API access token generated in Events Manager. Keep server-side only.            |
| `META_CAPI_ALLOWED_ORIGINS` | Comma-separated deployed site origins, for example `https://go.vektiss.com`.                  |
| `META_CAPI_TEST_EVENT_CODE` | Optional Test Events code. Remove it after validation.                                        |

## Deployment and validation

Deploy the `meta-capi` Edge Function through the connected Supabase/Lovable workflow, then use Meta Events Manager’s Test Events tool to validate the server event payloads. Remove any test configuration after verification.

Confirm the following behavior before relying on performance data:

1. Submitting the contact form creates one CRM lead and sends one `Lead` browser/server event pair.
2. Opening the calendar does **not** send a `Schedule` event.
3. Completing an embedded Calendly booking sends one `Schedule` browser/server event pair and updates the CRM row to `Consultation Booked`.
4. Events Manager reports the browser/server pair as deduplicated.

The integration stores campaign attribution already present on the landing URL (UTM parameters, `_fbp`, and `_fbc`) for matching. Review your live privacy notice and consent posture before enabling production customer-data sharing.
