import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, LockKeyhole, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  createMetaEventId,
  readMarketingAttribution,
  trackPixel,
  type MarketingAttribution,
} from "@/lib/meta-pixel";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";

const BOOKING_URL = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#1287f7] focus:ring-4 focus:ring-blue-100";

type BookingState = {
  leadId: string;
  name: string;
  email: string;
  phone: string;
  pageParams: URLSearchParams;
  attribution: MarketingAttribution;
};

type CalendlyMessage = {
  event?: string;
  payload?: {
    event?: { uri?: string };
  };
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function calendlyUrl(name: string, email: string, phone: string, pageParams: URLSearchParams) {
  const url = new URL(BOOKING_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("email", email);
  url.searchParams.set("a1", phone);
  UTM_KEYS.forEach((key) => {
    const value = pageParams.get(key);
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function sendMetaCapiEvent(input: {
  event_name: "Lead" | "Schedule";
  event_id: string;
  email: string;
  phone: string;
  event_source_url: string;
  attribution: MarketingAttribution;
  lead_id?: string | undefined;
  calendly_event_uri?: string | undefined;
}) {
  if (!supabase) return;
  const { error } = await supabase.functions.invoke("meta-capi", {
    body: {
      event_name: input.event_name,
      event_id: input.event_id,
      email: input.email,
      phone: input.phone,
      event_source_url: input.event_source_url,
      fbp: input.attribution.fbp,
      fbc: input.attribution.fbc,
      lead_id: input.lead_id,
      calendly_event_uri: input.calendly_event_uri,
    },
  });
  if (error) console.error(`[meta-capi] ${input.event_name} delivery failed`, error);
}

export function LeadCaptureDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const scheduleReported = useRef(false);

  useEffect(() => {
    async function handleCalendlyMessage(event: MessageEvent<CalendlyMessage>) {
      if (
        event.origin !== "https://calendly.com" ||
        event.data?.event !== "calendly.event_scheduled" ||
        !booking ||
        scheduleReported.current
      ) {
        return;
      }

      scheduleReported.current = true;
      const scheduleEventId = createMetaEventId("Schedule");
      trackPixel("Schedule", scheduleEventId);
      void sendMetaCapiEvent({
        event_name: "Schedule",
        event_id: scheduleEventId,
        email: booking.email,
        phone: booking.phone,
        event_source_url: window.location.href,
        attribution: booking.attribution,
        lead_id: booking.leadId,
        calendly_event_uri: event.data.payload?.event?.uri,
      });
      setScheduled(true);
    }

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [booking]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    setError("");

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setError("Please enter your name, email, and phone number.");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!consent) {
      setError("Please confirm that Vektiss may contact you about your consultation.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setError("We could not save your details. Please try again shortly.");
      return;
    }

    const pageParams = new URLSearchParams(window.location.search);
    const attribution = readMarketingAttribution(pageParams);
    const leadId = crypto.randomUUID();
    const leadEventId = createMetaEventId("Lead");
    setSubmitting(true);
    scheduleReported.current = false;

    const { error: insertError } = await supabase.from("leads").insert({
      id: leadId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      consent: true,
      qualification_score: null,
      qualification_status: null,
      lead_source: "pre_calendly_form",
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      meta_lead_event_id: leadEventId,
      landing_page_url: attribution.landing_page_url,
      referrer_url: attribution.referrer_url,
      meta_fbp: attribution.fbp,
      meta_fbc: attribution.fbc,
    });

    if (insertError) {
      console.error("Pre-Calendly lead capture failed", insertError);
      setSubmitting(false);
      setError("We could not save your details. Please try again.");
      return;
    }

    trackPixel("Lead", leadEventId);
    void sendMetaCapiEvent({
      event_name: "Lead",
      event_id: leadEventId,
      email: cleanEmail,
      phone: cleanPhone,
      event_source_url: window.location.href,
      attribution,
    });

    setBooking({
      leadId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      pageParams,
      attribution,
    });
    setSubmitting(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!submitting) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto border-0 bg-white p-0 shadow-2xl">
        {scheduled ? (
          <div className="px-7 py-12 text-center">
            <CheckCircle2 className="mx-auto size-12 text-[#1287f7]" />
            <DialogTitle className="mt-5 text-3xl font-extrabold tracking-[-.035em] text-slate-950">
              You’re scheduled.
            </DialogTitle>
            <DialogDescription className="mt-3 text-base leading-relaxed text-slate-600">
              Your consultation is confirmed. We’ll prepare using the details you shared.
            </DialogDescription>
          </div>
        ) : booking ? (
          <div className="px-5 py-6 sm:px-7">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <CalendarCheck className="size-4 text-[#1287f7]" />
                FINAL STEP
              </div>
              <DialogTitle className="text-3xl leading-[1.05] font-extrabold tracking-[-.035em] text-slate-950">
                Choose your consultation time
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-slate-600">
                Pick a time below. We’ll only mark your call as scheduled after Calendly confirms
                it.
              </DialogDescription>
            </DialogHeader>
            <CalendlyInlineEmbed
              url={calendlyUrl(booking.name, booking.email, booking.phone, booking.pageParams)}
            />
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden bg-[#f5f9ff] px-5 pt-6 pb-5 sm:px-7 sm:pt-7">
              <div
                aria-hidden
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(#dbeafe 1px,transparent 1px),linear-gradient(90deg,#dbeafe 1px,transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
              <div className="relative">
                <img src={vektissLogo} alt="Vektiss" className="h-7 w-auto" />
                <DialogHeader className="mt-6 space-y-3 text-left">
                  <div className="flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                    <CalendarCheck className="size-4 text-[#1287f7]" />
                    YOUR CALENDAR IS NEXT
                  </div>
                  <DialogTitle className="text-3xl leading-[1.05] font-extrabold tracking-[-.035em] text-slate-950">
                    Where should we send your booking details?
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-slate-600">
                    Enter your contact information once. We&apos;ll save it securely and prefill it
                    on Calendly for you.
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
              <label className="block text-sm font-bold text-slate-700">
                Full name
                <input
                  autoFocus
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={100}
                  placeholder="Your full name"
                  className={inputClassName}
                />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Email address
                <input
                  required
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  maxLength={255}
                  placeholder="you@company.com"
                  className={inputClassName}
                />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Phone number
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={30}
                  placeholder="(555) 555-0123"
                  className={inputClassName}
                />
              </label>

              <label className="flex cursor-pointer gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[#1287f7]"
                />
                <span>
                  I agree that Vektiss may contact me by phone, email, or text about my
                  consultation. Message and data rates may apply. Reply STOP to opt out.
                </span>
              </label>

              {error ? (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#1287f7] px-6 py-4 font-extrabold text-white shadow-[0_18px_50px_-18px_rgba(18,135,247,.8)] transition hover:-translate-y-0.5 hover:bg-[#0875dc] disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? "Saving your details…" : "Continue to Calendar"}
                {!submitting ? (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                ) : null}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                <LockKeyhole className="size-3.5" />
                Your details are securely saved before Calendly opens.
              </div>
              <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
                <a href="/privacy" className="hover:text-[#1287f7]">
                  Privacy
                </a>
                <span>·</span>
                <a href="/terms" className="hover:text-[#1287f7]">
                  Terms
                </a>
                <PhoneCall className="size-3.5 text-[#1287f7]" />
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CalendlyInlineEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | undefined;
    const initialize = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current, resize: true });
    };

    if (window.Calendly) initialize();
    else {
      script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initialize;
      document.head.appendChild(script);
    }

    return () => script?.remove();
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="mt-6 min-h-[700px] overflow-hidden rounded-2xl border border-slate-100 bg-white"
    />
  );
}
