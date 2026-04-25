"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MoreHorizontal, Edit3, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function BlogAdmin() {
  const posts = useAdminStore((s) => s.posts);
  const remove = useAdminStore((s) => s.deletePost);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <Topbar title="Journal" subtitle={`${posts.length} posts`} cta={{ label: "New post", href: "/admin/blog/new" }} />

      <div className="p-6 md:p-10">
        <div className="overflow-hidden rounded-xl border border-ink-100 bg-bg">
          <table className="w-full text-sm">
            <thead className="bg-bg-soft text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              <tr>
                <th className="px-5 py-3">Post</th>
                <th className="px-5 py-3 hidden md:table-cell">Tag</th>
                <th className="px-5 py-3 hidden lg:table-cell">Author</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 hidden lg:table-cell">Read time</th>
                <th className="px-5 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {posts.map((p) => (
                <tr key={p.slug} className="hover:bg-bg-soft">
                  <td className="px-5 py-3">
                    <Link href={`/admin/blog/${p.slug}`} className="flex items-center gap-3 group">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md bg-bg-mute flex-shrink-0">
                        <Image src={p.cover} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-ink group-hover:text-accent">{p.title}</div>
                        <div className="truncate text-xs text-ink-400">{p.excerpt}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="rounded-md bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent">{p.tag}</span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{p.author}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-ink-500">{p.date}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-ink-500">{p.readTime}</td>
                  <td className="px-5 py-3 relative">
                    <button onClick={() => setOpenMenu(openMenu === p.slug ? null : p.slug)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-bg-mute">
                      <MoreHorizontal className="h-4 w-4 text-ink-500" />
                    </button>
                    {openMenu === p.slug && (
                      <div className="absolute right-3 top-12 z-10 w-44 rounded-lg border border-ink-100 bg-bg shadow-[var(--shadow-elevated)]">
                        <Link href={`/admin/blog/${p.slug}`} className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft"><Edit3 className="h-3.5 w-3.5" /> Edit</Link>
                        <Link href={`/blog/${p.slug}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-bg-soft"><ExternalLink className="h-3.5 w-3.5" /> View live</Link>
                        <button onClick={() => { remove(p.slug); toast.success(`Deleted "${p.title}"`); setOpenMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-ink-100"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
