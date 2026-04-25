"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, MoreHorizontal, Trash2, Edit3, ExternalLink, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function EventsAdmin() {
  const events = useAdminStore((s) => s.events);
  const rsvps = useAdminStore((s) => s.rsvps);
  const deleteEvent = useAdminStore((s) => s.deleteEvent);
  const [q, setQ] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = events.filter((e) => e.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <Topbar
        title="Events"
        subtitle={`${events.length} upcoming · ${rsvps.length} total RSVPs`}
        cta={{ label: "New event", href: "/admin/events/new" }}
      />

      <div className="p-6 md:p-10">
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-lg border border-ink-100 bg-bg pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:outline-none"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-ink-100 bg-bg">
          <table className="w-full text-sm">
            <thead className="bg-bg-soft text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              <tr>
                <th className="px-5 py-3">Event</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 hidden lg:table-cell">Location</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">RSVPs</th>
                <th className="px-5 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((e) => {
                const d = new Date(e.starts);
                const eventRsvps = rsvps.filter((r) => r.eventSlug === e.slug);
                return (
                  <tr key={e.slug} className="hover:bg-bg-soft">
                    <td className="px-5 py-3">
                      <Link href={`/admin/events/${e.slug}`} className="flex items-center gap-3 group">
                        <div className="relative h-12 w-16 overflow-hidden rounded-md bg-bg-mute flex-shrink-0">
                          <Image src={e.cover} alt="" fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-ink group-hover:text-accent">{e.title}</div>
                          <div className="text-xs text-ink-400 flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {d.toLocaleString("en-US", { weekday: "short", hour: "numeric" })}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell text-ink-500">
                      {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{e.location}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-bg-mute px-2 py-0.5 text-xs font-medium text-ink-700">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-500">
                      {e.rsvp ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                          <Users className="h-3.5 w-3.5 text-accent" />
                          {eventRsvps.reduce((a, b) => a + b.party, 0)}
                        </span>
                      ) : (
                        <span className="text-xs text-ink-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === e.slug ? null : e.slug)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-bg-mute"
                      >
                        <MoreHorizontal className="h-4 w-4 text-ink-500" />
                      </button>
                      {openMenu === e.slug && (
                        <div className="absolute right-3 top-12 z-10 w-44 rounded-lg border border-ink-100 bg-bg shadow-[var(--shadow-elevated)]">
                          <Link href={`/admin/events/${e.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                            <Edit3 className="h-3.5 w-3.5" /> Edit
                          </Link>
                          <Link href={`/events/${e.slug}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft">
                            <ExternalLink className="h-3.5 w-3.5" /> View live
                          </Link>
                          <button
                            onClick={() => {
                              deleteEvent(e.slug);
                              toast.success(`Deleted "${e.title}"`);
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
