// Meta (Facebook) Pixel helpers.
export const META_PIXEL_IDS = ["1873199537456348", "1802552391187970"] as const;
export const PRIMARY_META_PIXEL_ID = "1802552391187970";

export type MetaEventName = "Lead" | "Schedule";

export type MarketingAttribution = {
  landing_page_url: string;
  referrer_url?: string | undefined;
  fbp?: string | undefined;
  fbc?: string | undefined;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function cookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
}

export function createMetaEventId(eventName: MetaEventName) {
  return `${eventName.toLowerCase()}-${crypto.randomUUID()}`;
}

export function readMarketingAttribution(pageParams: URLSearchParams): MarketingAttribution {
  const fbclid = pageParams.get("fbclid");
  return {
    landing_page_url: window.location.href,
    referrer_url: document.referrer || undefined,
    fbp: cookie("_fbp"),
    fbc: cookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
    utm_source: pageParams.get("utm_source"),
    utm_medium: pageParams.get("utm_medium"),
    utm_campaign: pageParams.get("utm_campaign"),
    utm_content: pageParams.get("utm_content"),
    utm_term: pageParams.get("utm_term"),
  };
}

export function trackPixel(
  event: MetaEventName,
  eventId: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  // The matching eventID is sent through the CAPI Edge Function for browser/server deduplication.
  window.fbq("trackSingle", PRIMARY_META_PIXEL_ID, event, params ?? {}, { eventID: eventId });
}

export const metaPixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
${META_PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join("\n")}
fbq('track', 'PageView');`;
