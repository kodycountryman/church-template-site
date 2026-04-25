"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/topbar";
import { EventForm } from "@/components/admin/event-form";
import { useAdminStore } from "@/lib/admin/store";

export default function EditEvent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = useAdminStore((s) => s.events.find((e) => e.slug === slug));
  if (!event) return notFound();

  return (
    <>
      <Topbar title="Edit event" subtitle={event.title} />
      <EventForm initial={event} />
    </>
  );
}
