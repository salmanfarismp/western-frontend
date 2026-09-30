import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full">
      {/* Primary Free Delivery Banner */}
      <aside className="w-full bg-primary-container text-surface-card text-center py-2 px-4 sm:px-6">
        <p className="text-xs uppercase tracking-wider font-semibold text-white font-sans">
          Free delivery all over Kerala
        </p>
      </aside>

      {/* Secondary Subtle Notification Strip */}
      <section className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-2.5 border-b border-border-subtle/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-espresso-rich text-xs gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full bg-moss-deep shrink-0 animate-pulse"
              aria-hidden="true"
            />
            <span className="tracking-wider uppercase font-semibold text-espresso-rich">
              Spring Sanctuary Curation
            </span>
            <span className="text-neutral-mineral/60 hidden sm:inline">/</span>
            <span className="text-neutral-mineral hidden sm:inline">
              Curated hand-turned rattan &amp; reclaimed teak collections available
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-mineral">
            <span className="flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-container" />
              Artisanal Workshop in Austin, TX
            </span>
            <span className="hidden sm:inline text-neutral-mineral/40">•</span>
            <Link
              href="#lookbook"
              className="hidden sm:inline-flex items-center gap-1 hover:text-primary-container font-semibold transition-colors"
            >
              <span>View Veranda Gallery</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
