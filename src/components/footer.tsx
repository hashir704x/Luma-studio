import Link from "next/link";

import { FEATURED_STYLES, FOOTER_QUICK_LINKS } from "@/lib/constants";
import { Suspense } from "react";
import { headers } from "next/headers";

export default function Footer() {
  return (
    <footer className="mt-6 rounded-[2rem] border border-border/60 bg-card px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-border/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="caps-sm text-sm font-semibold uppercase text-primary">
              Luma Studio
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Classic, private, and beautifully focused AI style transfer.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Transform portraits and scenes with curated visual styles while
              keeping composition, subject identity, and overall image character
              at the center.
            </p>
          </div>
        </div>

        <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-foreground">About</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              A premium studio for high-fidelity image restyling with curated
              presets, private results, and a calm workflow that feels polished
              from upload to final output.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Navigation</p>
            <div className="mt-4 flex flex-col gap-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={link.href === "/studio" ? false : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Featured styles
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FEATURED_STYLES.map((style) => (
                <span
                  key={style}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Hello</div>}>
        <FooterCopyright />
      </Suspense>
    </footer>
  );
}

async function FooterCopyright() {
  await headers();
  const year = new Date().getFullYear();
  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {year} Luma Studio</p>
      <p>Private by default. Curated by design.</p>
    </div>
  );
}
