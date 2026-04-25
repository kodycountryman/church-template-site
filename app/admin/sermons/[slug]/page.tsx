"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/topbar";
import { SermonForm } from "@/components/admin/sermon-form";
import { useAdminStore } from "@/lib/admin/store";

export default function EditSermon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const sermon = useAdminStore((s) => s.sermons.find((x) => x.slug === slug));
  if (!sermon) return notFound();

  return (
    <>
      <Topbar title="Edit sermon" subtitle={sermon.title} />
      <SermonForm initial={sermon} />
    </>
  );
}
