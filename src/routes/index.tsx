import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ApplyDialog } from "@/components/ApplyDialog";
import { Hl, Mark, Uline } from "@/components/Emphasis";

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
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "bg-secondary/60 border-y border-border" : ""}>
      <div className="mx-auto max-w-3xl px-6 py-20">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        {title ? (
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
        ) : null}
        <div className="mt-6 space-y-5 text-xl leading-[1.7] font-medium text-foreground/90">
          {children}
        </div>
      </div>
    </section>
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
    node: (
      <span>
        You run an <Hl>established service business</Hl> with consistent calls and leads.
      </span>
    ),
  },
  {
    key: "f2",
    node: (
      <span>
        You're tired of watching valuable opportunities <Hl>disappear</Hl> due to missed calls or
        slow follow-ups.
      </span>
    ),
  },
  {
    key: "f3",
    node: (
      <span>
        You want to scale your business but feel constrained by the{" "}
        <Hl>limits of human availability</Hl>.
      </span>
    ),
  },
  {
    key: "f4",
    node: (
      <span>
        You value <Hl>peace of mind</Hl> and want to trust that your business runs efficiently even
        when you're not present.
      </span>
    ),
  },
  {
    key: "f5",
    node: (
      <span>
        You're looking for a <Hl>comprehensive solution</Hl>, not just another piece of software to
        figure out.
      </span>
    ),
  },
  {
    key: "f6",
    node: (
      <span>
        You understand the <Hl>cost of a missed lead</Hl> is far greater than the cost of capturing
        it.
      </span>
    ),
  },
];

const NOT_FOR = [
  { key: "n1", node: "Businesses that are just starting out and don't yet have consistent demand." },
  {
    key: "n2",
    node: "Owners who prefer to personally handle every single customer interaction 24/7.",
  },
  { key: "n3", node: "Companies looking for a quick fix without integrating a long-term system." },
  {
    key: "n4",
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
          <span className="font-mono text-sm font-medium tracking-[0.2em] uppercase">Vektiss</span>
          <button
            type="button"
            onClick={openForm}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
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

      <Section eyebrow="The gilded cage">
        <p>
          You built this business from the ground up. You worked tirelessly to create demand, to get
          the phone ringing, to see those leads come in. But lately,{" "}
          <Mark>that success feels less like freedom and more like a gilded cage</Mark>. Every time
          you try to step away, even for a moment,
          the nagging worry sets in: "Who's calling? Did we miss that one? Is revenue slipping
          through the cracks while I'm gone?" You're doing everything right to generate
          opportunities, but the systems (or lack thereof) feel like they're holding you back,
          forcing you to stay chained to your desk, constantly monitoring, constantly overseeing.
        </p>
        <p>
          You know the demand is there. The calls are coming in. But you also know your team is
          stretched thin, the office closes, and even the most dedicated person{" "}
          <Hl>can't be available 24/7</Hl>. So, you find yourself making an{" "}
          <Hl>impossible choice</Hl>: either constantly micromanage
          every interaction, or accept that a percentage of those hard-earned opportunities will
          simply vanish. It's a frustrating cycle, where growth seems to create more chaos than
          confidence.
        </p>
      </Section>

      <Section eyebrow="The problem" title="Here Is What Nobody Is Telling You" tinted>
        <p>
          The biggest myth in business growth is that demand automatically translates to revenue. It
          doesn't. Not if your infrastructure isn't ready for it. You're probably assuming a serious
          lead will leave a voicemail, wait for a callback, or try again later. The harsh truth?
          Most won't. They call the next business that answers immediately. You're treating every
          missed call or slow follow-up as a "delayed opportunity," but the reality is, many of them
          are lost opportunities, walking straight into your competitor's arms.
        </p>
        <p>
          You've invested in marketing, built a great team, and established your reputation. Yet,
          your potential for growth is being capped, not by lack of demand, but by limitations in
          human availability. Whether it's after-hours, weekends, or simply when your team is
          swamped, every unanswered call or delayed response is a direct hit to your bottom line,
          and more importantly, to your peace of mind.
        </p>
      </Section>

      <Section eyebrow="Why this is different" title="Why This Time Is Different">
        <p>
          Most solutions out there give you tools and then expect you to become an expert in
          building and managing complex systems. They hand you the pieces and wish you luck. But
          what you need isn't just another piece of software; you need a fully integrated, always-on
          communication system that works for your business, not the other way around.
        </p>
        <p>
          Vektiss doesn't just provide software. We build, customize, and manage an AI communication
          system tailored to how your business already operates. This isn't about replacing your
          team; it's about empowering them and extending your reach far beyond human limitations. We
          ensure your business is equipped to capture more serious opportunities without requiring
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

      <section>
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Who this is for</p>
            <h2 className="mb-8 text-4xl font-bold">Who This Is For</h2>
            <div className="[&_ul]:grid-cols-1">
              <CheckList items={FOR} />
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Who this is not for</p>
            <h2 className="mb-8 text-4xl font-bold">Who This Is Not For</h2>
            <div className="[&_ul]:grid-cols-1">
              <CheckList items={NOT_FOR} tone="no" />
            </div>
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
              <figure key={i} className="surface-card flex flex-col gap-4 p-6">
                <div className="size-12 rounded-full bg-muted" aria-hidden />
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
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="mb-8 text-4xl font-bold sm:text-5xl">Objection Handling</h2>
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
              We are confident in our ability to transform your lead capture. If, after 60 days of
              full system implementation, you don't see a measurable improvement in lead capture or
              response efficiency, we'll work with you until you do, or provide a full refund.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-2xl leading-relaxed font-semibold text-background sm:text-3xl">
            Stop leaving money on the table. Every moment you wait is another high-value client
            going to your competition.
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
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-xl leading-relaxed font-medium text-foreground/90">
            The true cost of inaction isn't just the leads you're losing today; it's the compounding
            effect on your growth, your team's morale, and your personal freedom. If you do nothing,
            you risk staying trapped in the endless cycle of oversight, always wondering how much
            money is being lost while you're not personally watching. Vektiss offers a path to truly
            enjoying the business you built, knowing it's equipped to handle every opportunity,
            every call, every lead, 24/7. Don't let your biggest asset—your demand—become your
            biggest burden.
          </p>
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
