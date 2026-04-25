"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Tag, Heart,
  ScanLine, MessageSquare, DollarSign, Pencil, MoreHorizontal, Cake,
} from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function PersonProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const person = useAdminStore((s) => s.people.find((p) => p.id === id));
  const households = useAdminStore((s) => s.households);
  const people = useAdminStore((s) => s.people);
  const attendance = useAdminStore((s) => s.attendance);

  if (!person) return notFound();
  const household = households.find((h) => h.id === person.householdId);
  const familyMembers = people.filter((p) => p.householdId === person.householdId && p.id !== person.id);
  const personAttendance = attendance.filter((a) => a.personId === person.id);
  const last90 = personAttendance.filter((a) => Date.now() - new Date(a.date).getTime() < 90 * 86400_000);
  const yearAttendance = personAttendance.length;
  const consecutive = computeStreak(personAttendance);

  const age = (() => {
    const dob = new Date(person.dob);
    return Math.floor((Date.now() - dob.getTime()) / (365.25 * 86400_000));
  })();

  return (
    <>
      <Topbar title={`${person.firstName} ${person.lastName}`} subtitle={household?.name} />

      <div className="p-6 md:p-10">
        <Link href="/admin/people" className="inline-flex items-center gap-2 text-xs font-medium text-ink-400 hover:text-ink mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> All members
        </Link>

        {/* Profile header */}
        <div className="rounded-2xl border border-ink-100 bg-bg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-bg-soft flex-shrink-0">
              <Image src={person.photo} alt="" fill sizes="128px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="h-display text-4xl text-ink">{person.firstName} {person.lastName}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-500">
                    <span
                      className={
                        person.status === "Member"
                          ? "rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent"
                          : person.status === "Child"
                            ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700"
                            : "rounded-full bg-bg-mute px-2.5 py-0.5 text-xs font-semibold text-ink-500"
                      }
                    >
                      {person.status}
                    </span>
                    <span>Age {age}</span>
                    <span>·</span>
                    <span>Member since {new Date(person.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {person.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-md bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent">
                        <Tag className="h-3 w-3" /> {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ink-100 px-3 text-xs font-semibold text-ink hover:bg-bg-soft">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-ink-100 hover:bg-bg-soft">
                    <MoreHorizontal className="h-4 w-4 text-ink-500" />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 text-sm">
                <Detail icon={<Mail />} value={person.email || "—"} />
                <Detail icon={<Phone />} value={person.phone || "—"} />
                <Detail icon={<MapPin />} value={household ? `${household.addressLine1}` : "—"} />
                <Detail icon={<Cake />} value={new Date(person.dob).toLocaleDateString("en-US", { month: "long", day: "numeric" })} />
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Attendance (90d)" value={String(last90.length)} sub={`${Math.round((last90.length / 13) * 100)}% of weeks`} />
          <Stat label="All-time" value={String(yearAttendance)} sub="services attended" />
          <Stat label="Streak" value={`${consecutive} weeks`} sub="consecutive" />
          <Stat label="Groups" value={String(person.groups.length)} sub={person.groups[0] ?? "Not yet in a group"} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Activity timeline */}
          <div className="rounded-2xl border border-ink-100 bg-bg p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-sm font-semibold text-ink">Activity timeline</div>
                <div className="text-xs text-ink-400">Last 12 weeks</div>
              </div>
              <button className="text-xs font-medium text-accent hover:underline">Add note</button>
            </div>

            <ul className="relative border-l-2 border-ink-100 pl-6 space-y-6">
              {personAttendance.slice(0, 8).map((a) => (
                <TimelineItem
                  key={a.id}
                  icon={<ScanLine className="h-3 w-3" />}
                  color="accent"
                  title={`Checked in to ${a.service} service`}
                  sub={a.room ?? "—"}
                  time={a.date}
                />
              ))}
              {personAttendance.length === 0 && (
                <li className="text-sm text-ink-400">No attendance records yet.</li>
              )}
              <TimelineItem
                icon={<Heart className="h-3 w-3" />}
                color="emerald"
                title="Joined a small group"
                sub={person.groups[0] ?? "—"}
                time="2 months ago"
              />
              <TimelineItem
                icon={<MessageSquare className="h-3 w-3" />}
                color="ink"
                title="Sent a contact message"
                sub="About visiting for the first time"
                time="3 months ago"
              />
              <TimelineItem
                icon={<DollarSign className="h-3 w-3" />}
                color="ink"
                title="Started monthly giving"
                sub="$50 / month — General fund"
                time="4 months ago"
              />
            </ul>
          </div>

          {/* Sidebar — household, notes */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-ink-100 bg-bg p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-4">
                Household
              </div>
              <div className="text-base font-bold text-ink">{household?.name}</div>
              <div className="mt-1 text-sm text-ink-500">
                {household?.addressLine1}
                <br />
                {household?.addressLine2}
              </div>

              {familyMembers.length > 0 && (
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                    Family members
                  </div>
                  <ul className="space-y-2">
                    {familyMembers.map((fm) => (
                      <li key={fm.id}>
                        <Link href={`/admin/people/${fm.id}`} className="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-bg-soft">
                          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-bg-soft">
                            <Image src={fm.photo} alt="" fill sizes="36px" className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-ink">{fm.firstName} {fm.lastName}</div>
                            <div className="truncate text-xs text-ink-400">{fm.status}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-ink-100 bg-bg p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">
                Pastoral notes
              </div>
              <textarea
                rows={4}
                placeholder="Add a private note (only visible to staff)..."
                className="w-full rounded-lg border border-ink-100 bg-bg-soft px-3 py-2 text-sm text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none resize-none"
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Detail({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span className="text-ink-400 flex-shrink-0">{icon}</span>
      <span className="truncate text-ink">{value}</span>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className="mt-2 text-2xl font-bold text-ink tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-ink-400">{sub}</div>
    </div>
  );
}

function TimelineItem({
  icon, color, title, sub, time,
}: { icon: React.ReactNode; color: "accent" | "emerald" | "ink"; title: string; sub: string; time: string }) {
  const ring =
    color === "accent" ? "bg-accent text-white" :
    color === "emerald" ? "bg-emerald-500 text-white" :
    "bg-ink text-white";
  return (
    <li className="relative">
      <div className={`absolute -left-[34px] top-0 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-bg ${ring}`}>
        {icon}
      </div>
      <div className="text-sm font-semibold text-ink">{title}</div>
      <div className="text-xs text-ink-400">{sub}</div>
      <div className="text-[11px] text-ink-300 mt-0.5">{time}</div>
    </li>
  );
}

function computeStreak(records: { date: string }[]) {
  if (records.length === 0) return 0;
  const dates = new Set(records.map((r) => r.date));
  let streak = 0;
  let cursor = new Date();
  // walk back Sunday by Sunday
  cursor.setDate(cursor.getDate() - cursor.getDay());
  for (let i = 0; i < 52; i++) {
    const d = cursor.toISOString().slice(0, 10);
    if (dates.has(d)) streak++;
    else if (i > 0) break;
    cursor.setDate(cursor.getDate() - 7);
  }
  return streak;
}
