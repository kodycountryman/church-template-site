"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, Grid3x3, List, Tag, Users, Filter } from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

type View = "grid" | "list";

export default function PeoplePage() {
  const people = useAdminStore((s) => s.people);
  const households = useAdminStore((s) => s.households);
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("grid");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    return people.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (!q) return true;
      const term = q.toLowerCase();
      return (
        p.firstName.toLowerCase().includes(term) ||
        p.lastName.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [people, q, statusFilter]);

  const stats = {
    total: people.length,
    members: people.filter((p) => p.status === "Member").length,
    children: people.filter((p) => p.status === "Child").length,
    households: households.length,
  };

  return (
    <>
      <Topbar
        title="Members"
        subtitle={`${stats.total} people · ${stats.households} households`}
        cta={{ label: "Add person", href: "/admin/people/new" }}
      />

      <div className="p-6 md:p-10 space-y-6">
        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MiniStat label="Total people" value={stats.total} />
          <MiniStat label="Members" value={stats.members} accent />
          <MiniStat label="Children" value={stats.children} />
          <MiniStat label="Households" value={stats.households} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-64 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, or tag..."
              className="w-full rounded-lg border border-ink-100 bg-bg pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-ink-400" />
            {["All", "Member", "Regular", "Guest", "Child"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={
                  statusFilter === s
                    ? "rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white"
                    : "rounded-md px-3 py-1.5 text-xs font-medium text-ink-500 hover:bg-bg-soft"
                }
              >
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center rounded-lg border border-ink-100 bg-bg p-1">
            <button
              onClick={() => setView("grid")}
              className={view === "grid" ? "rounded bg-bg-mute p-1.5" : "p-1.5 hover:bg-bg-soft rounded"}
              aria-label="Grid view"
            >
              <Grid3x3 className="h-4 w-4 text-ink-500" />
            </button>
            <button
              onClick={() => setView("list")}
              className={view === "list" ? "rounded bg-bg-mute p-1.5" : "p-1.5 hover:bg-bg-soft rounded"}
              aria-label="List view"
            >
              <List className="h-4 w-4 text-ink-500" />
            </button>
          </div>
        </div>

        {/* Grid */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((p) => {
              const household = households.find((h) => h.id === p.householdId);
              return (
                <Link
                  key={p.id}
                  href={`/admin/people/${p.id}`}
                  className="group rounded-xl border border-ink-100 bg-bg p-4 hover:border-accent/30 hover:shadow-[var(--shadow-card)] transition-all"
                >
                  <div className="relative aspect-square overflow-hidden rounded-full bg-bg-soft mx-auto w-20">
                    <Image src={p.photo} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="truncate text-sm font-bold text-ink group-hover:text-accent">
                      {p.firstName} {p.lastName}
                    </div>
                    <div className="truncate text-xs text-ink-400 mt-0.5">{household?.name}</div>
                    <div
                      className={
                        p.status === "Member"
                          ? "mt-2 inline-block rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-semibold text-accent"
                          : p.status === "Child"
                            ? "mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
                            : "mt-2 inline-block rounded-full bg-bg-mute px-2 py-0.5 text-[10px] font-semibold text-ink-500"
                      }
                    >
                      {p.status}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* List */
          <div className="overflow-hidden rounded-xl border border-ink-100 bg-bg">
            <table className="w-full text-sm">
              <thead className="bg-bg-soft text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3 hidden md:table-cell">Household</th>
                  <th className="px-5 py-3 hidden lg:table-cell">Email</th>
                  <th className="px-5 py-3 hidden lg:table-cell">Phone</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 hidden md:table-cell">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((p) => {
                  const household = households.find((h) => h.id === p.householdId);
                  return (
                    <tr key={p.id} className="hover:bg-bg-soft transition-colors">
                      <td className="px-5 py-3">
                        <Link href={`/admin/people/${p.id}`} className="flex items-center gap-3 group">
                          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-bg-soft">
                            <Image src={p.photo} alt="" fill sizes="36px" className="object-cover" />
                          </div>
                          <span className="font-semibold text-ink group-hover:text-accent">
                            {p.firstName} {p.lastName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell text-ink-500">{household?.name}</td>
                      <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{p.email || "—"}</td>
                      <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{p.phone || "—"}</td>
                      <td className="px-5 py-3">
                        <span
                          className={
                            p.status === "Member"
                              ? "rounded-full bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent"
                              : p.status === "Child"
                                ? "rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                                : "rounded-full bg-bg-mute px-2 py-0.5 text-xs font-semibold text-ink-500"
                          }
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded-md bg-bg-soft px-2 py-0.5 text-[10px] font-medium text-ink-500"
                            >
                              <Tag className="h-2.5 w-2.5" /> {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-ink-400">
            <Users className="mx-auto h-8 w-8 mb-3 text-ink-300" />
            No people match your search.
          </div>
        )}
      </div>
    </>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className={accent ? "mt-2 text-2xl font-bold text-accent tracking-tight" : "mt-2 text-2xl font-bold text-ink tracking-tight"}>
        {value}
      </div>
    </div>
  );
}
