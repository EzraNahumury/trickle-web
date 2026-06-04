import { STACK } from "../site-data";

/**
 * Trust / tech strip — an honest "built on" marquee. These are the real
 * protocols and tools behind Trickle, rendered as wordmarks (we don't ship
 * third-party brand logos we don't have rights to).
 */
export function LogoCloud() {
  const track = [...STACK, ...STACK];
  return (
    <section className="border-y border-line bg-surface-2/60 px-6 py-7 sm:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <p className="shrink-0 text-center text-sm font-medium text-muted lg:max-w-[180px] lg:text-left">
          Built on Celo, surfaced inside MiniPay
        </p>
        <div className="marquee-mask relative w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 pr-10">
            {track.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-xl font-semibold tracking-tight text-ink/55 transition-colors hover:text-ink"
                aria-hidden={i >= STACK.length}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
