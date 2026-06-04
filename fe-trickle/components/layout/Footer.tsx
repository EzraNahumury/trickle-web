import { Logo } from "../ui/Logo";
import { Github, Telegram, ArrowUpRight } from "../ui/icons";
import { FOOTER_GROUPS, LINKS } from "../site-data";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="bg-grid-dark relative mx-auto max-w-[1280px] overflow-hidden rounded-section bg-ink px-7 py-14 text-on-dark sm:px-12 sm:py-16">
        <div className="relative grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-on-dark-muted">
              Real-time payroll streaming on Celo. Salary that accrues at the
              cadence people actually live — by the second, not by the month.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trickle on GitHub"
                className="grid size-10 place-items-center rounded-full border border-white/15 text-on-dark transition-colors hover:border-lime hover:bg-lime hover:text-ink"
              >
                <Github />
              </a>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trickle on Telegram"
                className="grid size-10 place-items-center rounded-full border border-white/15 text-on-dark transition-colors hover:border-lime hover:bg-lime hover:text-ink"
              >
                <Telegram />
              </a>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-on-dark-muted">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group inline-flex items-center gap-1 text-[0.95rem] text-on-dark/90 transition-colors hover:text-lime"
                        >
                          {link.label}
                          {external && (
                            <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-sm text-on-dark-muted sm:flex-row sm:items-center">
          <p>© 2026 Trickle · MIT licensed · open source.</p>
          <p className="inline-flex items-center gap-2">
            <span className="relative inline-flex size-1.5">
              <span className="live-dot absolute inset-0 rounded-full bg-lime" />
            </span>
            Shipped for the Celo Proof of Ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
