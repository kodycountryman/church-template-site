"use client";

import { useState } from "react";
import { Save, Globe, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function SettingsPage() {
  const settings = useAdminStore((s) => s.settings);
  const update = useAdminStore((s) => s.updateSettings);
  const [form, setForm] = useState(settings);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function save() {
    update(form);
    toast.success("Settings saved");
  }

  return (
    <>
      <Topbar title="Settings" subtitle="Site configuration" />

      <div className="p-6 md:p-10 max-w-3xl space-y-6">
        <Section icon={<Globe className="h-4 w-4" />} title="Identity" description="The basics that show up across the site.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Church name">
              <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
            <Field label="Tagline">
              <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
          </div>
        </Section>

        <Section icon={<Mail className="h-4 w-4" />} title="Contact" description="How people reach the church.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email">
              <input value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
          </div>
        </Section>

        <Section icon={<MapPin className="h-4 w-4" />} title="Address">
          <div className="grid gap-4">
            <Field label="Street">
              <input value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
            <Field label="City, State, Zip">
              <input value={form.addressLine2} onChange={(e) => set("addressLine2", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
          </div>
        </Section>

        <Section icon={<Clock className="h-4 w-4" />} title="Service times">
          <div className="space-y-2">
            {form.serviceTimes.map((t, i) => (
              <input
                key={i}
                value={t}
                onChange={(e) => {
                  const next = [...form.serviceTimes];
                  next[i] = e.target.value;
                  set("serviceTimes", next);
                }}
                className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none"
              />
            ))}
            <button
              onClick={() => set("serviceTimes", [...form.serviceTimes, ""])}
              className="text-xs font-semibold text-accent hover:underline"
            >
              + Add another
            </button>
          </div>
        </Section>

        <Section title="Social links">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Instagram">
              <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
            <Field label="YouTube">
              <input value={form.youtube} onChange={(e) => set("youtube", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
            <Field label="Spotify">
              <input value={form.spotify} onChange={(e) => set("spotify", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-2.5 text-sm text-ink focus:border-accent focus:bg-bg focus:outline-none" />
            </Field>
          </div>
        </Section>

        <div className="sticky bottom-6 flex justify-end">
          <button onClick={save} className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent shadow-[var(--shadow-elevated)]">
            <Save className="h-4 w-4" /> Save changes
          </button>
        </div>
      </div>
    </>
  );
}

function Section({ icon, title, description, children }: { icon?: React.ReactNode; title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-bg p-6 md:p-8">
      <div className="flex items-start gap-3 mb-6">
        {icon && <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent">{icon}</div>}
        <div>
          <div className="text-base font-bold text-ink tracking-tight">{title}</div>
          {description && <div className="text-sm text-ink-500">{description}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
