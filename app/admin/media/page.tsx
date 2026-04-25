"use client";

import Image from "next/image";
import { Upload, Search, Folder, Image as ImageIcon, FileAudio, FileVideo, File } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/admin/store";
import { Topbar } from "@/components/admin/topbar";

export default function MediaPage() {
  const media = useAdminStore((s) => s.media);
  const totalSize = "47.3 MB";

  return (
    <>
      <Topbar title="Media" subtitle={`${media.length} files · ${totalSize}`} />

      <div className="p-6 md:p-10 space-y-6">
        {/* Upload zone */}
        <div
          className="rounded-2xl border-2 border-dashed border-ink-200 bg-bg-soft p-12 text-center hover:border-accent transition-colors cursor-pointer"
          onClick={() => toast.success("Demo — pretend that uploaded.")}
        >
          <div className="mx-auto h-12 w-12 inline-flex items-center justify-center rounded-full bg-accent-50 text-accent">
            <Upload className="h-5 w-5" />
          </div>
          <div className="mt-4 text-base font-semibold text-ink">Drop files or click to upload</div>
          <div className="mt-1 text-sm text-ink-400">JPG, PNG, MP3, MP4 · up to 50 MB each</div>
        </div>

        {/* Filter strip */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input placeholder="Search media..." className="w-full rounded-lg border border-ink-100 bg-bg pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-accent focus:outline-none" />
          </div>
          {[
            { label: "All", icon: Folder },
            { label: "Images", icon: ImageIcon },
            { label: "Audio", icon: FileAudio },
            { label: "Video", icon: FileVideo },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <button
                key={f.label}
                className={
                  i === 0
                    ? "inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white"
                    : "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-ink-500 hover:bg-bg-soft"
                }
              >
                <Icon className="h-3.5 w-3.5" /> {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((m) => (
            <button
              key={m.id}
              onClick={() => toast(`Selected ${m.name}`)}
              className="group rounded-xl border border-ink-100 bg-bg overflow-hidden text-left hover:border-accent transition-colors"
            >
              <div className="relative aspect-square bg-bg-mute">
                {m.type === "image" ? (
                  <Image src={m.url} alt={m.name} fill sizes="200px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-ink-400">
                    <File className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="truncate text-xs font-semibold text-ink">{m.name}</div>
                <div className="text-[10px] text-ink-400">{m.size} · {m.type}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
