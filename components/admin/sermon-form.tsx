"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import type { Sermon } from "@/lib/mock";

export function SermonForm({ initial }: { initial?: Sermon }) {
  const router = useRouter();
  const upsertSermon = useAdminStore((s) => s.upsertSermon);
  const deleteSermon = useAdminStore((s) => s.deleteSermon);
  const series = useAdminStore((s) => s.series);

  const [form, setForm] = useState<Sermon>(
    initial ?? {
      slug: "",
      title: "",
      series: series[0]?.title ?? "",
      speaker: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      duration: "",
      scripture: "",
      cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=80",
      excerpt: "",
    },
  );
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Sermon>(k: K, v: Sermon[K]) {
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
    setSaving(true);
    setTimeout(() => {
      upsertSermon(form);
      toast.success(initial ? "Sermon updated" : "Sermon created");
      setSaving(false);
      router.push("/admin/sermons");
    }, 500);
  }

  function destroy() {
    if (!initial) return;
    deleteSermon(initial.slug);
    toast.success("Sermon deleted");
    router.push("/admin/sermons");
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <Link href="/admin/sermons" className="inline-flex items-center gap-2 text-xs font-medium text-ink-400 hover:text-ink mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to sermons
          </Link>
          <h1 className="h-display text-3xl text-ink">{initial ? "Edit sermon" : "New sermon"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link
              href={`/sermons/${initial.slug}`}
              target="_blank"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-100 px-4 text-sm font-medium text-ink hover:bg-bg-soft"
            >
              <Eye className="h-3.5 w-3.5" /> View live
            </Link>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-accent disabled:opacity-60"
          >
            <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Main */}
        <div className="space-y-5">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="On rest, and the arithmetic of grace"
              className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-lg font-bold text-ink tracking-tight focus:border-accent focus:outline-none"
            />
          </Field>

          <Field label="Slug" hint="The URL path (auto-generated from title)">
            <div className="flex rounded-lg border border-ink-100 bg-bg-soft overflow-hidden">
              <span className="bg-bg-mute px-3 py-2.5 text-sm text-ink-400 font-mono">/sermons/</span>
              <input
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm font-mono text-ink focus:outline-none"
              />
            </div>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Series">
              <select
                value={form.series}
                onChange={(e) => update("series", e.target.value)}
                className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm font-medium text-ink focus:border-accent focus:outline-none"
              >
                {series.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Speaker">
              <input
                value={form.speaker}
                onChange={(e) => update("speaker", e.target.value)}
                placeholder="James Eldridge"
                className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Date">
              <input
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
            <Field label="Duration">
              <input
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                placeholder="38 min"
                className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
            <Field label="Scripture">
              <input
                value={form.scripture}
                onChange={(e) => update("scripture", e.target.value)}
                placeholder="Hebrews 4:1–11"
                className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </Field>
          </div>

          <Field label="Excerpt" hint="Shown on the sermon archive and detail page">
            <textarea
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              rows={4}
              placeholder="A short hook that previews the message..."
              className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none resize-none"
            />
          </Field>

          <Field label="Notes (markdown)" hint="Full sermon notes / transcript">
            <textarea
              rows={10}
              defaultValue={"# Outline\n\n1. The text\n2. The world we live in\n3. The invitation"}
              className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-sm font-mono text-ink focus:border-accent focus:outline-none resize-none"
            />
          </Field>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <Field label="Cover image">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-bg-mute border border-ink-100">
              {form.cover && <Image src={form.cover} alt="" fill sizes="320px" className="object-cover" />}
            </div>
            <input
              value={form.cover}
              onChange={(e) => update("cover", e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-xs font-mono text-ink focus:border-accent focus:outline-none"
            />
            <button className="mt-2 w-full inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-ink-100 bg-bg text-sm font-medium text-ink hover:bg-bg-soft">
              Choose from media library
            </button>
          </Field>

          <Field label="Status">
            <select className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm font-medium text-ink focus:border-accent focus:outline-none">
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
          </Field>

          <div className="rounded-xl border border-ink-100 bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              Media
            </div>
            <div className="mt-3 space-y-2">
              <button className="w-full rounded-lg border border-ink-100 bg-bg-soft p-3 text-left text-xs">
                <div className="font-semibold text-ink">Audio file</div>
                <div className="text-ink-400">Drop or pick</div>
              </button>
              <button className="w-full rounded-lg border border-ink-100 bg-bg-soft p-3 text-left text-xs">
                <div className="font-semibold text-ink">Video file</div>
                <div className="text-ink-400">Drop or pick</div>
              </button>
            </div>
          </div>

          {initial && (
            <button
              onClick={destroy}
              className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete sermon
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <div className="mt-1.5 text-xs text-ink-400">{hint}</div>}
    </div>
  );
}
