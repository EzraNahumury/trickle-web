import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { EmployeeDashboard } from "@/components/app/EmployeeDashboard";

export const metadata: Metadata = { title: "Employee" };

export default function EmployeePage() {
  return (
    <AppShell title="Employee" backHref="/app">
      <EmployeeDashboard />
    </AppShell>
  );
}
