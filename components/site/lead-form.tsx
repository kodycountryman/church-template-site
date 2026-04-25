"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";

export function LeadForm() {
  const addLead = useAdminStore((s) => s.addLead);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    church: "",
    role: "Pastor",
    message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    addLead({ ...form });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent-50 p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <Check className="h-6 w-6" />
        </div>
        <div className="mt-6 h-display text-3xl text-ink">Got it — thanks.</div>
        <p className="mt-3 text-ink-500 max-w-md mx-auto">
          I'll reply within a day. In the meantime, your message landed in the live demo CMS —{" "}
          <a className="font-semibold text-accent hover:underline" href="/admin/messages">
            see it in the inbox
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-ink-100 bg-bg p-8 md:p-10 shadow-[var(--shadow-card)] space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" value={form.name} onChange={(v) => update("name", v)} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
      </div>
      <Field label="Church name" value={form.church} onChange={(v) => update("church", v)} />
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          Your role
        </label>
        <select
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink font-medium focus:border-accent focus:bg-bg focus:outline-none"
        >
          <option>Pastor</option>
          <option>Communications</option>
          <option>Operations / Admin</option>
          <option>Volunteer</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          What are you trying to build?
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="A few sentences — your current site, what's broken, what you wish you had."
          className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-base font-semibold text-white hover:bg-accent transition-colors"
      >
        Send <ArrowUpRight className="h-4 w-4" />
      </button>
      <p className="text-xs text-ink-400 text-center">
        Demo form — your message lands in the live admin inbox so you can see how submissions
        flow. No actual email is sent.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink focus:border-accent focus:bg-bg focus:outline-none"
      />
    </div>
  );
}
