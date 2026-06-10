import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = { title: "App" };

const ROLES = [
  {
    href: "/app/employer",
    label: "Employer",
    title: "I pay people",
    body: "Fund the vault, open per-second streams, manage payroll and runway.",
    dark: true,
  },
  {
    href: "/app/employee",
    label: "Employee",
    title: "I get paid",
    body: "Watch your salary accrue live and withdraw whenever you need it.",
    dark: false,
  },
] as const;

export default function AppHome() {
  return (
    <AppShell title="Choose your role">
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="text-center text-3xl sm:text-4xl">
          How are you using Trickle?
        </h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ROLES.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className={`card-hover group flex min-h-[220px] flex-col justify-between rounded-card border p-7 ${
                role.dark
                  ? "border-line-dark bg-ink text-on-dark hover:shadow-lift"
                  : "border-line bg-surface text-ink hover:border-ink/25 hover:shadow-lift"
              }`}
            >
              <span
                className={`inline-flex w-fit items-center rounded-lg px-2.5 py-1 text-sm font-medium ${
                  role.dark ? "bg-lime text-ink" : "bg-ink text-on-dark"
                }`}
              >
                {role.label}
              </span>
              <div>
                <h2
                  className={`text-2xl ${role.dark ? "text-on-dark" : "text-ink"}`}
                >
                  {role.title}
                </h2>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    role.dark ? "text-on-dark-muted" : "text-muted"
                  }`}
                >
                  {role.body}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  role.dark ? "text-lime" : "text-ink"
                }`}
              >
                Enter
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
