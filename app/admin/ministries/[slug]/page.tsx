"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/topbar";
import { MinistryForm } from "@/components/admin/ministry-form";
import { useAdminStore } from "@/lib/admin/store";

export default function EditMinistry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const m = useAdminStore((s) => s.ministries.find((x) => x.slug === slug));
  if (!m) return notFound();
  return (
    <>
      <Topbar title="Edit ministry" subtitle={m.title} />
      <MinistryForm initial={m} />
    </>
  );
}
