"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search, Check, ScanLine, Users, Baby, Printer, X, Activity, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

const SERVICES = ["9 AM", "11 AM", "Wed Night"] as const;
const KIDS_ROOMS = ["Nursery (0–2)", "Preschool (3–5)", "K-2", "3-5"];

export default function CheckinPage() {
  const people = useAdminStore((s) => s.people);
  const households = useAdminStore((s) => s.households);
  const attendance = useAdminStore((s) => s.attendance);
  const checkIn = useAdminStore((s) => s.checkInPerson);
  const user = useAdminStore((s) => s.user);

  const [service, setService] = useState<(typeof SERVICES)[number]>("9 AM");
  const [q, setQ] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const todayCheckins = attendance.filter((a) => a.date === today);

  const matchingHouseholds = useMemo(() => {
    if (!q) return [];
    const term = q.toLowerCase();
    const matches = new Set<string>();
    for (const p of people) {
      if (
        p.firstName.toLowerCase().includes(term) ||
        p.lastName.toLowerCase().includes(term) ||
        p.phone.includes(term)
      ) {
        matches.add(p.householdId);
      }
    }
    return households.filter((h) => matches.has(h.id) || h.primaryPhone.includes(term)).slice(0, 5);
  }, [q, people, households]);

  const stats = {
    total: todayCheckins.length,
    kids: todayCheckins.filter((a) => a.room?.startsWith("Kids") || a.room?.includes("Nursery") || a.room?.includes("Preschool") || a.room?.includes("K-2") || a.room?.includes("3-5")).length,
    adults: todayCheckins.filter((a) => a.room === "Sanctuary").length,
  };

  return (
    <>
      <Topbar title="Check-in" subtitle={`Sunday, ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}`} />

      <div className="p-6 md:p-10 space-y-6">
        {/* Live stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <LiveStat label="Checked in today" value={stats.total} icon={<Activity className="h-4 w-4" />} highlight />
          <LiveStat label="Adults" value={stats.adults} icon={<Users className="h-4 w-4" />} />
          <LiveStat label="Kids" value={stats.kids} icon={<Baby className="h-4 w-4" />} />
          <LiveStat label="Visitors" value={Math.floor(stats.total * 0.08)} icon={<ScanLine className="h-4 w-4" />} />
        </div>

        {/* Service picker */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mr-2">Service</div>
          {SERVICES.map((s) => (
            <button
              key={s}
              onClick={() => setService(s)}
              className={
                service === s
                  ? "inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-semibold text-white"
                  : "inline-flex h-10 items-center rounded-lg border border-ink-100 bg-bg px-4 text-sm font-medium text-ink-500 hover:border-ink-300 hover:text-ink"
              }
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Search & family card */}
          <div className="rounded-2xl border border-ink-100 bg-bg overflow-hidden">
            <div className="p-6 border-b border-ink-100">
              <div className="text-sm font-semibold text-ink mb-3">Find a family</div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  autoFocus
                  placeholder="Last name or phone number..."
                  className="w-full rounded-xl border-2 border-ink-100 bg-bg-soft pl-12 pr-4 py-4 text-lg font-medium text-ink placeholder:text-ink-400 focus:border-accent focus:bg-bg focus:outline-none"
                />
                {q && (
                  <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-bg-mute">
                    <X className="h-4 w-4 text-ink-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {q && matchingHouseholds.length === 0 && (
                <div className="text-center py-12 text-ink-400">
                  No families found for "{q}"
                  <button className="block mx-auto mt-4 text-accent font-semibold hover:underline">
                    Add as new visitor →
                  </button>
                </div>
              )}

              {!q && (
                <div className="text-center py-16">
                  <div className="mx-auto h-16 w-16 rounded-full bg-bg-soft flex items-center justify-center text-ink-300 mb-4">
                    <Search className="h-7 w-7" />
                  </div>
                  <div className="text-ink font-semibold mb-1">Search for a family</div>
                  <div className="text-sm text-ink-400">
                    Type a last name or phone number to begin check-in.
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-400">
                    <Hint k="Tab" desc="select" />
                    <Hint k="Enter" desc="check in" />
                    <Hint k="Esc" desc="clear" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {matchingHouseholds.map((h) => (
                  <FamilyCard
                    key={h.id}
                    household={h}
                    members={people.filter((p) => p.householdId === h.id)}
                    todayCheckins={todayCheckins}
                    onCheckIn={(personId, isKid) => {
                      const room = isKid ? KIDS_ROOMS[Math.floor(Math.random() * KIDS_ROOMS.length)] : "Sanctuary";
                      checkIn(personId, {
                        service,
                        room,
                        checkedInBy: user?.name,
                      });
                      const person = people.find((p) => p.id === personId);
                      toast.success(`Checked in ${person?.firstName}`, {
                        description: `${room} · ${service}`,
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity feed */}
          <div className="rounded-2xl border border-ink-100 bg-bg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-ink">Recent check-ins</div>
                <div className="text-xs text-ink-400">Live feed</div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>
            <ul className="space-y-2 overflow-y-auto flex-1 max-h-[60vh]">
              {todayCheckins.slice(0, 25).map((a) => {
                const p = people.find((x) => x.id === a.personId);
                if (!p) return null;
                return (
                  <li key={a.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-bg-soft">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-bg-soft flex-shrink-0">
                      <Image src={p.photo} alt="" fill sizes="36px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold text-ink">{p.firstName} {p.lastName}</div>
                      <div className="truncate text-xs text-ink-400">{a.room} · {a.service}</div>
                    </div>
                    {p.status === "Child" && (
                      <span className="text-[10px] font-bold tracking-wider rounded bg-emerald-100 text-emerald-700 px-1.5 py-0.5">
                        KID
                      </span>
                    )}
                  </li>
                );
              })}
              {todayCheckins.length === 0 && (
                <li className="text-center py-12 text-sm text-ink-400">
                  No check-ins yet today.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function FamilyCard({
  household, members, todayCheckins, onCheckIn,
}: {
  household: { id: string; name: string; addressLine1: string };
  members: { id: string; firstName: string; lastName: string; status: string; photo: string }[];
  todayCheckins: { personId: string }[];
  onCheckIn: (personId: string, isKid: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg-soft p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-bold text-ink tracking-tight">{household.name}</div>
          <div className="text-xs text-ink-400">{household.addressLine1}</div>
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-accent">
          <Printer className="h-3.5 w-3.5" /> Print all
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {members.map((m) => {
          const checkedIn = todayCheckins.some((a) => a.personId === m.id);
          return (
            <button
              key={m.id}
              disabled={checkedIn}
              onClick={() => onCheckIn(m.id, m.status === "Child")}
              className={
                checkedIn
                  ? "flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-left cursor-not-allowed"
                  : "flex items-center gap-3 rounded-lg border border-ink-100 bg-bg px-3 py-2.5 text-left hover:border-accent hover:bg-accent-50 transition-colors group"
              }
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-bg-mute flex-shrink-0">
                <Image src={m.photo} alt="" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{m.firstName} {m.lastName}</div>
                <div className="text-xs text-ink-400">{m.status}</div>
              </div>
              {checkedIn ? (
                <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-accent flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LiveStat({ label, value, icon, highlight }: { label: string; value: number; icon: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-xl border border-accent/30 bg-accent-50 p-5" : "rounded-xl border border-ink-100 bg-bg p-5"}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
        <div className={highlight ? "text-accent" : "text-ink-300"}>{icon}</div>
      </div>
      <div className={highlight ? "mt-3 text-3xl font-bold text-accent tracking-tight tabular-nums" : "mt-3 text-3xl font-bold text-ink tracking-tight tabular-nums"}>
        {value}
      </div>
    </div>
  );
}

function Hint({ k, desc }: { k: string; desc: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="rounded bg-bg-soft border border-ink-100 px-1.5 py-0.5 text-[10px] font-mono text-ink-500">{k}</kbd>
      {desc}
    </span>
  );
}
