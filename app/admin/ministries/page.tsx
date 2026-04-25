"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MoreHorizontal, Edit3, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function MinistriesAdmin() {
  const ministries = useAdminStore((s) => s.ministries);
  const deleteMinistry = useAdminStore((s) => s.deleteMinistry);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <Topbar title="Ministries" subtitle={`${ministries.length} active`} cta={{ label: "New ministry", href: "/admin/ministries/new" }} />

      <div className="p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <div key={m.slug} className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-bg">
              <Link href={`/admin/ministries/${m.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-mute">
                  <Image src={m.cover} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{m.meets}</div>
                  <div className="mt-1.5 text-xl font-bold text-ink tracking-tight group-hover:text-accent">{m.title}</div>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed line-clamp-2">{m.summary}</p>
                </div>
              </Link>
              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === m.slug ? null : m.slug); }}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-bg/90 backdrop-blur hover:bg-bg"
                >
                  <MoreHorizontal className="h-4 w-4 text-ink-700" />
                </button>
                {openMenu === m.slug && (
                  <div className="absolute right-0 top-10 z-10 w-44 rounded-lg border border-ink-100 bg-bg shadow-[var(--shadow-elevated)]">
                    <Link href={`/admin/ministries/${m.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </Link>
                    <Link href={`/ministries/${m.slug}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                      <ExternalLink className="h-3.5 w-3.5" /> View live
                    </Link>
                    <button
                      onClick={() => { deleteMinistry(m.slug); toast.success(`Deleted "${m.title}"`); setOpenMenu(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-ink-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
