"use client";

import { useState, useMemo } from "react";
import { Search, Inbox, Sparkles, Reply, Trash2, Mail, MailOpen, Tag } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

type Tab = "all" | "messages" | "leads";

export default function MessagesPage() {
  const messages = useAdminStore((s) => s.messages);
  const leads = useAdminStore((s) => s.leads);
  const markRead = useAdminStore((s) => s.markMessageRead);
  const markLeadRead = useAdminStore((s) => s.markLeadRead);
  const deleteLead = useAdminStore((s) => s.deleteLead);

  const [tab, setTab] = useState<Tab>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = useMemo(() => {
    const m = messages.map((x) => ({ kind: "message" as const, ...x, subject: x.subject }));
    const l = leads.map((x) => ({ kind: "lead" as const, ...x, subject: `${x.church || x.role} — wants a site` }));
    const all = [...m, ...l].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (tab === "messages") return all.filter((x) => x.kind === "message");
    if (tab === "leads") return all.filter((x) => x.kind === "lead");
    return all;
  }, [messages, leads, tab]);

  const selected = items.find((x) => x.id === selectedId) ?? items[0];
  const unread = messages.filter((m) => !m.read).length + leads.filter((l) => !l.read).length;

  function open(item: typeof items[number]) {
    setSelectedId(item.id);
    if (!item.read) {
      if (item.kind === "message") markRead(item.id);
      else markLeadRead(item.id);
    }
  }

  return (
    <>
      <Topbar title="Inbox" subtitle={`${unread} unread`} />

      <div className="grid lg:grid-cols-[24rem_1fr] h-[calc(100vh-4rem)]">
        {/* List */}
        <div className="border-r border-ink-100 bg-bg flex flex-col min-h-0">
          <div className="p-4 border-b border-ink-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input placeholder="Search inbox..." className="w-full rounded-lg border border-ink-100 bg-bg-soft pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:outline-none" />
            </div>
            <div className="flex items-center gap-1">
              {(["all", "messages", "leads"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={tab === t ? "rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white capitalize" : "rounded-md px-3 py-1.5 text-xs font-medium text-ink-500 hover:bg-bg-soft capitalize"}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto divide-y divide-ink-100">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => open(item)}
                  className={
                    selected?.id === item.id
                      ? "w-full text-left px-4 py-3 bg-accent-50 border-l-4 border-accent"
                      : "w-full text-left px-4 py-3 hover:bg-bg-soft border-l-4 border-transparent"
                  }
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      {!item.read && <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />}
                      <span className={item.read ? "truncate text-sm text-ink-700" : "truncate text-sm font-bold text-ink"}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-ink-400 whitespace-nowrap">{relTime(item.createdAt)}</span>
                  </div>
                  <div className="truncate text-xs text-ink-500">{item.subject}</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    {item.kind === "lead" && (
                      <span className="rounded bg-accent-50 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                        LEAD
                      </span>
                    )}
                    <span className="truncate text-[11px] text-ink-400">{item.kind === "message" ? item.email : item.email}</span>
                  </div>
                </button>
              </li>
            ))}
            {items.length === 0 && (
              <li className="text-center py-16 text-ink-400">
                <Inbox className="mx-auto h-7 w-7 mb-3 text-ink-300" />
                Inbox is empty.
              </li>
            )}
          </ul>
        </div>

        {/* Detail */}
        <div className="bg-bg-soft overflow-y-auto">
          {selected ? (
            <div className="max-w-3xl mx-auto p-8 md:p-12">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {selected.kind === "lead" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-bold text-accent">
                        <Sparkles className="h-3 w-3" /> Site lead
                      </span>
                    )}
                  </div>
                  <h2 className="h-display text-3xl text-ink">{selected.subject}</h2>
                  <div className="mt-3 flex items-center gap-3 text-sm text-ink-500">
                    <span className="font-semibold text-ink">{selected.name}</span>
                    <span>·</span>
                    <a href={`mailto:${selected.email}`} className="text-accent hover:underline">{selected.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-bg-mute" title="Mark unread">
                    <MailOpen className="h-4 w-4 text-ink-500" />
                  </button>
                  <button className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-bg-mute" title="Tag">
                    <Tag className="h-4 w-4 text-ink-500" />
                  </button>
                  <button
                    onClick={() => {
                      if (selected.kind === "lead") deleteLead(selected.id);
                      toast.success("Deleted");
                      setSelectedId(null);
                    }}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-bg p-8">
                <div className="text-base text-ink leading-relaxed whitespace-pre-wrap">
                  {selected.kind === "message" ? selected.body : selected.message}
                </div>

                {selected.kind === "lead" && (
                  <div className="mt-8 pt-6 border-t border-ink-100 grid grid-cols-2 gap-4 text-sm">
                    <Detail label="Church" value={selected.church || "—"} />
                    <Detail label="Role" value={selected.role || "—"} />
                  </div>
                )}
              </div>

              {/* Reply */}
              <div className="mt-6 rounded-2xl border border-ink-100 bg-bg p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-3">Reply</div>
                <textarea rows={4} placeholder="Type your reply..." className="w-full rounded-lg border border-ink-100 bg-bg-soft px-4 py-3 text-sm text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none resize-none" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-ink-400">Demo reply — won't actually send</div>
                  <button onClick={() => toast.success("Reply sent (demo)")} className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white hover:bg-accent">
                    <Reply className="h-3.5 w-3.5" /> Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-ink-400">
              <div className="text-center">
                <Mail className="mx-auto h-10 w-10 text-ink-300 mb-3" />
                Select a message to read
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className="mt-1 font-medium text-ink">{value}</div>
    </div>
  );
}

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
