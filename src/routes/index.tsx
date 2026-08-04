import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  CalendarX,
  Clock,
  DollarSign,
  Layers,
  Lock,
  Moon,
  PhoneMissed,
  ShieldCheck,
  Sprout,
  User,
  Users,
  Zap,
} from "lucide-react";
import { ApplyDialog } from "@/components/ApplyDialog";
import { Hl, Mark, Uline } from "@/components/Emphasis";
import vektissLogo from "@/assets/vektiss-logo.png.asset.json";

const TITLE = "Vektiss Voice — Capture Every Serious Lead, 24/7";
const DESCRIPTION =
  "A custom AI communication system that answers calls 24/7, qualifies leads, and books appointments — so your service business keeps growing without constant oversight.";

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

function Cta({
  label = "Apply Now",
  block = false,
  onClick,
}: {
  label?: string;
  block?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-glow inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold ${block ? "w-full sm:w-auto" : ""}`}
    >
      {label}
    </button>
  );
}

function Section({
  eyebrow,
  title,
  children,
  tinted = false,
  tone = "plain",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  tinted?: boolean;
  tone?: "plain" | "accent" | "dark";
}) {
  const toneClass =
    tone === "dark"
      ? "invert-surface border-y border-white/10"
      : tone === "accent"
        ? "accent-band border-y border-primary/15"
        : tinted
          ? "bg-secondary/60 border-y border-border"
          : "";
  return (
    <section className={toneClass}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          {title ? (
            <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h2>
          ) : null}
          <span
            aria-hidden
            className="mt-6 block h-1 w-16 rounded-full bg-primary"
          />
        </div>
        <div className="max-w-2xl space-y-8 text-xl leading-[1.65] font-medium text-foreground/90">
          {children}
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-2 border-y border-border/70 py-6 font-display text-2xl leading-[1.25] font-extrabold tracking-tight text-foreground sm:text-3xl">
      {children}
    </p>
  );
}

function Callouts({ items }: { items: { k: string; label: string; node: React.ReactNode }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-border sm:grid-cols-3">
      {items.map((i, idx) => (
        <div key={i.k} className="bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow text-primary">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px flex-1 bg-border" />
          </div>
          <p className="eyebrow mb-2 text-muted-foreground">{i.label}</p>
          <p className="text-lg leading-snug font-semibold text-foreground">{i.node}</p>
        </div>
      ))}
    </div>
  );
}

function PremiumIconCard({
  icon: Icon,
  label,
  title,
  description,
  tone = "muted",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  tone?: "muted" | "accent" | "dark";
}) {
  const toneStyles = {
    muted: {
      card: "bg-card border-border",
      icon: "text-foreground/45",
      rule: "bg-border",
      label: "text-muted-foreground",
      title: "text-foreground",
      desc: "text-muted-foreground",
    },
    accent: {
      card: "bg-card border-border",
      icon: "text-primary",
      rule: "bg-primary/25",
      label: "text-primary",
      title: "text-foreground",
      desc: "text-muted-foreground",
    },
    dark: {
      card: "bg-ink border-white/10",
      icon: "text-primary",
      rule: "bg-white/12",
      label: "text-primary-foreground/50",
      title: "text-primary-foreground",
      desc: "text-primary-foreground/65",
    },
  };
  const t = toneStyles[tone];
  return (
    <div className={`group rounded-[var(--radius-2xl)] border p-6 transition-colors ${t.card}`}>
      <div className="mb-5 flex items-center gap-3">
        <Icon className={`size-[18px] shrink-0 ${t.icon}`} strokeWidth={1.25} />
        <span aria-hidden className={`h-px flex-1 ${t.rule}`} />
        {label ? (
          <span className={`eyebrow text-[0.7rem] ${t.label}`}>{label}</span>
        ) : null}
      </div>
      <h3 className={`text-xl font-bold tracking-tight ${t.title}`}>{title}</h3>
      <p className={`mt-2 text-base leading-snug ${t.desc}`}>{description}</p>
    </div>
  );
}

function CheckList({
  items,
  tone = "yes",
}: {
  items: { key: string; node: React.ReactNode }[];
  tone?: "yes" | "no";
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.key}
          className="surface-card flex gap-3 p-4 text-lg font-medium text-foreground"
        >
          <span
            aria-hidden
            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              tone === "yes"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {tone === "yes" ? "✓" : "×"}
          </span>
          {item.node}
        </li>
      ))}
    </ul>
  );
}

function QualifierCard({
  mode,
  eyebrow,
  title,
  items,
}: {
  mode: "for" | "not-for";
  eyebrow: string;
  title: string;
  items: { key: string; icon: React.ReactNode; node: React.ReactNode }[];
}) {
  const isFor = mode === "for";
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-2xl)] border p-6 sm:p-8 ${
        isFor
          ? "border-primary/20 bg-card shadow-[var(--shadow-soft)]"
          : "border-destructive/30 bg-ink text-background"
      }`}
    >
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span
            aria-hidden
            className={`h-px w-8 ${isFor ? "bg-primary" : "bg-background/40"}`}
          />
          <p className={`eyebrow ${isFor ? "" : "text-background/60"}`}>{eyebrow}</p>
        </div>
        <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h3>
      </div>
      <ul className={`grid ${isFor ? "divide-y divide-border" : "divide-y divide-background/10"}`}>
        {items.map((item, i) => (
          <li key={item.key} className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
            <span
              aria-hidden
              className={`mt-1 flex shrink-0 items-center gap-2 font-mono text-[0.7rem] tracking-widest ${
                isFor ? "text-primary" : "text-background/40"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-lg leading-snug font-medium ${
                isFor ? "text-foreground" : "text-background/85"
              }`}
            >
              {item.node}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const AFTER = [
  {
    key: "a1",
    node: (
      <span>
        Confidently leave the office knowing <Hl>every serious lead</Hl> is being qualified and
        captured.
      </span>
    ),
  },
  {
    key: "a2",
    node: (
      <span>
        Focus on <Hl>strategic growth</Hl> and high-level decisions, not chasing missed calls or
        checking voicemails.
      </span>
    ),
  },
  {
    key: "a3",
    node: (
      <span>
        Experience <Hl>genuine relief</Hl> that your business operates efficiently even when you're
        not personally watching it.
      </span>
    ),
  },
  {
    key: "a4",
    node: (
      <span>
        Take time off with family and friends <Hl>without the nagging fear</Hl> of lost revenue.
      </span>
    ),
  },
  {
    key: "a5",
    node: (
      <span>
        See an <Hl>immediate boost in captured opportunities</Hl> that would have otherwise gone to
        voicemail or a competitor.
      </span>
    ),
  },
  {
    key: "a6",
    node: (
      <span>
        <Hl>Empower your team</Hl> by offloading repetitive tasks, letting them focus on what they
        do best.
      </span>
    ),
  },
  {
    key: "a7",
    node: (
      <span>
        <Hl>Scale your operations</Hl> without the immediate pressure of hiring more full-time staff
        for communication.
      </span>
    ),
  },
  {
    key: "a8",
    node: (
      <span>
        Trust that your investment in marketing is finally yielding its <Hl>full potential</Hl>.
      </span>
    ),
  },
  {
    key: "a9",
    node: (
      <span>
        <Hl>Enjoy the business you built</Hl>, rather than feeling trapped by its constant demands.
      </span>
    ),
  },
  {
    key: "a10",
    node: (
      <span>
        Sleep soundly at night, knowing your business <Hl>never misses a beat</Hl>, even when you
        are.
      </span>
    ),
  },
];

const FOR = [
  {
    key: "f1",
    icon: <Building2 size={20} strokeWidth={2} />,
    node: (
      <span>
        You run an <Hl>established service business</Hl> with consistent calls and leads.
      </span>
    ),
  },
  {
    key: "f2",
    icon: <PhoneMissed size={20} strokeWidth={2} />,
    node: (
      <span>
        You're tired of watching valuable opportunities <Hl>disappear</Hl> due to missed calls or
        slow follow-ups.
      </span>
    ),
  },
  {
    key: "f3",
    icon: <Clock size={20} strokeWidth={2} />,
    node: (
      <span>
        You want to scale your business but feel constrained by the{" "}
        <Hl>limits of human availability</Hl>.
      </span>
    ),
  },
  {
    key: "f4",
    icon: <ShieldCheck size={20} strokeWidth={2} />,
    node: (
      <span>
        You value <Hl>peace of mind</Hl> and want to trust that your business runs efficiently even
        when you're not present.
      </span>
    ),
  },
  {
    key: "f5",
    icon: <Layers size={20} strokeWidth={2} />,
    node: (
      <span>
        You're looking for a <Hl>comprehensive solution</Hl>, not just another piece of software to
        figure out.
      </span>
    ),
  },
  {
    key: "f6",
    icon: <DollarSign size={20} strokeWidth={2} />,
    node: (
      <span>
        You understand the <Hl>cost of a missed lead</Hl> is far greater than the cost of capturing
        it.
      </span>
    ),
  },
];

const NOT_FOR = [
  {
    key: "n1",
    icon: <Sprout size={20} strokeWidth={2} />,
    node: "Businesses that are just starting out and don't yet have consistent demand.",
  },
  {
    key: "n2",
    icon: <User size={20} strokeWidth={2} />,
    node: "Owners who prefer to personally handle every single customer interaction 24/7.",
  },
  {
    key: "n3",
    icon: <Zap size={20} strokeWidth={2} />,
    node: "Companies looking for a quick fix without integrating a long-term system.",
  },
  {
    key: "n4",
    icon: <Lock size={20} strokeWidth={2} />,
    node: "Those unwilling to adapt current processes to leverage advanced AI capabilities.",
  },
];

const FAQS = [
  {
    q: "Will this replace my existing staff?",
    a: (
      <>
        Our goal is to <Hl>empower your team, not replace them</Hl>. Vektiss handles the initial
        capture, qualification, and follow-up, freeing your staff to focus on high-value
        conversations and closing deals. It <Hl>extends your capacity</Hl> without adding immediate
        payroll.
      </>
    ),
  },
  {
    q: "Is this just another chatbot?",
    a: (
      <>
        <Hl>No.</Hl> While it includes chat capabilities, Vektiss builds a{" "}
        <Hl>full-spectrum AI communication system</Hl> integrated across phone, text, and email.
        It's an intelligent, adaptive system that learns from your business, not a generic, scripted
        bot.
      </>
    ),
  },
  {
    q: "How long does setup take and what's involved?",
    a: (
      <>
        <Hl>We handle everything.</Hl> After an initial deep dive into your operations, our team
        custom-builds and integrates your AI system. We monitor, optimize, and provide{" "}
        <Hl>ongoing support</Hl>, ensuring seamless operation and continuous improvement.
      </>
    ),
  },
];

const STEPS = [
  {
    n: "Step 1",
    t: 'Click "Apply Now" and tell us about your business.',
    d: (
      <>
        Share some details about your <Hl>current lead flow</Hl>, challenges, and goals through our
        simple form.
      </>
    ),
  },
  {
    n: "Step 2",
    t: "We'll schedule a personalized demo.",
    d: (
      <>
        See firsthand how a custom Vektiss AI system integrates with your operations and starts{" "}
        <Hl>capturing your missed opportunities</Hl>.
      </>
    ),
  },
  {
    n: "Step 3",
    t: "Launch your custom AI system.",
    d: (
      <>
        Begin experiencing the freedom and confidence of a business that{" "}
        <Hl>never misses a lead</Hl>, allowing you to scale without constant personal oversight.
      </>
    ),
  },
];

function Funnel() {
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ApplyDialog open={open} onOpenChange={setOpen} />
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" aria-label="Vektiss home" className="flex items-center">
            <img src={vektissLogo.url} alt="Vektiss" className="h-8 w-auto sm:h-9" />
          </a>
          <button
            type="button"
            onClick={openForm}
            className="btn-glow rounded-full px-5 py-2 text-sm font-semibold"
          >
            Apply Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-foreground/85 sm:text-xl">
            For <Hl>established service businesses</Hl> with consistent calls and leads who want the
            freedom to step away from their business without worrying about missed opportunities.
          </p>
          <h1 className="mt-8 text-5xl leading-[1.05] font-extrabold sm:text-7xl">
            Stop Feeling Trapped By Your Success:{" "}
            <span className="text-primary">
              How Established Service Businesses Capture Every Serious Lead
            </span>{" "}
            And Scale Confidently Without Constant Oversight
          </h1>
          <div className="surface-card mx-auto mt-10 max-w-3xl overflow-hidden p-0">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
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
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed font-medium text-foreground/90 sm:text-2xl">
            Discover the custom AI communication system that{" "}
            <Mark>answers calls 24/7, qualifies leads, and books appointments</Mark>, so your
            business keeps growing even when you're not personally there to watch it.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Cta onClick={openForm} />
            <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
              Managed implementation · Custom workflow design · Ongoing optimization
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="The gilded cage" title="You Built The Demand. Now It Owns You.">
        <p className="dropcap lead-para">
          You built this business from the ground up. You worked tirelessly to create demand, to get
          the phone ringing, to see those leads come in. But lately,{" "}
          <Mark>that success feels less like freedom and more like a gilded cage</Mark>.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <PremiumIconCard
            icon={PhoneMissed}
            label="The worry"
            title={"\"Who's calling?\""}
            description="Did we miss that one? Is a serious lead going to the competitor who answers first?"
            tone="dark"
          />
          <PremiumIconCard
            icon={Clock}
            label="The leak"
            title="After-hours drift"
            description="Revenue slips through the cracks the moment you step away from your desk."
            tone="dark"
          />
          <PremiumIconCard
            icon={Lock}
            label="The trap"
            title="Chained to the business"
            description="Systems (or lack thereof) force you to stay constantly monitoring, constantly overseeing."
            tone="dark"
          />
        </div>

        <p className="rule-accent">
          Every time you try to step away, even for a moment, the nagging worry sets in. You're doing
          everything right to generate opportunities, but the systems feel like they're holding you back.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="surface-card border-l-4 border-primary p-5">
            <p className="eyebrow mb-2">Option A</p>
            <h3 className="text-2xl font-bold tracking-tight">Micromanage everything</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Stay glued to every call, every follow-up, every interaction — forever.
            </p>
          </div>
          <div className="surface-card border-l-4 border-destructive/70 p-5">
            <p className="eyebrow mb-2">Option B</p>
            <h3 className="text-2xl font-bold tracking-tight">Let opportunities vanish</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Accept that a percentage of hard-earned leads simply disappear into thin air.
            </p>
          </div>
        </div>

        <PullQuote>
          Either constantly micromanage every interaction — or accept that a percentage of those
          hard-earned opportunities will simply vanish.
        </PullQuote>

        <p>
          You know the demand is there. The calls are coming in. But you also know your team is
          stretched thin, the office closes, and even the most dedicated person{" "}
          <Hl>can't be available 24/7</Hl>. So, you find yourself making an{" "}
          <Hl>impossible choice</Hl>. It's a frustrating cycle, where growth seems to create more chaos
          than confidence.
        </p>
      </Section>

      <Section eyebrow="The problem" title="Here Is What Nobody Is Telling You" tone="dark">
        <p className="lead-para">
          The biggest myth in business growth is that{" "}
          <Uline>demand automatically translates to revenue</Uline>. <Hl>It doesn't.</Hl> Not if
          your infrastructure isn't ready for it. You're probably assuming a serious
          lead will leave a voicemail, wait for a callback, or try again later. The harsh truth?
          <Hl> Most won't.</Hl> They call the next business that answers immediately. You're
          treating every missed call or slow follow-up as a "delayed opportunity," but the reality
          is, many of them are{" "}
          <Mark>lost opportunities walking straight into your competitor's arms.</Mark>
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <PremiumIconCard
            icon={Moon}
            label="After hours"
            title="Nobody answers."
            description="They call the next business. Your empty office becomes a silent opportunity drain."
            tone="accent"
          />
          <PremiumIconCard
            icon={Users}
            label="Team swamped"
            title="Slow follow-up"
            description="Slow follow-up reads as no follow-up. Perception is reality for a serious lead."
            tone="accent"
          />
          <PremiumIconCard
            icon={CalendarX}
            label="Weekends"
            title="Demand keeps arriving"
            description="Demand keeps arriving. Capacity doesn't. Every closed day costs you."
            tone="accent"
          />
        </div>
        <p>
          You've invested in marketing, built a great team, and established your reputation. Yet,
          your potential for growth is being capped, <Hl>not by lack of demand</Hl>, but by{" "}
          <Hl>limitations in human availability</Hl>. Whether it's after-hours, weekends, or simply
          when your team is swamped, every unanswered call or delayed response is a direct hit to
          your bottom line, and more importantly, to your peace of mind.
        </p>
      </Section>

      <Section eyebrow="Why this is different" title="Why This Time Is Different" tone="accent">
        <p className="lead-para">
          Most solutions out there give you tools and then expect you to become an expert in
          building and managing complex systems. They hand you the pieces and wish you luck. But
          what you need isn't just another piece of software; you need a{" "}
          <Uline>fully integrated, always-on communication system</Uline> that works for your
          business, not the other way around.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <PremiumIconCard
            icon={Layers}
            label="Most tools"
            title="Hand you the pieces"
            description="You become the expert, builder, and manager — while still running the business."
          />
          <PremiumIconCard
            icon={Zap}
            label="Vektiss"
            title="Builds the machine for you"
            description="Custom system, fully managed, tailored to how you already operate."
            tone="accent"
          />
        </div>

        <PullQuote>
          Vektiss doesn't just provide software. We build, customize, and manage the system.
        </PullQuote>

        <div className="grid gap-4 sm:grid-cols-3">
          <PremiumIconCard
            icon={Layers}
            label="Tailored"
            title="Tailored to you"
            description="An AI communication system built around your existing workflows."
          />
          <PremiumIconCard
            icon={User}
            label="Empowering"
            title="Empowers your team"
            description={
              <>
                Not replacing people — <Mark>extending their reach beyond human limitations</Mark>.
              </>
            }
          />
          <PremiumIconCard
            icon={ShieldCheck}
            label="Reliable"
            title="Always-on coverage"
            description="Capture serious opportunities without requiring 24/7 availability."
          />
        </div>

        <p className="rule-accent">
          We ensure your business is equipped to capture more serious opportunities without requiring
          you or your team to be available around the clock. This means your business finally aligns
          with the demand you've worked so hard to create, giving you the freedom to step away
          knowing your leads are always handled.
        </p>
      </Section>

      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="eyebrow mb-4">After Vektiss</p>
          <h2 className="mb-8 text-4xl font-bold sm:text-5xl">What Your Life Looks Like After</h2>
          <CheckList items={AFTER} />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-4 text-center">Qualification</p>
          <h2 className="mx-auto mb-16 max-w-3xl text-center text-4xl font-bold leading-[1.05] sm:text-5xl">
            Who This Is For — And Who Should Pass
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <QualifierCard
              mode="for"
              eyebrow="You're a fit"
              title="This Is For You If..."
              items={FOR}
            />
            <QualifierCard
              mode="not-for"
              eyebrow="Not a fit"
              title="This Is Not For You If..."
              items={NOT_FOR}
            />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="mb-8 text-4xl font-bold sm:text-5xl">Results From Real Businesses</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <figure key={i} className="surface-card flex flex-col gap-5 p-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-primary" />
                  <span className="eyebrow">{String(i).padStart(2, "0")}</span>
                </div>
                <blockquote className="text-lg leading-relaxed font-medium text-foreground/90">
                  [Insert client result or testimonial #{i} here — focus on quantifiable results
                  like increased captured leads, improved response times, or specific revenue
                  recovery.]
                </blockquote>
                <figcaption className="text-base text-muted-foreground">
                  Name, Title — Company
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="mb-8 text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="surface-card p-6">
                <h3 className="text-xl font-semibold">{f.q}</h3>
                <p className="mt-3 text-lg leading-relaxed font-medium text-foreground/90">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="eyebrow mb-4">Next steps</p>
          <h2 className="mb-10 text-4xl font-bold sm:text-5xl">Here Is Exactly What Happens Next</h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="surface-card p-6">
                <span className="eyebrow">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-lg leading-relaxed font-medium text-foreground/90">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GUARANTEE */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="surface-card border-primary/30 p-8 text-center">
            <p className="eyebrow mb-4">The guarantee</p>
            <p className="text-xl leading-relaxed font-medium text-foreground/90">
              We are confident in our ability to transform your lead capture. If, after{" "}
              <Hl>60 days</Hl> of full system implementation, you don't see a measurable improvement
              in lead capture or response efficiency,{" "}
              <Mark>we'll work with you until you do, or provide a full refund</Mark>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-2xl leading-relaxed font-semibold text-background sm:text-3xl">
            Stop leaving money on the table. Every moment you wait is another{" "}
            <span className="uline-hl text-background">high-value client</span> going to{" "}
            <span className="font-bold text-primary">your competition</span>.
          </p>
          <div className="mt-8">
            <Cta onClick={openForm} />
          </div>
          <p className="mt-6 text-lg text-background/70">
            Don't let your hard-earned demand turn into missed opportunities.
          </p>
        </div>
      </section>

      {/* URGENCY */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="eyebrow mb-6">The cost of waiting</p>
          <p className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-4xl">
            The true cost of inaction isn't just the leads you're losing today.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p className="rule-accent text-xl leading-[1.65] font-medium text-foreground/90">
              It's the compounding effect on your growth, your team's morale, and{" "}
              <Hl>your personal freedom</Hl>. If you do nothing, you risk staying trapped in the
              endless cycle of oversight, always wondering how much money is being lost while
              you're not personally watching.
            </p>
            <p className="rule-accent text-xl leading-[1.65] font-medium text-foreground/90">
              Vektiss offers a path to truly enjoying the business you built, knowing it's equipped
              to handle <Hl>every opportunity, every call, every lead, 24/7</Hl>. Don't let{" "}
              <Mark>your biggest asset—your demand—become your biggest burden</Mark>.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Cta onClick={openForm} />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-base text-muted-foreground">
        © {new Date().getFullYear()} Vektiss Technologies
      </footer>
    </main>
  );
}
