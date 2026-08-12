import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  BarChart3,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Flame,
  Mail,
  Phone,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/lib/supabase";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";

type Workflow = "New" | "Contacted" | "Consultation Booked" | "Won" | "Lost" | "Nurture";
type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  business_name: string | null;
  website: string | null;
  business_type: string | null;
  monthly_calls: string | null;
  client_value: string | null;
  challenge: string | null;
  challenge_other: string | null;
  timeline: string | null;
  investment_readiness: string | null;
  purchasing_authority: string | null;
  consultation_commitment: string | null;
  qualification_score: number | null;
  qualification_status: string | null;
  lead_source: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  follow_up_status: Workflow;
  admin_notes: string | null;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  deal_value: number | null;
};

const WORKFLOW: Workflow[] = ["New", "Contacted", "Consultation Booked", "Won", "Lost", "Nurture"];
const COLORS: Record<string, string> = {
  "Calendar Lead": "#8b5cf6",
  Qualified: "#1287f7",
  "Needs Review": "#f59e0b",
  "Not Currently Qualified": "#94a3b8",
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "CRM — Vektiss" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminCRM,
});

function AdminCRM() {
  const [session, setSession] = useState<Session | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem("vektiss_admin_code") === "VEKTISS2026");
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const loadLeads = useCallback(async () => {
    if (!session || !supabase) return;
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (queryError) setError(queryError.message);
    else setLeads((data ?? []) as Lead[]);
  }, [session]);
  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        const text = `${lead.name} ${lead.email} ${lead.phone} ${lead.business_name}`.toLowerCase();
        return (
          text.includes(query.toLowerCase()) &&
          (statusFilter === "All" || lead.follow_up_status === statusFilter)
        );
      }),
    [leads, query, statusFilter],
  );

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const qualified = leads.filter((l) => l.qualification_status === "Qualified").length;
    const won = leads.filter((l) => l.follow_up_status === "Won");
    return {
      total: leads.length,
      thisWeek: leads.filter((l) => new Date(l.created_at) >= weekAgo).length,
      qualified,
      conversion: leads.length ? Math.round((won.length / leads.length) * 100) : 0,
      pipeline: leads.reduce((sum, l) => sum + Number(l.deal_value ?? 0), 0),
    };
  }, [leads]);

  const volumeData = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        const key = date.toDateString();
        return {
          day: date.toLocaleDateString(undefined, { weekday: "short" }),
          leads: leads.filter((l) => new Date(l.created_at).toDateString() === key).length,
        };
      }),
    [leads],
  );
  const qualificationData = useMemo(
    () =>
      Object.keys(COLORS).map((name) => ({
        name,
        value: leads.filter((lead) =>
          name === "Calendar Lead"
            ? lead.qualification_status === null
            : lead.qualification_status === name,
        ).length,
      })),
    [leads],
  );

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await supabase?.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (result?.error) setError(result.error.message);
  }

  async function updateLead(id: string, patch: Partial<Lead>) {
    if (!supabase) return;
    const { error: updateError } = await supabase
      .from("leads")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
    setSelected((current) => (current?.id === id ? { ...current, ...patch } : current));
  }

  if (!unlocked)
    return <AccessGate onUnlock={() => setUnlocked(true)} error={error} setError={setError} />;
  if (!session && !loading) return <SignIn onSubmit={signIn} error={error} />;

  return (
    <div className="min-h-screen bg-[#f3f7fc] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-5">
            <Link to="/">
              <img src={vektissLogo} alt="Vektiss" className="h-8 w-auto" />
            </Link>
            <span className="hidden h-6 w-px bg-slate-200 sm:block" />
            <span className="hidden text-sm font-semibold text-slate-500 sm:block">
              Lead Intelligence CRM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 md:block">{session?.user.email}</span>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              onClick={() => supabase?.auth.signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#1287f7]">
              Command center
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Lead pipeline
            </h1>
            <p className="mt-2 text-slate-500">
              Track qualification, follow-up, bookings, and revenue in one place.
            </p>
          </div>
          <div className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Live · {leads.length} records
          </div>
        </div>
        {error ? (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Metric
            icon={Users}
            label="Total leads"
            value={stats.total.toString()}
            detail={`${stats.thisWeek} this week`}
          />
          <Metric
            icon={Flame}
            label="Qualified"
            value={stats.qualified.toString()}
            detail={`${stats.total ? Math.round((stats.qualified / stats.total) * 100) : 0}% of leads`}
          />
          <Metric
            icon={TrendingUp}
            label="Win rate"
            value={`${stats.conversion}%`}
            detail="Marked won"
          />
          <Metric
            icon={CircleDollarSign}
            label="Pipeline value"
            value={stats.pipeline.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
            detail="Tracked opportunities"
          />
          <Metric
            icon={CalendarClock}
            label="Follow-ups due"
            value={leads
              .filter((l) => l.next_follow_up_at && new Date(l.next_follow_up_at) <= new Date())
              .length.toString()}
            detail="Needs attention"
          />
        </section>
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ChartCard
            title="Lead volume"
            subtitle="New submissions over the last 7 days"
            icon={BarChart3}
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#eff6ff" }} />
                <Bar dataKey="leads" fill="#1287f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Lead quality" subtitle="Qualification breakdown" icon={Flame}>
            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={240}>
                <PieChart>
                  <Pie
                    data={qualificationData}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                  >
                    {qualificationData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {qualificationData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: COLORS[item.name] }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </section>
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold">All leads</h2>
              <p className="text-sm text-slate-500">
                Tap a lead to see answers and manage follow-up.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <Search className="size-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search leads…"
                  className="w-full bg-transparent py-2.5 text-sm outline-none sm:w-56"
                />
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold"
              >
                <option>All</option>
                {WORKFLOW.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="divide-y divide-slate-100 md:hidden">
            {filtered.map((lead) => (
              <button
                type="button"
                key={lead.id}
                onClick={() => setSelected(lead)}
                className="w-full p-4 text-left transition active:bg-blue-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-bold">{lead.name}</div>
                    <div className="mt-0.5 truncate text-sm text-slate-500">
                      {lead.business_name ?? "Pre-calendar contact"}
                    </div>
                  </div>
                  <ChevronRight className="mt-1 size-5 shrink-0 text-slate-400" />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={lead.qualification_status} />
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {lead.follow_up_status}
                  </span>
                  {lead.qualification_score !== null ? (
                    <span className="text-xs font-semibold text-slate-500">
                      Score {lead.qualification_score}/23
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Timeline
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-700">
                      {lead.timeline ?? "Scheduling started"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Submitted
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-700">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Lead</th>
                  <th className="px-4 py-3">Qualification</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Timeline</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className="cursor-pointer border-t border-slate-100 transition hover:bg-blue-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold">{lead.name}</div>
                      <div className="mt-0.5 text-slate-500">
                        {lead.business_name ?? "Pre-calendar contact"} · {lead.email}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={lead.qualification_status} />
                      {lead.qualification_score !== null ? (
                        <div className="mt-1 text-xs text-slate-500">
                          Score {lead.qualification_score}/23
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                        {lead.follow_up_status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {lead.timeline ?? "Scheduling started"}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="size-4 text-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && filtered.length === 0 ? (
            <p className="p-12 text-center text-slate-500">No leads match these filters.</p>
          ) : null}
        </section>
      </main>
      {selected ? (
        <LeadPanel lead={selected} onClose={() => setSelected(null)} onUpdate={updateLead} />
      ) : null}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-blue-50 p-2.5 text-[#1287f7]">
          <Icon className="size-5" />
        </div>
        <span className="text-xs font-semibold text-slate-400">{detail}</span>
      </div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}
function ChartCard({
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2 text-[#1287f7]">
          <Icon className="size-4" />
        </div>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
function StatusBadge({ status }: { status: string | null }) {
  const label = status ?? "Calendar Lead";
  const style =
    status === "Qualified"
      ? "bg-blue-100 text-blue-700"
      : status === "Needs Review"
        ? "bg-amber-100 text-amber-700"
        : status === null
          ? "bg-violet-100 text-violet-700"
          : "bg-slate-100 text-slate-600";
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>{label}</span>;
}

function LeadPanel({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => Promise<void>;
}) {
  const [notes, setNotes] = useState(lead.admin_notes ?? "");
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#1287f7]">
              Lead record
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">{lead.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={lead.qualification_status} />
            {lead.qualification_score !== null ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                Score {lead.qualification_score}/23
              </span>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-3 rounded-xl bg-[#1287f7] p-4 font-bold text-white"
            >
              <Mail className="size-5" />
              Email lead
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 font-bold"
            >
              <Phone className="size-5" />
              Call {lead.phone}
            </a>
          </div>
          <PanelSection title="Pipeline management">
            <label className="text-sm font-semibold text-slate-600">
              Stage
              <select
                value={lead.follow_up_status}
                onChange={(e) =>
                  void onUpdate(lead.id, {
                    follow_up_status: e.target.value as Workflow,
                    last_contacted_at:
                      e.target.value === "Contacted"
                        ? new Date().toISOString()
                        : lead.last_contacted_at,
                  })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-slate-950"
              >
                {WORKFLOW.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-600">
                Next follow-up
                <input
                  type="datetime-local"
                  defaultValue={lead.next_follow_up_at?.slice(0, 16) ?? ""}
                  onBlur={(e) =>
                    void onUpdate(lead.id, {
                      next_follow_up_at: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-slate-950"
                />
              </label>
              <label className="text-sm font-semibold text-slate-600">
                Deal value
                <input
                  type="number"
                  min="0"
                  defaultValue={lead.deal_value ?? ""}
                  onBlur={(e) =>
                    void onUpdate(lead.id, {
                      deal_value: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="$0"
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-slate-950"
                />
              </label>
            </div>
          </PanelSection>
          <PanelSection title="Contact & business">
            <Info label="Email" value={lead.email} />
            <Info label="Phone" value={lead.phone} />
            <Info label="Business" value={lead.business_name ?? "Not collected"} />
            <Info label="Type" value={lead.business_type ?? "Not collected"} />
            <Info label="Website" value={lead.website ?? "Not provided"} />
            <Info label="Source" value={lead.utm_source || lead.lead_source || "Direct"} />
          </PanelSection>
          {lead.qualification_status !== null ? (
            <PanelSection title="Qualification answers">
              <Info label="Monthly calls/leads" value={lead.monthly_calls ?? "Not provided"} />
              <Info label="Typical client value" value={lead.client_value ?? "Not provided"} />
              <Info
                label="Biggest challenge"
                value={`${lead.challenge ?? "Not provided"}${lead.challenge_other ? ` — ${lead.challenge_other}` : ""}`}
              />
              <Info label="Timeline" value={lead.timeline ?? "Not provided"} />
              <Info
                label="Investment readiness"
                value={lead.investment_readiness ?? "Not provided"}
              />
              <Info
                label="Purchasing authority"
                value={lead.purchasing_authority ?? "Not provided"}
              />
              <Info
                label="Consultation commitment"
                value={lead.consultation_commitment ?? "Not provided"}
              />
            </PanelSection>
          ) : (
            <PanelSection title="Scheduling status">
              <Info label="Status" value="Contact captured · Calendly opened" />
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                This visitor reached the calendar, but the CRM does not yet confirm that an
                appointment was booked.
              </p>
            </PanelSection>
          )}
          <PanelSection title="Follow-up notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Add call notes, objections, next steps…"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#1287f7]"
            />
            <button
              onClick={() => void onUpdate(lead.id, { admin_notes: notes })}
              className="mt-3 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
            >
              Save notes
            </button>
          </PanelSection>
        </div>
      </aside>
    </div>
  );
}
function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 p-5">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      {children}
    </section>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="max-w-[65%] text-right text-sm font-semibold">{value}</span>
    </div>
  );
}

function AccessGate({
  onUnlock,
  error,
  setError,
}: {
  onUnlock: () => void;
  error: string;
  setError: (v: string) => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f7fc] px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const code = String(new FormData(e.currentTarget).get("code")).trim().toUpperCase();
          if (code === "VEKTISS2026") {
            sessionStorage.setItem("vektiss_admin_code", "VEKTISS2026");
            onUnlock();
            setError("");
          } else setError("Incorrect access code.");
        }}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl"
      >
        <img src={vektissLogo} alt="Vektiss" className="h-9 w-auto" />
        <h1 className="mt-7 text-2xl font-extrabold">CRM access</h1>
        <p className="mt-2 text-sm text-slate-500">Enter your private access code.</p>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <input
          name="code"
          type="password"
          required
          placeholder="Access code"
          className="mt-5 w-full rounded-xl border border-slate-200 p-3"
        />
        <button className="mt-3 w-full rounded-xl bg-[#1287f7] p-3 font-bold text-white">
          Continue
        </button>
      </form>
    </div>
  );
}
function SignIn({
  onSubmit,
  error,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f7fc] px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl"
      >
        <img src={vektissLogo} alt="Vektiss" className="h-9 w-auto" />
        <h1 className="mt-7 text-2xl font-extrabold">Sign in to CRM</h1>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <input
          name="email"
          type="email"
          required
          defaultValue="rrose@vektiss.com"
          className="mt-5 w-full rounded-xl border border-slate-200 p-3"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="mt-3 w-full rounded-xl border border-slate-200 p-3"
        />
        <button className="mt-3 w-full rounded-xl bg-[#1287f7] p-3 font-bold text-white">
          Sign in
        </button>
      </form>
    </div>
  );
}
