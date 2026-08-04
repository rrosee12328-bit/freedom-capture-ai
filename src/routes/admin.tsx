import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  monthly_calls: string;
  client_value: string;
  challenge: string;
  timeline: string;
  investment_readiness: string;
  purchasing_authority: string;
  consultation_commitment: string;
  qualification_score: number;
  qualification_status: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Lead Dashboard — Vektiss" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (!session || !supabase) {
      setLeads([]);
      return;
    }
    setLoading(true);
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        setLoading(false);
        if (queryError) setError(queryError.message);
        else setLeads((data ?? []) as Lead[]);
      });
  }, [session]);

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

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const code = String(new FormData(e.currentTarget).get("code")).trim().toUpperCase();
            if (code === "VEKTISS2026") {
              window.sessionStorage.setItem("vektiss_admin_code", "VEKTISS2026");
              setUnlocked(true);
              setError("");
            } else {
              setError("Incorrect access code.");
            }
          }}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6"
        >
          <h1 className="text-xl font-bold">Access code</h1>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <input
            name="code"
            type="password"
            required
            placeholder="Enter access code"
            className="w-full rounded-lg border border-border bg-background p-3"
          />
          <button className="w-full rounded-lg bg-primary p-3 font-semibold text-primary-foreground">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/">
            <img src={vektissLogo} alt="Vektiss" className="h-8 w-auto" />
          </Link>
          {session ? (
            <button className="text-sm font-semibold" onClick={() => supabase?.auth.signOut()}>
              Sign out
            </button>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-3xl font-bold">Lead dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Qualification results from the consultation funnel.
        </p>
        {error ? (
          <p className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
        ) : null}
        {!session && !loading ? (
          <form
            onSubmit={signIn}
            className="mt-8 max-w-md space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <input
              name="email"
              type="email"
              required
              defaultValue="rrose@vektiss.com"
              placeholder="Admin email"
              className="w-full rounded-lg border border-border bg-background p-3"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-background p-3"
            />
            <button className="w-full rounded-lg bg-primary p-3 font-semibold text-primary-foreground">
              Sign in
            </button>
          </form>
        ) : null}
        {session ? (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  {[
                    "Submitted",
                    "Lead",
                    "Business",
                    "Status",
                    "Score",
                    "Calls",
                    "Client value",
                    "Challenge",
                    "Timeline",
                    "Investment",
                    "Authority",
                    "Commitment",
                  ].map((h) => (
                    <th key={h} className="p-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/70 align-top">
                    <td className="p-3 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <strong>{lead.name}</strong>
                      <br />
                      <a className="text-primary underline" href={`mailto:${lead.email}`}>
                        {lead.email}
                      </a>
                      <br />
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </td>
                    <td className="p-3">
                      <strong>{lead.business_name}</strong>
                      <br />
                      {lead.business_type}
                    </td>
                    <td className="p-3 font-semibold">{lead.qualification_status}</td>
                    <td className="p-3">{lead.qualification_score}</td>
                    <td className="p-3">{lead.monthly_calls}</td>
                    <td className="p-3">{lead.client_value}</td>
                    <td className="p-3">{lead.challenge}</td>
                    <td className="p-3">{lead.timeline}</td>
                    <td className="p-3">{lead.investment_readiness}</td>
                    <td className="p-3">{lead.purchasing_authority}</td>
                    <td className="p-3">{lead.consultation_commitment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && leads.length === 0 ? (
              <p className="p-8 text-center text-muted-foreground">No leads yet.</p>
            ) : null}
          </div>
        ) : null}
      </main>
    </div>
  );
}
