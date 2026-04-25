"use client";
import { Topbar } from "@/components/admin/topbar";
import { EventForm } from "@/components/admin/event-form";

export default function NewEvent() {
  return (
    <>
      <Topbar title="New event" subtitle="Add to the calendar" />
      <EventForm />
    </>
  );
}
