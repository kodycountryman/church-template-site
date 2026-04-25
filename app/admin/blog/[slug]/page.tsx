"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/topbar";
import { PostForm } from "@/components/admin/post-form";
import { useAdminStore } from "@/lib/admin/store";

export default function EditPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const p = useAdminStore((s) => s.posts.find((x) => x.slug === slug));
  if (!p) return notFound();
  return (
    <>
      <Topbar title="Edit post" subtitle={p.title} />
      <PostForm initial={p} />
    </>
  );
}
