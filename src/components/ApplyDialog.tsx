import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Option = { label: string; points: number; disqualify?: boolean };

const CALLS: Option[] = [
  { label: "Fewer than 25", points: 0 },
  { label: "25–50", points: 1 },
  { label: "51–100", points: 2 },
  { label: "101–250", points: 3 },
  { label: "More than 250", points: 4 },
  { label: "I'm not sure", points: 1 },
];

const VALUE: Option[] = [
  { label: "Under $500", points: 0 },
  { label: "$500–$1,500", points: 1 },
  { label: "$1,500–$5,000", points: 3 },
  { label: "$5,000–$10,000", points: 4 },
  { label: "More than $10,000", points: 5 },
  { label: "I'm not sure", points: 1 },
];

const CHALLENGE: Option[] = [
  { label: "Missed calls", points: 0 },
  { label: "Slow lead follow-up", points: 0 },
  { label: "Calls coming in after hours", points: 0 },
  { label: "Overwhelmed staff", points: 0 },
  { label: "Inconsistent appointment scheduling", points: 0 },
  { label: "Leads falling through the cracks", points: 0 },
  { label: "We need to hire more support staff", points: 0 },
  { label: "Other", points: 0 },
];

const TIMELINE: Option[] = [
  { label: "Immediately", points: 4 },
  { label: "Within 30 days", points: 3 },
  { label: "Within 60 days", points: 2 },
  { label: "Within 90 days", points: 1 },
  { label: "Just researching", points: 0 },
];

const INVESTMENT: Option[] = [
  { label: "Yes, if it is the right fit", points: 5 },
  { label: "Possibly, but I need more information", points: 2 },
  { label: "No, I am only looking for a free or low-cost tool", points: 0, disqualify: true },
];

const AUTHORITY: Option[] = [
  { label: "Yes, I am the final decision-maker", points: 3 },
  { label: "Yes, I make the decision with a partner", points: 3 },
  { label: "No, I need approval from someone else", points: 1 },
  { label: "No, I am only gathering information", points: 0, disqualify: true },
];

const COMMITMENT: Option[] = [
  { label: "Yes, I'll be there", points: 2 },
  { label: "I need to confirm my availability", points: 1 },
  { label: "No, I may not be able to attend", points: 0, disqualify: true },
];

const BOOKING_URL = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";

type Answers = Record<string, string>;

function find(list: Option[], label?: string) {
  return list.find((o) => o.label === label);
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground sm:text-base">{label}</label>
      {hint ? <p className="text-xs text-muted-foreground sm:text-sm">{hint}</p> : null}
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25";

function Choice({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => {
        const active = value === o.label;
        return (
          <button
            type="button"
            key={o.label}
            onClick={() => onChange(o.label)}
            className={`rounded-xl border px-4 py-3 text-left text-base transition-colors ${
              active
                ? "border-primary bg-primary/10 font-semibold text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ApplyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [a, setA] = useState<Answers>({});
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<null | "qualified" | "review" | "not-qualified">(null);

  const set = (k: string) => (v: string) => setA((p) => ({ ...p, [k]: v }));

  const score = useMemo(() => {
    return (
      (find(CALLS, a['calls'])?.points ?? 0) +
      (find(VALUE, a['value'])?.points ?? 0) +
      (find(TIMELINE, a['timeline'])?.points ?? 0) +
      (find(INVESTMENT, a['investment'])?.points ?? 0) +
      (find(AUTHORITY, a['authority'])?.points ?? 0) +
      (find(COMMITMENT, a['commitment'])?.points ?? 0)
    );
  }, [a]);

  const disqualified =
    !!find(INVESTMENT, a['investment'])?.disqualify ||
    !!find(AUTHORITY, a['authority'])?.disqualify ||
    !!find(COMMITMENT, a['commitment'])?.disqualify;

  function reset() {
    setA({});
    setConsent(false);
    setStatus(null);
    setError(null);
  }

  function submit() {
    setError(null);
    if (!a['name']?.trim() || !a['email']?.trim() || !a['phone']?.trim() || !a['business']?.trim() || !a['type']?.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a['email'] ?? "")) {
      setError("Please enter a valid business email.");
      return;
    }
    if (!a['calls'] || !a['value'] || !a['challenge']) {
      setError("Please answer every question.");
      return;
    }
    if (a['challenge'] === "Other" && !a['challengeOther']?.trim()) {
      setError("Please tell us what is currently happening.");
      return;
    }
    if (!a['timeline'] || !a['investment'] || !a['authority'] || !a['commitment']) {
      setError("Please answer every question.");
      return;
    }
    if (!consent) {
      setError("Please agree to be contacted so we can follow up on your application.");
      return;
    }
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const submission = {
      submittedAt: new Date().toISOString(),
      ...a,
      consent,
      score,
      status: disqualified ? "Not Currently Qualified" : score >= 12 ? "Qualified" : score >= 7 ? "Needs Review" : "Not Currently Qualified",
      leadSource: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
    };
    console.info("Vektiss application", submission);
    setStatus(disqualified || score <= 6 ? "not-qualified" : score >= 12 ? "qualified" : "review");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 250);
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <div className="bg-ink px-6 py-6 text-background">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-background/70">
            Vektiss
          </span>
          <DialogHeader className="mt-3 space-y-3 text-left">
            <DialogTitle className="text-3xl leading-tight font-bold text-background">
              Stop Losing High-Value Clients to Missed Calls
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-background/80">
              Apply to see whether Vektiss Voice is the right fit for your business. Vektiss builds
              and manages custom AI communication systems that answer calls 24/7, qualify leads,
              schedule appointments, and follow up across phone, text, and email.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-6 px-6 pt-6 pb-8">
          {status === null ? (
            <>
              <div className="space-y-5">
                  <Field label="Full name *">
                    <input className={inputCls} value={a['name'] ?? ""} onChange={(e) => set("name")(e.target.value)} maxLength={100} />
                  </Field>
                  <Field label="Business email *">
                    <input type="email" className={inputCls} value={a['email'] ?? ""} onChange={(e) => set("email")(e.target.value)} maxLength={255} />
                  </Field>
                  <Field label="Phone number *">
                    <input type="tel" className={inputCls} value={a['phone'] ?? ""} onChange={(e) => set("phone")(e.target.value)} maxLength={30} />
                  </Field>
                  <Field label="Business name *">
                    <input className={inputCls} value={a['business'] ?? ""} onChange={(e) => set("business")(e.target.value)} maxLength={120} />
                  </Field>
                  <Field label="Website URL">
                    <input type="url" placeholder="https://" className={inputCls} value={a['website'] ?? ""} onChange={(e) => set("website")(e.target.value)} maxLength={255} />
                  </Field>
                  <Field label="What type of business do you operate? *">
                    <input className={inputCls} value={a['type'] ?? ""} onChange={(e) => set("type")(e.target.value)} maxLength={120} />
                  </Field>
              </div>

              <div className="space-y-7">
                  <Field label="Approximately how many calls or leads does your business receive each month? *">
                    <Choice options={CALLS} value={a['calls']} onChange={set("calls")} />
                  </Field>
                  <Field label="What is one new client typically worth to your business? *">
                    <Choice options={VALUE} value={a['value']} onChange={set("value")} />
                  </Field>
                  <Field label="What is your biggest challenge right now? *">
                    <Choice options={CHALLENGE} value={a['challenge']} onChange={set("challenge")} />
                  </Field>
                  {a['challenge'] === "Other" ? (
                    <Field label="Tell us what is currently happening *">
                      <textarea
                        rows={4}
                        maxLength={1000}
                        className={inputCls}
                        value={a['challengeOther'] ?? ""}
                        onChange={(e) => set("challengeOther")(e.target.value)}
                      />
                    </Field>
                  ) : null}
              </div>

              <div className="space-y-7">
                  <Field label="How soon are you looking to improve this? *">
                    <Choice options={TIMELINE} value={a['timeline']} onChange={set("timeline")} />
                  </Field>
                  <Field label="Are you prepared to invest in a professionally built and managed AI communication system? *">
                    <Choice options={INVESTMENT} value={a['investment']} onChange={set("investment")} />
                  </Field>
                  <Field label="Are you involved in the final purchasing decision? *">
                    <Choice options={AUTHORITY} value={a['authority']} onChange={set("authority")} />
                  </Field>
                  <Field label="Can we count on you to attend your scheduled consultation? *">
                    <Choice options={COMMITMENT} value={a['commitment']} onChange={set("commitment")} />
                  </Field>
                  <label className="flex cursor-pointer gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 size-4 shrink-0 accent-[var(--primary)]"
                    />
                    <span>
                      I agree to receive calls, emails, and SMS updates from Vektiss regarding my
                      application and scheduled consultation. Message and data rates may apply.
                      Reply STOP to opt out.
                    </span>
                  </label>
              </div>

              {error ? <p className="text-base font-medium text-destructive">{error}</p> : null}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={submit}
                  className="btn-glow rounded-full px-7 py-3 text-base font-semibold"
                >
                  Apply for a Vektiss Voice Consultation →
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6 py-4 text-center">
              {status === "qualified" ? (
                <>
                  <h3 className="text-2xl font-bold">
                    Your application looks like a potential fit for Vektiss Voice.
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Choose a time below to speak with our team about your current call and lead
                    process.
                  </p>
                  <a
                    href={BOOKING_URL}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-cta)]"
                  >
                    Schedule Your Vektiss Voice Consultation →
                  </a>
                </>
              ) : null}
              {status === "review" ? (
                <>
                  <h3 className="text-2xl font-bold">Thank you for applying.</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Our team will review your application and contact you if Vektiss Voice appears
                    to be the right fit for your business.
                  </p>
                </>
              ) : null}
              {status === "not-qualified" ? (
                <>
                  <h3 className="text-2xl font-bold">Thank you for your interest in Vektiss Voice.</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Based on your answers, a custom managed system may not be the right fit for your
                    business at this time. We have saved your information and may contact you if a
                    more suitable option becomes available.
                  </p>
                </>
              ) : null}
            </div>
          )}

          <p className="border-t border-border pt-5 text-center text-sm text-muted-foreground">
            <a href="https://vektiss.com/privacy" className="underline underline-offset-4">
              Privacy Policy
            </a>
            <span className="px-2">·</span>
            <a href="https://vektiss.com/terms" className="underline underline-offset-4">
              Terms of Service
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}