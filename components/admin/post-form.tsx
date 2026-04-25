"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Eye, Bold, Italic, Heading2, Link2, List, Quote } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import type { Post } from "@/lib/mock";

export function PostForm({ initial }: { initial?: Post }) {
  const router = useRouter();
  const upsert = useAdminStore((s) => s.upsertPost);
  const remove = useAdminStore((s) => s.deletePost);

  const [form, setForm] = useState<Post>(
    initial ?? {
      slug: "",
      title: "",
      excerpt: "",
      body: "",
      author: "Mara Eldridge",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "4 min",
      cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
      tag: "Vision",
    },
  );

  function update<K extends keyof Post>(k: K, v: Post[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "title" && !initial) {
      const slug = String(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setForm((f) => ({ ...f, slug }));
    }
  }

  function save() {
    if (!form.title || !form.slug) return toast.error("Title is required");
    upsert(form);
    toast.success(initial ? "Post updated" : "Post created");
    router.push("/admin/blog");
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-xs font-medium text-ink-400 hover:text-ink mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <h1 className="h-display text-3xl text-ink">{initial ? "Edit post" : "New post"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link href={`/blog/${initial.slug}`} target="_blank" className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-100 px-4 text-sm font-medium text-ink hover:bg-bg-soft">
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
          <Field label="Excerpt">
            <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none resize-none" />
          </Field>

          <Field label="Body">
            <div className="rounded-lg border border-ink-100 bg-bg overflow-hidden">
              <div className="flex items-center gap-1 border-b border-ink-100 bg-bg-soft px-3 py-2">
                {[Bold, Italic, Heading2, Quote, List, Link2].map((Icon, i) => (
                  <button key={i} className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-bg-mute">
                    <Icon className="h-3.5 w-3.5 text-ink-500" />
                  </button>
                ))}
                <div className="ml-auto text-xs text-ink-400 pr-2">Markdown</div>
              </div>
              <textarea value={form.body} onChange={(e) => update("body", e.target.value)} rows={18} placeholder="Start writing..." className="w-full px-4 py-3 text-sm font-mono text-ink focus:outline-none resize-none" />
            </div>
          </Field>
        </div>

        <aside className="space-y-5">
          <Field label="Cover image">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-bg-mute border border-ink-100">
              {form.cover && <Image src={form.cover} alt="" fill sizes="320px" className="object-cover" />}
            </div>
            <input value={form.cover} onChange={(e) => update("cover", e.target.value)} className="mt-2 w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-xs font-mono text-ink focus:border-accent focus:outline-none" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tag">
              <input value={form.tag} onChange={(e) => update("tag", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none" />
            </Field>
            <Field label="Read time">
              <input value={form.readTime} onChange={(e) => update("readTime", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none" />
            </Field>
          </div>
          <Field label="Author">
            <input value={form.author} onChange={(e) => update("author", e.target.value)} className="w-full rounded-lg border border-ink-100 bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none" />
          </Field>
          <Field label="Status">
            <select className="w-full rounded-lg border border-ink-100 bg-bg px-4 py-2.5 text-sm font-medium text-ink focus:border-accent focus:outline-none">
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
          </Field>
          {initial && (
            <button onClick={() => { remove(initial.slug); toast.success("Deleted"); router.push("/admin/blog"); }} className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100">
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
