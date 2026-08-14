import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const META_GRAPH_VERSION = "v26.0";
const ALLOWED_EVENTS = new Set(["Lead", "Schedule"]);

function allowedOrigins() {
  return (
    Deno.env.get("META_CAPI_ALLOWED_ORIGINS") ??
    "https://go.vektiss.com,http://127.0.0.1:8080,http://localhost:8080"
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null) {
  const allowOrigin = origin && allowedOrigins().includes(origin) ? origin : undefined;

  return {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin } : {}),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim().toLowerCase() : undefined;
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return undefined;
  const digits = value.replace(/\D/g, "");
  return digits || undefined;
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function asString(value: unknown, maxLength = 2_000) {
  return typeof value === "string" && value.length <= maxLength ? value : undefined;
}

async function handleRequest(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (!origin || !allowedOrigins().includes(origin)) {
    return Response.json({ error: "Origin not allowed" }, { status: 403, headers });
  }
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST")
    return Response.json({ error: "Method not allowed" }, { status: 405, headers });

  try {
    const body = await request.json();
    const eventName = asString(body.event_name, 100);
    const eventId = asString(body.event_id, 200);
    const eventSourceUrl = asString(body.event_source_url);
    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);
    const leadId = asString(body.lead_id, 100);
    const calendlyEventUri = asString(body.calendly_event_uri);

    if (
      !eventName ||
      !ALLOWED_EVENTS.has(eventName) ||
      !eventId ||
      !eventSourceUrl ||
      (!email && !phone)
    ) {
      return Response.json({ error: "Invalid event payload" }, { status: 400, headers });
    }

    if (eventName === "Schedule") {
      if (
        !leadId ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(leadId)
      ) {
        return Response.json({ error: "Invalid lead ID" }, { status: 400, headers });
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!supabaseUrl || !serviceRoleKey) {
        return Response.json({ error: "CRM update is not configured" }, { status: 503, headers });
      }

      const endpoint = new URL(`${supabaseUrl}/rest/v1/leads`);
      endpoint.searchParams.set("id", `eq.${leadId}`);
      if (email) endpoint.searchParams.set("email", `eq.${email}`);

      const crmResponse = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          follow_up_status: "Consultation Booked",
          meta_schedule_event_id: eventId,
          calendly_event_uri: calendlyEventUri,
          scheduled_at: new Date().toISOString(),
        }),
      });

      if (!crmResponse.ok) {
        console.error(`[meta-capi] CRM booking update failed: ${await crmResponse.text()}`);
        return Response.json({ error: "Unable to update CRM booking" }, { status: 502, headers });
      }

      const updatedLeads = await crmResponse.json();
      if (!Array.isArray(updatedLeads) || updatedLeads.length !== 1) {
        console.error(`[meta-capi] CRM booking update matched ${updatedLeads?.length ?? 0} leads`);
        return Response.json({ error: "Lead not found in CRM" }, { status: 404, headers });
      }
    }

    const pixelId = Deno.env.get("META_CAPI_PIXEL_ID");
    const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
    if (!pixelId || !accessToken) {
      console.error("[meta-capi] Meta CAPI secrets are not configured");
      return Response.json({ error: "Meta CAPI is not configured" }, { status: 503, headers });
    }

    const userData: Record<string, string | string[]> = {};
    if (email) userData.em = [await sha256(email)];
    if (phone) userData.ph = [await sha256(phone)];

    const fbp = asString(body.fbp, 500);
    const fbc = asString(body.fbc, 500);
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIpAddress =
      request.headers.get("cf-connecting-ip") || forwardedFor || request.headers.get("x-real-ip");
    const clientUserAgent = request.headers.get("user-agent");
    if (clientIpAddress) userData.client_ip_address = clientIpAddress;
    if (clientUserAgent) userData.client_user_agent = clientUserAgent;

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1_000),
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: "website",
      user_data: userData,
    };

    const endpoint = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events`);
    endpoint.searchParams.set("access_token", accessToken);
    const requestBody: Record<string, unknown> = { data: [event] };
    const testEventCode = Deno.env.get("META_CAPI_TEST_EVENT_CODE");
    if (testEventCode) requestBody.test_event_code = testEventCode;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.text();

    if (!response.ok) {
      console.error(`[meta-capi] Meta rejected ${eventName}: ${responseBody}`);
      return Response.json({ error: "Meta rejected the event" }, { status: 502, headers });
    }

    return Response.json({ ok: true }, { headers });
  } catch (error) {
    console.error("[meta-capi] request error", error);
    return Response.json({ error: "Unable to process event" }, { status: 500, headers });
  }
}

export default { fetch: handleRequest };
