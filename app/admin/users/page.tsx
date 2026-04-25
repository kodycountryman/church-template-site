"use client";

import Image from "next/image";
import { Plus, MoreHorizontal, Shield, Edit3 } from "lucide-react";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function StaffPage() {
  const users = useAdminStore((s) => s.users);

  return (
    <>
      <Topbar title="Staff" subtitle={`${users.length} team members`} cta={{ label: "Invite member", href: "#" }} />

      <div className="p-6 md:p-10 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="Admins" value={users.filter((u) => u.role === "Admin").length} />
          <Stat label="Editors" value={users.filter((u) => u.role === "Editor").length} />
          <Stat label="Authors" value={users.filter((u) => u.role === "Author").length} />
        </div>

        <div className="overflow-hidden rounded-xl border border-ink-100 bg-bg">
          <table className="w-full text-sm">
            <thead className="bg-bg-soft text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3 hidden md:table-cell">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 hidden lg:table-cell">Last active</th>
                <th className="px-5 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-bg-soft">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 overflow-hidden rounded-full bg-bg-soft">
                        <Image src={u.avatar} alt="" fill sizes="36px" className="object-cover" />
                      </div>
                      <span className="font-semibold text-ink">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-ink-500">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={
                      u.role === "Admin"
                        ? "inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent"
                        : u.role === "Editor"
                          ? "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700"
                          : "inline-flex items-center gap-1 rounded-full bg-bg-mute px-2.5 py-0.5 text-xs font-semibold text-ink-500"
                    }>
                      <Shield className="h-3 w-3" /> {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{u.lastActive}</td>
                  <td className="px-5 py-3">
                    <button className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-bg-mute">
                      <MoreHorizontal className="h-4 w-4 text-ink-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Roles legend */}
        <div className="rounded-2xl border border-ink-100 bg-bg p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-4">
            Role permissions
          </div>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <RoleCard
              role="Admin"
              perms={["Full access", "Manage staff", "Edit settings", "View finances"]}
              tone="accent"
            />
            <RoleCard
              role="Editor"
              perms={["Publish content", "Manage events", "Manage people", "Cannot edit settings"]}
              tone="emerald"
            />
            <RoleCard
              role="Author"
              perms={["Draft posts", "Submit for review", "View only on people"]}
              tone="ink"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-bg p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className="mt-2 text-3xl font-bold text-ink tracking-tight">{value}</div>
    </div>
  );
}

function RoleCard({ role, perms, tone }: { role: string; perms: string[]; tone: "accent" | "emerald" | "ink" }) {
  const cls =
    tone === "accent" ? "border-accent/30 bg-accent-50" :
    tone === "emerald" ? "border-emerald-200 bg-emerald-50" :
    "border-ink-100 bg-bg-soft";
  return (
    <div className={`rounded-xl border ${cls} p-5`}>
      <div className="text-base font-bold text-ink">{role}</div>
      <ul className="mt-3 space-y-1.5 text-xs text-ink-700">
        {perms.map((p) => <li key={p}>· {p}</li>)}
      </ul>
    </div>
  );
}
