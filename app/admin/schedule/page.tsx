"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function SchedulePage() {
  const teams = useAdminStore((s) => s.teams);
  const schedule = useAdminStore((s) => s.schedule);
  const people = useAdminStore((s) => s.people);
  const updateAssignmentStatus = useAdminStore((s) => s.updateAssignmentStatus);

  const allWeeks = useMemo(() => {
    const weeks = Array.from(new Set(schedule.map((a) => a.weekDate))).sort();
    return weeks;
  }, [schedule]);

  const [weekIdx, setWeekIdx] = useState(0);
  const currentWeek = allWeeks[weekIdx];

  const weekAssignments = schedule.filter((a) => a.weekDate === currentWeek);

  const stats = {
    total: weekAssignments.length,
    confirmed: weekAssignments.filter((a) => a.status === "Confirmed").length,
    pending: weekAssignments.filter((a) => a.status === "Pending").length,
    declined: weekAssignments.filter((a) => a.status === "Declined").length,
  };

  return (
    <>
      <Topbar title="Schedule" subtitle="Volunteer assignments by week" />

      <div className="p-6 md:p-10 space-y-6">
        {/* Week picker + stats */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWeekIdx(Math.max(0, weekIdx - 1))}
              disabled={weekIdx === 0}
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-ink-100 bg-bg hover:bg-bg-soft disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="rounded-lg bg-bg px-5 py-2 border border-ink-100 min-w-48 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                Week of
              </div>
              <div className="text-lg font-bold text-ink">
                {currentWeek
                  ? new Date(currentWeek + "T12:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                  : "—"}
              </div>
            </div>
            <button
              onClick={() => setWeekIdx(Math.min(allWeeks.length - 1, weekIdx + 1))}
              disabled={weekIdx >= allWeeks.length - 1}
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-ink-100 bg-bg hover:bg-bg-soft disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Pill label="Confirmed" count={stats.confirmed} color="emerald" />
            <Pill label="Pending" count={stats.pending} color="amber" />
            <Pill label="Declined" count={stats.declined} color="red" />
          </div>
        </div>

        {/* Teams */}
        <div className="space-y-5">
          {teams.map((team) => {
            const teamAssignments = weekAssignments.filter((a) => a.teamId === team.id);
            return (
              <div key={team.id} className="rounded-2xl border border-ink-100 bg-bg overflow-hidden">
                <div
                  className="flex items-center justify-between px-6 py-4 border-b border-ink-100"
                  style={{ borderLeft: `4px solid ${team.color}` }}
                >
                  <div>
                    <div className="text-base font-bold text-ink tracking-tight">{team.name}</div>
                    <div className="text-xs text-ink-400">{team.description}</div>
                  </div>
                  <div className="text-xs font-medium text-ink-500">
                    {teamAssignments.length} positions
                  </div>
                </div>
                <div className="divide-y divide-ink-100">
                  {teamAssignments.map((a) => {
                    const person = people.find((p) => p.id === a.personId);
                    if (!person) return null;
                    return (
                      <div key={a.id} className="flex items-center gap-4 px-6 py-3 hover:bg-bg-soft">
                        <div className="w-40 flex-shrink-0">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                            {a.position}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-bg-soft flex-shrink-0">
                            <Image src={person.photo} alt="" fill sizes="32px" className="object-cover" />
                          </div>
                          <div className="text-sm font-semibold text-ink truncate">
                            {person.firstName} {person.lastName}
                          </div>
                        </div>
                        <StatusPill status={a.status} />
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              updateAssignmentStatus(a.id, "Confirmed");
                              toast.success(`${person.firstName} confirmed for ${a.position}`);
                            }}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50"
                            title="Confirm"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              updateAssignmentStatus(a.id, "Pending");
                              toast(`Set to pending`);
                            }}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-amber-600 hover:bg-amber-50"
                            title="Pending"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              updateAssignmentStatus(a.id, "Declined");
                              toast(`Marked as declined`);
                            }}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-red-600 hover:bg-red-50"
                            title="Decline"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {teamAssignments.length === 0 && (
                    <div className="px-6 py-6 text-sm text-ink-400">No assignments this week.</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function StatusPill({ status }: { status: "Confirmed" | "Pending" | "Declined" }) {
  const cls =
    status === "Confirmed"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Pending"
        ? "bg-amber-50 text-amber-700"
        : "bg-red-50 text-red-700";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
}

function Pill({ label, count, color }: { label: string; count: number; color: "emerald" | "amber" | "red" }) {
  const ring =
    color === "emerald" ? "bg-emerald-500" :
    color === "amber" ? "bg-amber-500" :
    "bg-red-500";
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-ink-100 bg-bg px-3 py-1.5">
      <span className={`h-2 w-2 rounded-full ${ring}`} />
      <span className="text-xs font-medium text-ink-500">{label}</span>
      <span className="text-xs font-bold text-ink tabular-nums">{count}</span>
    </div>
  );
}
