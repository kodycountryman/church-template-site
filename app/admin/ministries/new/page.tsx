"use client";
import { Topbar } from "@/components/admin/topbar";
import { MinistryForm } from "@/components/admin/ministry-form";

export default function NewMinistry() {
  return (
    <>
      <Topbar title="New ministry" />
      <MinistryForm />
    </>
  );
}
