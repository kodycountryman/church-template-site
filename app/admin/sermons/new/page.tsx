"use client";

import { Topbar } from "@/components/admin/topbar";
import { SermonForm } from "@/components/admin/sermon-form";

export default function NewSermon() {
  return (
    <>
      <Topbar title="New sermon" subtitle="Draft a new message" />
      <SermonForm />
    </>
  );
}
