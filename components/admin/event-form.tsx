"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Eye, Users } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import type { Event } from "@/lib/mock";

export function EventForm({ initial }: { initial?: Event }) {
  const router = useRouter();
  const upsertEvent = useAdminStore((s) => s.upsertEvent);
  const deleteEvent = useAdminStore((s) => s.deleteEvent);
  const rsvps = useAdminStore((s) => s.rsvps).filter((r) => r.eventSlug === initial?.slug);

  const [form, setForm] = useState<Event>(
    initial ?? {
      slug: "",
      title: "",
      description: "",
      starts: new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 16),
      location: "412 Carver Street",
      cover: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=1600&q=80",
      rsvp: false,
      category: "Gathering",
    },
  );

  function update<K extends keyof Event>(k: K, v: Event[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "title" && !initial) {
      const slug = String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setForm((f) => ({ ...f, slug }));
    }
  }

  function save() {
    if (!form.title || !form.slug) {
      toast.error("Title is required");
      return;
    }
    upsertEvent(form);
    toast.success(initial ? "Event updated" : "Event created");
    router.push("/admin/events");
  }

  function destroy() {
    if (!initial) return;
    deleteEvent(initial.slug);
    toast.success("Event deleted");
    router.push("/admin/events");
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <Link href="/admin/events" className="inline-flex items-center gap-2 text-xs font-medium text-ink-400 hover:text-ink mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to events
          </Link>
          <h1 className="h-display text-3xl text-ink">{initial ? "Edit event" : "New event"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link href={`/events/${initial.slug}`} target="_blank" className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-100 px-4 text-sm font-medium text-ink hover:bg-bg-soft">
              <Eye className="h-3.5 w-3.5" /> View live
            </Link>
          )}
          <button onClick={save} className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-accent">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <Field label="Title">
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-lg font-bold text-ink tracking-tight focus:border-accent focus:outline-none" />
          </Field>
          <Field label="Slug">
            <div className="flex rounded-lg border border-ink-100 bg-bg-soft overflow-hidden">
              <span className="bg-bg-mute px-3 py-2.5 text-sm text-ink-400 font-mono">/events/</span>
              <input value={form.slug} onChange={(e) => update("slug", e.target.value)} className="flex-1 bg-transparent px-3 py-2.5 text-sm font-mono text-ink focus:outline-none" />
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Starts">
              <input type="datetime-local" value={form.starts.slice(0, 16)} onChange={(e) => update("starts", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none" />
            </Field>
            <Field label="Location">
              <input value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none" />
            </Field>
          </div>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={6} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none resize-none" />
          </Field>

          {initial && rsvps.length > 0 && (
            <div className="rounded-xl border border-ink-100 bg-bg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-ink flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" /> RSVPs
                  </div>
                  <div className="text-xs text-ink-400">{rsvps.reduce((a, b) => a + b.party, 0)} attendees · {rsvps.length} parties</div>
                </div>
              </div>
              <div className="divide-y divide-ink-100 -mx-1">
                {rsvps.map((r) => (
                  <div key={r.id} className="flex items-center justify-between px-1 py-2">
                    <div>
                      <div className="text-sm font-semibold text-ink">{r.name}</div>
                      <div className="text-xs text-ink-400">{r.email}</div>
                    </div>
                    <div className="text-xs font-mono text-ink-500">×{r.party}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <Field label="Cover image">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-bg-mute border border-ink-100">
              {form.cover && <Image src={form.cover} alt="" fill sizes="320px" className="object-cover" />}
            </div>
            <input value={form.cover} onChange={(e) => update("cover", e.target.value)} className="mt-2 w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-xs font-mono text-ink focus:border-accent focus:outline-none" />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => update("category", e.target.value as Event["category"])} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm font-medium text-ink focus:border-accent focus:outline-none">
              <option>Gathering</option>
              <option>Outreach</option>
              <option>Class</option>
              <option>Family</option>
            </select>
          </Field>
          <label className="flex items-center gap-3 rounded-lg border border-ink-100 bg-bg p-3 cursor-pointer">
            <input type="checkbox" checked={form.rsvp} onChange={(e) => update("rsvp", e.target.checked)} className="accent-accent h-4 w-4" />
            <div className="text-sm">
              <div className="font-semibold text-ink">Require RSVP</div>
              <div className="text-xs text-ink-400">Capacity & sign-up tracking</div>
            </div>
          </label>
          {initial && (
            <button onClick={destroy} className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100">
              <Trash2 className="h-3.5 w-3.5" /> Delete event
            </button>
          )}
        </aside>
      </div>
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
