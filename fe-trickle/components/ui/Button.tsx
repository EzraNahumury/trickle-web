import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

export type Variant = "dark" | "lime" | "outline" | "ghost";
export type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium rounded-full overflow-hidden " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.35rem] px-7 text-base",
};

const variants: Record<Variant, string> = {
  dark: "bg-ink text-on-dark hover:-translate-y-0.5 hover:shadow-lift",
  lime: "bg-lime text-ink hover:bg-lime-2 hover:-translate-y-0.5 hover:shadow-lift",
  outline:
    "border border-ink/15 text-ink bg-transparent hover:border-ink hover:bg-ink hover:text-on-dark",
  ghost: "text-ink hover:bg-ink/[0.05]",
};

/** Shared class string so links (<Button>) and client buttons (LaunchAppButton)
 *  stay visually identical. */
export function getButtonClasses(
  variant: Variant = "dark",
  size: Size = "md",
  className = "",
) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: "right" | "up-right" | "none";
  className?: string;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "dark",
  size = "md",
  icon = "none",
  className = "",
  ...rest
}: ButtonProps) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const cls = getButtonClasses(variant, size, className);

  const content = (
    <>
      {variant === "lime" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 blur-md opacity-0 group-hover:opacity-100 group-hover:[animation:shine_0.9s_ease]"
        />
      )}
      <span className="relative z-10">{children}</span>
      {icon === "right" && (
        <ArrowRight className="relative z-10 size-[1.05em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
      )}
      {icon === "up-right" && (
        <ArrowUpRight className="relative z-10 size-[1.05em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
