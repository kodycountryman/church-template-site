"use client";

import { useState } from "react";
import { Heart, Lock, Repeat, Calendar } from "lucide-react";

export default function GivePage() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const presets = [25, 50, 100, 250, 500];

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Generosity
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-4xl">
            Every dollar goes to people, not stages.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-500 leading-relaxed">
            We publish our budget every quarter. 78% of giving funds local benevolence, refugee
            resettlement, and our partner schools.
          </p>
        </div>
      </section>

      {/* FORM + BREAKDOWN */}
      <section className="pb-32 pt-12">
        <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Donation form */}
          <div className="rounded-3xl border border-ink-100 bg-bg p-8 md:p-10 shadow-[var(--shadow-card)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-6">
              Make a gift
            </div>

            {/* Frequency toggle */}
            <div className="grid grid-cols-2 rounded-full bg-bg-soft p-1.5 border border-ink-100">
              <FreqButton active={frequency === "monthly"} onClick={() => setFrequency("monthly")}>
                <Repeat className="h-4 w-4" /> Monthly
              </FreqButton>
              <FreqButton active={frequency === "once"} onClick={() => setFrequency("once")}>
                <Calendar className="h-4 w-4" /> One-time
              </FreqButton>
            </div>

            {/* Amount */}
            <div className="mt-8">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Amount (USD)
              </label>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    className={
                      amount === p
                        ? "rounded-xl border-2 border-accent bg-accent-50 py-3 font-bold text-ink"
                        : "rounded-xl border border-ink-100 py-3 font-medium text-ink-500 hover:border-ink-300 hover:text-ink"
                    }
                  >
                    ${p}
                  </button>
                ))}
              </div>
              <div className="mt-4 relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-ink-300">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full rounded-2xl border border-ink-100 bg-bg-soft pl-12 pr-5 py-5 text-3xl font-bold text-ink tracking-tight focus:border-accent focus:bg-bg focus:outline-none focus:ring-4 focus:ring-accent-50"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Designation
              </label>
              <select className="mt-3 w-full rounded-2xl border border-ink-100 bg-bg-soft px-5 py-4 text-ink font-medium focus:border-accent focus:bg-bg focus:outline-none">
                <option>General fund</option>
                <option>Local outreach</option>
                <option>Refugee resettlement</option>
                <option>Partner schools</option>
                <option>Building & operations</option>
              </select>
            </div>

            <button className="mt-8 w-full inline-flex h-16 items-center justify-center gap-3 rounded-full bg-ink px-8 text-base font-semibold text-white hover:bg-accent transition-colors">
              <Heart className="h-4 w-4 fill-current" />
              Give ${amount} {frequency === "monthly" ? "monthly" : "now"}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-ink-400">
              <Lock className="h-3 w-3" /> Secure checkout powered by Stripe
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-ink p-8 md:p-10 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-6">
                Where it goes
              </div>
              <div className="space-y-5">
                <Bar label="Local benevolence & outreach" pct={42} />
                <Bar label="Staff & teaching" pct={22} />
                <Bar label="Refugee resettlement" pct={18} />
                <Bar label="Partner schools" pct={10} />
                <Bar label="Building & operations" pct={8} />
              </div>
              <p className="mt-8 text-sm text-white/60 leading-relaxed">
                Updated quarterly. Q1 2026 figures shown.{" "}
                <a className="underline" href="#">Read the full report</a>.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-bg-soft p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                Other ways to give
              </div>
              <div className="space-y-2 text-ink-500 leading-relaxed">
                <div><span className="font-semibold text-ink">Mail:</span> 412 Carver Street, Greenville, SC 29601</div>
                <div><span className="font-semibold text-ink">Stock or appreciated assets:</span> email finance@kindred.church</div>
                <div><span className="font-semibold text-ink">Estate planning:</span> we'll connect you with a trusted advisor</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FreqButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "inline-flex items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-white"
          : "inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-ink-500 hover:text-ink"
      }
    >
      {children}
    </button>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium">
        <span className="text-white">{label}</span>
        <span className="text-white/60 tabular-nums">{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
