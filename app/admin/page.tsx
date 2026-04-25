"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, Mic, Calendar, Inbox, Users } from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";
import { GivingChart } from "@/components/admin/giving-chart";

export default function Dashboard() {
  const sermons = useAdminStore((s) => s.sermons);
  const events = useAdminStore((s) => s.events);
  const messages = useAdminStore((s) => s.messages);
  const leads = useAdminStore((s) => s.leads);
  const donations = useAdminStore((s) => s.donations);
  const rsvps = useAdminStore((s) => s.rsvps);
  const user = useAdminStore((s) => s.user);

  const month = donations
    .filter((d) => Date.now() - new Date(d.createdAt).getTime() < 30 * 86400_000)
    .reduce((a, b) => a + b.amount, 0);
  const monthlyDonors = new Set(
    donations.filter((d) => d.frequency === "monthly").map((d) => d.donor),
  ).size;
  const inbox = messages.filter((m) => !m.read).length + leads.filter((l) => !l.read).length;

  const upcoming = [...events]
    .filter((e) => new Date(e.starts).getTime() > Date.now() - 86400_000)
    .sort((a, b) => a.starts.localeCompare(b.starts))
    .slice(0, 4);

  const recent = [
    ...messages.slice(0, 3).map((m) => ({
      kind: "message" as const,
      title: `${m.name} \u2014 ${m.subject}`,
      sub: m.body,
      time: m.createdAt,
      href: "/admin/messages",
    })),
    ...rsvps.slice(0, 3).map((r) => ({
      kind: "rsvp" as const,
      title: `${r.name} RSVP'd`,
      sub: events.find((e) => e.slug === r.eventSlug)?.title ?? r.eventSlug,
      time: r.createdAt,
      href: "/admin/events",
    })),
  ]
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, 6);

  return (
    <>
      <Topbar
        title={`Good morning, ${user?.name?.split(" ")[0] ?? "there"}.`}
        subtitle="Here's what's happening at Kindred today."
      />

      <div className="p-6 md:p-10 space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Giving (30 days)"
            value={`$${month.toLocaleString()}`}
            sub={`${monthlyDonors} monthly partners`}
            icon={<TrendingUp />}
            trend="+12.4%"
          />
          <Stat
            label="Sermons published"
            value={String(sermons.length)}
            sub="3 series active"
            icon={<Mic />}
          />
          <Stat
            label="Upcoming events"
            value={String(events.length)}
            sub={`${rsvps.length} RSVPs`}
            icon={<Calendar />}
          />
          <Stat
            label="Inbox"
            value={String(inbox)}
            sub={`${messages.length + leads.length} total`}
            icon={<Inbox />}
            highlight={inbox > 0}
          />
        </div>

        {/* Chart + activity */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-ink">Giving trend</div>
                <div className="text-xs text-ink-400">Last 60 days</div>
              </div>
              <Link href="#" className="text-xs font-medium text-accent hover:underline">
                Open report →
              </Link>
            </div>
            <GivingChart />
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-ink">Recent activity</div>
                <div className="text-xs text-ink-400">Last 24 hours</div>
              </div>
            </div>
            <ul className="space-y-3">
              {recent.map((r, i) => (
                <li key={i}>
                  <Link href={r.href} className="group flex items-start gap-3 rounded-lg p-2 -m-2 hover:bg-bg-soft">
                    <div
                      className={
                        r.kind === "message"
                          ? "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent-50 text-accent"
                          : "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-bg-mute text-ink-500"
                      }
                    >
                      {r.kind === "message" ? <Inbox className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-medium text-ink group-hover:text-accent">
                        {r.title}
                      </div>
                      <div className="truncate text-xs text-ink-400">{r.sub}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Latest sermon + upcoming events */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-ink">Latest sermon</div>
                <div className="text-xs text-ink-400">Most recently published</div>
              </div>
              <Link href="/admin/sermons" className="text-xs font-medium text-accent hover:underline">
                Manage →
              </Link>
            </div>
            {sermons[0] && (
              <Link href={`/admin/sermons`} className="group flex gap-4">
                <div className="relative h-24 w-32 overflow-hidden rounded-lg bg-bg-mute flex-shrink-0">
                  <Image src={sermons[0].cover} alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {sermons[0].series}
                  </div>
                  <div className="mt-1 text-base font-bold text-ink tracking-tight group-hover:text-accent">
                    {sermons[0].title}
                  </div>
                  <div className="mt-2 text-xs text-ink-400">
                    {sermons[0].speaker} · {sermons[0].date} · {sermons[0].duration}
                  </div>
                </div>
              </Link>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-ink">Upcoming events</div>
                <div className="text-xs text-ink-400">Next four</div>
              </div>
              <Link href="/admin/events" className="text-xs font-medium text-accent hover:underline">
                Manage →
              </Link>
            </div>
            <ul className="space-y-3">
              {upcoming.map((e) => {
                const d = new Date(e.starts);
                return (
                  <li key={e.slug} className="flex items-center gap-4 border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                    <div className="rounded-lg bg-bg-mute px-3 py-1.5 text-center min-w-14">
                      <div className="text-[9px] font-bold tracking-[0.2em] text-accent">
                        {d.toLocaleString("en-US", { month: "short" }).toUpperCase()}
                      </div>
                      <div className="text-base font-bold text-ink">{d.getDate()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold text-ink">{e.title}</div>
                      <div className="text-xs text-ink-400">
                        {d.toLocaleString("en-US", { weekday: "long", hour: "numeric", minute: "2-digit" })}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-300" />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  sub,
  icon,
  trend,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  trend?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
        <div className={highlight ? "text-accent" : "text-ink-300"}>{icon}</div>
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <div className="text-3xl font-bold text-ink tracking-tight">{value}</div>
        {trend && <div className="text-xs font-semibold text-emerald-600">{trend}</div>}
      </div>
      {sub && <div className="mt-1 text-xs text-ink-400">{sub}</div>}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg p-5">
      {children}
    </div>
  );
}
