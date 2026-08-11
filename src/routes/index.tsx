import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Headphones,
  Layers3,
  MessageSquareText,
  PhoneCall,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { trackPixel } from "@/lib/meta-pixel";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";
import phoneCutout from "@/assets/vektiss-phone-cutout.png";

const BOOKING_URL = "https://calendly.com/vektiss-info/30-minute-vektiss-discovery";
const TITLE = "Vektiss Voice — Every Opportunity Handled";
const DESCRIPTION =
  "A fully managed 24/7 call system built around your business—answering customers, capturing what they need, and moving every opportunity to the next step.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Funnel,
});

function BookingCta({
  label = "Start Your 7-Day Free Trial",
  dark = false,
}: {
  label?: string;
  dark?: boolean;
}) {
  return (
    <a
      href={BOOKING_URL}
      onClick={() => trackPixel("Schedule")}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold transition duration-200 sm:px-8 sm:py-4 sm:text-base ${
        dark
          ? "bg-white text-slate-950 shadow-[0_18px_50px_-18px_rgba(255,255,255,.55)] hover:-translate-y-0.5"
          : "bg-[#1287f7] text-white shadow-[0_18px_50px_-18px_rgba(18,135,247,.8)] hover:-translate-y-0.5 hover:bg-[#0875dc]"
      }`}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-extrabold tracking-[.2em] uppercase ${light ? "text-blue-300" : "text-[#1287f7]"}`}
    >
      {children}
    </p>
  );
}

function Funnel() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="/" aria-label="Vektiss home">
            <img src={vektissLogo} alt="Vektiss" className="h-7 w-auto sm:h-8" />
          </a>
          <BookingCta label="Book Your Trial" />
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#f5f9ff]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(#dbeafe 1px,transparent 1px),linear-gradient(90deg,#dbeafe 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(circle at 50% 15%,black,transparent 75%)",
          }}
        />
        <div className="absolute top-0 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[#1287f7]" />
            </span>
            FOR ESTABLISHED SERVICE BUSINESSES WITH HIGH-VALUE CUSTOMERS
          </div>
          <h1 className="mx-auto mt-7 max-w-[22rem] text-left font-display text-[2.25rem] leading-[1.04] font-extrabold tracking-[-.04em] sm:max-w-6xl sm:text-center sm:text-[3.5rem] sm:leading-[.98] lg:text-[4.25rem]">
            <span className="block">
              Turn the calls your team <span className="text-[#1287f7]">misses</span> into{" "}
              <span className="relative inline-block text-[#1287f7]">
                booked opportunities
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-1 w-full -rotate-1 rounded-full bg-blue-300/60"
                />
              </span>{" "}
              <span className="whitespace-nowrap">
                — <span className="text-[#1287f7]">24/7.</span>
              </span>
            </span>
            <span className="mt-5 block text-[.56em] leading-tight tracking-[-.02em] text-slate-900 sm:mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2.5 shadow-sm sm:px-5">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-[#1287f7]" />
                Without hiring another receptionist.
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-[22rem] text-left text-base leading-relaxed font-medium text-slate-600 sm:max-w-4xl sm:text-center sm:text-xl">
            Vektiss Voice answers, qualifies, follows up, and moves qualified callers to the next
            step — even when your team is busy, closed, or unavailable.
          </p>

          {/* VSL remains in its original hero position */}
          <div className="mx-auto mt-9 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-1.5 shadow-[0_35px_90px_-35px_rgba(15,23,42,.45)] sm:mt-12">
            <div
              className="relative w-full overflow-hidden rounded-[1.2rem]"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src="https://iframe.mediadelivery.net/embed/600055/0c670976-e711-43b7-bce8-76a61e91d32c?autoplay=false&preload=true&responsive=true"
                loading="lazy"
                title="Vektiss Voice — how it works"
                className="absolute inset-0 size-full border-0"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-8">
            <BookingCta label="Put Vektiss on Your Phones Free for 7 Days" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed font-bold text-slate-600 sm:text-base">
            Real calls. Real customers. See what Vektiss can capture before you pay.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <Eyebrow>The real gap</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              The problem isn&apos;t getting the phone to ring.
            </h2>
            <p className="mt-5 text-xl font-bold text-[#1287f7] sm:text-2xl">
              It&apos;s what happens when nobody can answer it.
            </p>
            <p className="mt-6 leading-relaxed text-slate-600 sm:text-lg">
              You&apos;re already creating demand. But customers don&apos;t only call when your team
              is ready—and the opportunity rarely waits for a callback.
            </p>
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: PhoneCall,
                time: "10:42 AM",
                title: "Your team is on another call",
                result: "Opportunity waiting",
              },
              {
                icon: Clock3,
                time: "6:18 PM",
                title: "The office is closed",
                result: "Competitor answers",
              },
              {
                icon: Headphones,
                time: "12:06 PM",
                title: "The front desk is overwhelmed",
                result: "Callback gets delayed",
              },
              {
                icon: Zap,
                time: "Now",
                title: "Vektiss fills the gap",
                result: "Next step handled",
                active: true,
              },
            ].map(({ icon: Icon, time, title, result, active }) => (
              <div
                key={time}
                className={`rounded-2xl border p-5 ${active ? "border-blue-300 bg-[#1287f7] text-white shadow-xl shadow-blue-200" : "border-slate-200 bg-slate-50"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-xl p-2.5 ${active ? "bg-white/15" : "bg-white text-[#1287f7] shadow-sm"}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`text-xs font-bold ${active ? "text-blue-100" : "text-slate-400"}`}
                  >
                    {time}
                  </span>
                </div>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className={`mt-1 text-sm ${active ? "text-blue-100" : "text-slate-500"}`}>
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow light>Different by design</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Not an answering service.
              <br />
              <span className="text-blue-300">An extension of how your business operates.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {[
              {
                label: "Answering service",
                icon: Headphones,
                title: "Takes a message",
                copy: "Captures a name and number for somebody else to handle later.",
              },
              {
                label: "Software platform",
                icon: Bot,
                title: "Gives you tools",
                copy: "Leaves your team to build, configure, monitor, and manage the system.",
              },
              {
                label: "Vektiss Voice",
                icon: Layers3,
                title: "Handles the workflow",
                copy: "Built around what needs to happen after the phone rings.",
                active: true,
              },
            ].map(({ label, icon: Icon, title, copy, active }) => (
              <div key={label} className={`p-7 sm:p-9 ${active ? "bg-[#1287f7]" : "bg-slate-950"}`}>
                <div className="flex items-center justify-between">
                  <Icon className={`size-7 ${active ? "text-white" : "text-blue-300"}`} />
                  <span
                    className={`text-xs font-bold tracking-[.16em] uppercase ${active ? "text-blue-100" : "text-slate-500"}`}
                  >
                    {label}
                  </span>
                </div>
                <h3 className="mt-12 text-2xl font-bold">{title}</h3>
                <p className={`mt-3 leading-relaxed ${active ? "text-blue-50" : "text-slate-400"}`}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9ff]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>The communication layer</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                One conversation.
                <br />A complete next step.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Vektiss connects the moment a customer calls to the action your business needs next.
              </p>
              <div className="mt-8 hidden lg:block">
                <BookingCta label="See It in Your Business" />
              </div>
            </div>
            <div className="relative rounded-3xl border border-blue-200 bg-white p-5 shadow-[0_30px_80px_-35px_rgba(18,135,247,.45)] sm:p-8">
              <div className="absolute top-1/2 left-10 right-10 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent max-sm:hidden" />
              <div className="relative grid gap-3 sm:grid-cols-5">
                {[
                  { n: "01", icon: PhoneCall, text: "Customer calls" },
                  { n: "02", icon: Bot, text: "Vektiss answers" },
                  { n: "03", icon: MessageSquareText, text: "Need identified" },
                  { n: "04", icon: RouteIcon, text: "Next step routed" },
                  { n: "05", icon: UserRoundCheck, text: "Team gets context" },
                ].map(({ n, icon: Icon, text }, index) => (
                  <div
                    key={n}
                    className="relative rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
                  >
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-300">
                      {n}
                    </span>
                    <div className="mx-auto mt-3 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#1287f7]">
                      <Icon className="size-5" />
                    </div>
                    <p className="mt-3 text-sm font-bold leading-tight">{text}</p>
                    {index < 4 ? (
                      <ChevronRight className="absolute top-1/2 -right-3 z-10 hidden size-5 -translate-y-1/2 text-blue-400 sm:block" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 pt-9 sm:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(18,135,247,.28),transparent_55%)]" />
              <div className="relative">
                <Eyebrow light>Live system</Eyebrow>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Coverage that feels built in—not bolted on.
                </h3>
              </div>
              <img
                src={phoneCutout}
                alt="Vektiss Voice handling a live business call"
                className="relative mx-auto mt-6 w-full max-w-md drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <Eyebrow>Built for your operation</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                We don&apos;t hand you an AI tool.
                <br />
                <span className="text-[#1287f7]">We build it around your business.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Your customers, services, routing rules, FAQs, and next steps are different. Vektiss
                Voice is configured around the way your team actually works.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Your actual call flow",
                  "Your services and FAQs",
                  "Your routing rules",
                  "Your customer experience",
                  "Your qualification logic",
                  "Your escalation paths",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 font-semibold"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Check className="size-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-slate-950 p-5 text-white">
                <Workflow className="size-8 shrink-0 text-blue-300" />
                <p className="font-bold">We build it. We manage it. Your team gets the leverage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>After the call</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              When the call ends, the work doesn&apos;t have to.
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Every conversation can trigger a clear operational next step.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            {[
              {
                icon: MessageSquareText,
                title: "Capture",
                copy: "The reason for the call and the information your team needs.",
              },
              {
                icon: RouteIcon,
                title: "Route",
                copy: "Transfer, schedule, send information, or escalate using your rules.",
              },
              {
                icon: CalendarCheck,
                title: "Continue",
                copy: "Your team receives context and knows exactly what happens next.",
              },
            ].map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className="group grid gap-4 border-t border-slate-200 py-7 sm:grid-cols-[70px_1fr_1fr] sm:items-center"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#1287f7] shadow-sm transition group-hover:bg-[#1287f7] group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-2xl font-extrabold">
                  <span className="mr-3 text-sm text-slate-300">0{index + 1}</span>
                  {title}
                </h3>
                <p className="leading-relaxed text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="rounded-[2rem] border border-slate-200 bg-[#f5f9ff] p-6 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <Eyebrow>Proof in your own business</Eyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Don&apos;t take our word for it.
                  <br />
                  <span className="text-[#1287f7]">Put Vektiss on your phones for 7 days.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Let Vektiss Voice handle real calls from real customers inside your actual
                  operation. Experience it before deciding whether to keep it.
                </p>
                <div className="mt-8">
                  <BookingCta />
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  ["Day 1", "We map your real call flow."],
                  ["Days 2–3", "Vektiss is configured around your business."],
                  ["Days 4–7", "Real calls reveal what your team has been missing."],
                ].map(([day, copy], i) => (
                  <div
                    key={day}
                    className="flex gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1287f7] text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-extrabold">{day}</p>
                      <p className="mt-1 text-sm text-slate-500">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                quote:
                  "“Vektiss Voice answers our calls 24/7, collects quote requests, and takes pressure off our team.”",
                company: "Kairos Security",
              },
              {
                quote:
                  "“Customers can call anytime and get the help they need. Communication is smoother and our shop stays focused.”",
                company: "J&J Elite Auto Repair",
              },
            ].map(({ quote, company }) => (
              <figure
                key={company}
                className="rounded-3xl border border-white/10 bg-white/[.05] p-7 sm:p-9"
              >
                <Sparkles className="size-6 text-blue-300" />
                <blockquote className="mt-8 text-xl leading-relaxed font-semibold">
                  {quote}
                </blockquote>
                <figcaption className="mt-7 text-sm font-bold text-blue-300">
                  — {company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1287f7] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <ShieldCheck className="mx-auto size-10 text-blue-100" />
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Your business shouldn&apos;t depend on somebody being available at exactly the right
            moment.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-50">
            Every call answered. Every opportunity moved forward. Built around your business and
            managed for you.
          </p>
          <div className="mt-9">
            <BookingCta dark />
          </div>
          <p className="mt-5 text-sm font-semibold text-blue-100">
            Experience it in your business before deciding whether to keep it.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-9 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <img src={vektissLogo} alt="Vektiss" className="mx-auto h-7 w-auto" />
          <p className="mt-5">
            © {new Date().getFullYear()} Vektiss Technologies ·{" "}
            <Link to="/terms" className="underline underline-offset-4">
              Terms
            </Link>{" "}
            ·{" "}
            <Link to="/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed">
            This website is not affiliated with, endorsed by, or sponsored by Facebook or Meta
            Platforms, Inc.
          </p>
          <button
            type="button"
            onClick={() => {
              const code = window.prompt("Enter access code");
              if (code?.trim().toUpperCase() === "VEKTISS2026") {
                sessionStorage.setItem("vektiss_admin_code", "VEKTISS2026");
                location.href = "/admin";
              }
            }}
            className="mt-5 text-xs text-slate-300"
          >
            vk
          </button>
        </div>
      </footer>
    </main>
  );
}
