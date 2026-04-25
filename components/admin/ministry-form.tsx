"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import type { Ministry } from "@/lib/mock";

export function MinistryForm({ initial }: { initial?: Ministry }) {
  const router = useRouter();
  const upsert = useAdminStore((s) => s.upsertMinistry);
  const remove = useAdminStore((s) => s.deleteMinistry);

  const [form, setForm] = useState<Ministry>(
    initial ?? {
      slug: "",
      title: "",
      summary: "",
      description: "",
      cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      meets: "Weekly",
    },
  );

  function update<K extends keyof Ministry>(k: K, v: Ministry[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "title" && !initial) {
      const slug = String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setForm((f) => ({ ...f, slug }));
    }
  }

  function save() {
    if (!form.title || !form.slug) return toast.error("Title is required");
    upsert(form);
    toast.success(initial ? "Ministry updated" : "Ministry created");
    router.push("/admin/ministries");
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <Link href="/admin/ministries" className="inline-flex items-center gap-2 text-xs font-medium text-ink-400 hover:text-ink mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <h1 className="h-display text-3xl text-ink">{initial ? "Edit ministry" : "New ministry"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link href={`/ministries/${initial.slug}`} target="_blank" className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-100 px-4 text-sm font-medium text-ink hover:bg-bg-soft">
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
          <Field label="Summary">
            <input value={form.summary} onChange={(e) => update("summary", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none" />
          </Field>
          <Field label="Meets">
            <input value={form.meets} onChange={(e) => update("meets", e.target.value)} placeholder="Sundays · 9 & 11 AM" className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none" />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={8} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none resize-none" />
          </Field>
        </div>
        <aside className="space-y-5">
          <Field label="Cover image">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-bg-mute border border-ink-100">
              {form.cover && <Image src={form.cover} alt="" fill sizes="320px" className="object-cover" />}
            </div>
            <input value={form.cover} onChange={(e) => update("cover", e.target.value)} className="mt-2 w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-xs font-mono text-ink focus:border-accent focus:outline-none" />
          </Field>
          {initial && (
            <button onClick={() => { remove(initial.slug); toast.success("Deleted"); router.push("/admin/ministries"); }} className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100">
              <Trash2 className="h-3.5 w-3.5" /> Delete
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
