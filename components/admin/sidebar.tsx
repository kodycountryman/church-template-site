"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Mic, Calendar, Heart, FileText, Inbox,
  Image as ImageIcon, Users, Settings, Sparkles, LogOut,
  ExternalLink, UserCircle, ScanLine, ClipboardList, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/admin/store";

const navGroups = [
  { label: "", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }] },
  {
    label: "People",
    items: [
      { href: "/admin/people", label: "Members", icon: UserCircle },
      { href: "/admin/checkin", label: "Check-in", icon: ScanLine },
      { href: "/admin/schedule", label: "Schedule", icon: ClipboardList },
      { href: "/admin/teams", label: "Teams", icon: Users },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/sermons", label: "Sermons", icon: Mic },
      { href: "/admin/events", label: "Events", icon: Calendar },
      { href: "/admin/ministries", label: "Ministries", icon: Heart },
      { href: "/admin/blog", label: "Journal", icon: FileText },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/messages", label: "Inbox", icon: Inbox },
      { href: "/admin/users", label: "Staff", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

type Props = { mobileOpen: boolean; onMobileClose: () => void };

export function Sidebar({ mobileOpen, onMobileClose }: Props) {
  const [hovered, setHovered] = useState(false);
  // On desktop, sidebar is expanded if hovered. On mobile, expanded means visible.
  const expanded = hovered;

  return (
    <>
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed lg:sticky top-0 z-50 lg:z-auto h-screen flex flex-col border-r border-ink-100 bg-bg transition-[width,transform] duration-200 ease-out",
          // Width: mobile drawer is always 256px; desktop collapses to 64px and expands on hover
          "w-64 lg:w-16",
          expanded && "lg:w-64",
          // Mobile drawer transform
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <SidebarBody expanded={expanded} onItemClick={onMobileClose} />
      </aside>
    </>
  );
}

function SidebarBody({ expanded, onItemClick }: { expanded: boolean; onItemClick: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAdminStore((s) => s.user);
  const messages = useAdminStore((s) => s.messages);
  const leads = useAdminStore((s) => s.leads);
  const logout = useAdminStore((s) => s.logout);
  const inboxCount = messages.filter((m) => !m.read).length + leads.filter((l) => !l.read).length;

  // On mobile (< lg) we're always "expanded" inside the drawer; the `expanded` prop only
  // controls desktop hover state. We use a CSS class that hides labels on lg-collapsed.
  const labelCls = cn(
    "transition-opacity duration-150 whitespace-nowrap",
    expanded ? "opacity-100" : "lg:opacity-0",
  );

  return (
    <>
      {/* Logo + mobile close */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-ink-100 lg:px-5">
        <Link
          href="/admin"
          className="flex items-center text-xl font-bold text-ink tracking-tight overflow-hidden"
          style={{ letterSpacing: "-0.04em" }}
          onClick={onItemClick}
        >
          <span className="flex-shrink-0">K<span className="text-accent">.</span></span>
          <span className={labelCls}>indred<span className="text-accent">.</span></span>
        </Link>
        <button
          onClick={onItemClick}
          className="lg:hidden h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-bg-soft text-ink-500"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-5" : ""}>
            {group.label && (
              <div className={cn("mx-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-300 h-4", labelCls)}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              const showBadge = item.href === "/admin/messages" && inboxCount > 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onItemClick}
                  title={item.label}
                  className={cn(
                    "group/item relative flex items-center gap-3 rounded-lg h-10 px-3 text-sm font-medium transition-colors mb-0.5 whitespace-nowrap overflow-hidden",
                    active
                      ? "bg-ink text-white"
                      : "text-ink-500 hover:bg-bg-soft hover:text-ink",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      active ? "text-white" : "text-ink-400 group-hover/item:text-ink",
                    )}
                  />
                  <span className={cn("flex-1", labelCls)}>{item.label}</span>
                  {showBadge && expanded && (
                    <span
                      className={cn(
                        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                        active ? "bg-white text-ink" : "bg-accent text-white",
                      )}
                    >
                      {inboxCount}
                    </span>
                  )}
                  {showBadge && !expanded && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        <div className={cn("mt-6 mx-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-300 h-4", labelCls)}>
          Site
        </div>
        <Link
          href="/"
          target="_blank"
          title="View live site"
          className="flex items-center gap-3 rounded-lg h-10 px-3 text-sm font-medium text-ink-500 hover:bg-bg-soft hover:text-ink whitespace-nowrap overflow-hidden"
        >
          <ExternalLink className="h-4 w-4 text-ink-400 flex-shrink-0" />
          <span className={labelCls}>View live site</span>
        </Link>
      </nav>

      {/* Demo notice — collapse height when collapsed */}
      <div
        className={cn(
          "mx-2 overflow-hidden transition-all duration-200",
          expanded ? "opacity-100 max-h-32 mb-2" : "lg:opacity-0 lg:max-h-0 lg:mb-0",
        )}
      >
        <div className="rounded-xl border border-accent/20 bg-accent-50 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent whitespace-nowrap">
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" /> Demo mode
          </div>
          <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">
            Edits save to your session. Refresh keeps state.
          </p>
        </div>
      </div>

      {/* User card */}
      {user && (
        <div className="border-t border-ink-100 p-2">
          <div className="flex items-center gap-3 rounded-lg p-2 whitespace-nowrap overflow-hidden">
            <Image src={user.avatar} alt="" width={32} height={32} className="rounded-full flex-shrink-0" />
            <div className={cn("flex-1 min-w-0", labelCls)}>
              <div className="truncate text-sm font-semibold text-ink">{user.name}</div>
              <div className="truncate text-xs text-ink-400">{user.email}</div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className={cn("text-ink-400 hover:text-ink flex-shrink-0", labelCls)}
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
