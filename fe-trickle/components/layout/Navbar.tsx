"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Menu, Close } from "../ui/icons";
import { LaunchAppButton } from "../web3/LaunchAppButton";
import { NAV_LINKS } from "../site-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-full border px-3 py-2.5 pl-5 transition-all duration-300 ease-[var(--ease-out-expo)] sm:pl-6 ${
          scrolled
            ? "border-ink/10 bg-surface/85 shadow-soft backdrop-blur-xl"
            : "border-ink/[0.06] bg-surface/70 shadow-[0_10px_34px_-20px_rgba(10,10,10,0.4)] backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="Trickle — home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-full px-4 py-2 text-[0.93rem] font-medium text-muted transition-colors duration-200 hover:bg-ink/[0.05] hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <span aria-hidden className="hidden h-5 w-px bg-line md:block" />
          <LaunchAppButton
            variant="dark"
            size="md"
            className="hidden sm:inline-flex"
          />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet — `inert` when closed removes its links/CTA from the
          focus order and the accessibility tree (not just pointer events). */}
      <div
        className={`fixed inset-0 top-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        inert={!open || undefined}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[84px] origin-top rounded-3xl border border-ink/10 bg-surface p-4 shadow-lift transition-all duration-300 ease-[var(--ease-out-expo)] ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.98] opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-surface-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LaunchAppButton
            variant="lime"
            size="lg"
            className="mt-3 w-full"
            onActivate={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
