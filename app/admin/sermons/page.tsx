"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, MoreHorizontal, Trash2, Edit3, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function SermonsAdmin() {
  const sermons = useAdminStore((s) => s.sermons);
  const deleteSermon = useAdminStore((s) => s.deleteSermon);
  const [q, setQ] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = sermons.filter(
    (s) => s.title.toLowerCase().includes(q.toLowerCase()) || s.speaker.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <Topbar
        title="Sermons"
        subtitle={`${sermons.length} messages`}
        cta={{ label: "New sermon", href: "/admin/sermons/new" }}
      />

      <div className="p-6 md:p-10">
        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or speaker..."
              className="w-full rounded-lg border border-ink-100 bg-bg pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:outline-none"
            />
          </div>
          <select className="rounded-lg border border-ink-100 bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none">
            <option>All series</option>
            <option>The Long Obedience</option>
            <option>Rooted</option>
            <option>Neighbor</option>
          </select>
          <select className="rounded-lg border border-ink-100 bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none">
            <option>All speakers</option>
            <option>Mara Eldridge</option>
            <option>Daniel Kim</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-ink-100 bg-bg">
          <table className="w-full text-sm">
            <thead className="bg-bg-soft text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3 hidden md:table-cell">Series</th>
                <th className="px-5 py-3 hidden lg:table-cell">Speaker</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 hidden lg:table-cell">Length</th>
                <th className="px-5 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((s) => (
                <tr key={s.slug} className="hover:bg-bg-soft transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/sermons/${s.slug}`} className="flex items-center gap-3 group">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-bg-mute flex-shrink-0">
                        <Image src={s.cover} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-ink group-hover:text-accent">{s.title}</div>
                        <div className="truncate text-xs text-ink-400">{s.scripture}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-ink-500">{s.series}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{s.speaker}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-ink-500">{s.date}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{s.duration}</td>
                  <td className="px-5 py-3 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === s.slug ? null : s.slug)}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-bg-mute"
                      aria-label="Actions"
                    >
                      <MoreHorizontal className="h-4 w-4 text-ink-500" />
                    </button>
                    {openMenu === s.slug && (
                      <div className="absolute right-3 top-12 z-10 w-44 rounded-lg border border-ink-100 bg-bg shadow-[var(--shadow-elevated)]">
                        <Link href={`/admin/sermons/${s.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </Link>
                        <Link href={`/sermons/${s.slug}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                          <ExternalLink className="h-3.5 w-3.5" /> View live
                        </Link>
                        <button
                          onClick={() => {
                            deleteSermon(s.slug);
                            toast.success(`Deleted "${s.title}"`);
                            setOpenMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-ink-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-ink-400">
                    No sermons match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
