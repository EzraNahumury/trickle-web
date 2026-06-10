import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { EmployerDashboard } from "@/components/app/EmployerDashboard";

export const metadata: Metadata = { title: "Employer" };

export default function EmployerPage() {
  return (
    <AppShell title="Employer" backHref="/app">
      <EmployerDashboard />
    </AppShell>
  );
}
