import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const META_GRAPH_VERSION = "v26.0";
const ALLOWED_EVENTS = new Set(["Lead", "Schedule"]);

function corsHeaders(origin: string | null) {
  const allowedOrigins = (Deno.env.get("META_CAPI_ALLOWED_ORIGINS") ?? "https://go.vektiss.com")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
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

serve(async (request) => {
  const headers = corsHeaders(request.headers.get("origin"));
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST")
    return Response.json({ error: "Method not allowed" }, { status: 405, headers });

  const pixelId = Deno.env.get("META_CAPI_PIXEL_ID");
  const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
  if (!pixelId || !accessToken) {
    console.error("[meta-capi] Meta CAPI secrets are not configured");
    return Response.json({ error: "Meta CAPI is not configured" }, { status: 503, headers });
  }

  try {
    const body = await request.json();
    const eventName = asString(body.event_name, 100);
    const eventId = asString(body.event_id, 200);
    const eventSourceUrl = asString(body.event_source_url);
    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);

    if (
      !eventName ||
      !ALLOWED_EVENTS.has(eventName) ||
      !eventId ||
      !eventSourceUrl ||
      (!email && !phone)
    ) {
      return Response.json({ error: "Invalid event payload" }, { status: 400, headers });
    }

    const userData: Record<string, string | string[]> = {};
    if (email) userData.em = [await sha256(email)];
    if (phone) userData.ph = [await sha256(phone)];

    const fbp = asString(body.fbp, 500);
    const fbc = asString(body.fbc, 500);
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

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
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
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
});
