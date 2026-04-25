"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function TeamsPage() {
  const teams = useAdminStore((s) => s.teams);
  const schedule = useAdminStore((s) => s.schedule);
  const people = useAdminStore((s) => s.people);

  return (
    <>
      <Topbar title="Teams" subtitle={`${teams.length} serving teams`} cta={{ label: "New team", href: "#" }} />

      <div className="p-6 md:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          {teams.map((t) => {
            const memberIds = Array.from(new Set(schedule.filter((a) => a.teamId === t.id).map((a) => a.personId)));
            const members = memberIds.map((id) => people.find((p) => p.id === id)).filter(Boolean);
            return (
              <div key={t.id} className="rounded-2xl border border-ink-100 bg-bg overflow-hidden">
                <div className="p-6 border-b border-ink-100" style={{ borderLeft: `4px solid ${t.color}` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold text-ink tracking-tight">{t.name}</div>
                      <div className="text-sm text-ink-500 mt-0.5">{t.description}</div>
                    </div>
                    <Link href="/admin/schedule" className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline whitespace-nowrap">
                      View schedule <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {t.positions.map((pos) => (
                      <span key={pos} className="rounded-md bg-bg-soft px-2 py-1 text-xs font-medium text-ink-700">
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                    {members.length} on this team
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {members.slice(0, 12).map((m) => m && (
                      <Link key={m.id} href={`/admin/people/${m.id}`} title={`${m.firstName} ${m.lastName}`} className="group">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-bg-soft ring-2 ring-bg group-hover:ring-accent transition-all">
                          <Image src={m.photo} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                      </Link>
                    ))}
                    {members.length > 12 && (
                      <div className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-bg-soft text-xs font-bold text-ink-500">
                        +{members.length - 12}
                      </div>
                    )}
                    <button className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-dashed border-ink-200 text-ink-400 hover:border-accent hover:text-accent">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
