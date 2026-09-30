import React from "react";
import { Shield, Sparkles, Droplets } from "lucide-react";
import { CRAFT_PILLARS, CRAFT_METRICS } from "@/lib/data/home-data";

export function CraftStory() {
  const getPillarIcon = (iconType: string) => {
    switch (iconType) {
      case "steel":
        return <Shield className="w-6 h-6 text-primary-container" />;
      case "rattan":
        return <Sparkles className="w-6 h-6 text-primary-container" />;
      case "cushion":
        return <Droplets className="w-6 h-6 text-primary-container" />;
      default:
        return <Shield className="w-6 h-6 text-primary-container" />;
    }
  };

  return (
    <section id="story" className="w-full bg-surface-container py-12 sm:py-16 border-y border-border-subtle/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-moss-deep block mb-1.5 font-sans">
            Architectural Integrity
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-espresso-rich tracking-tight">
            Engineered to Weather Every Season
          </h2>
          <p className="font-sans text-sm text-neutral-mineral mt-2 leading-relaxed">
            From coastal salt air to alpine frost, our swing furniture combines master
            craft techniques with aerospace-grade durability.
          </p>
        </div>

        {/* 3 Craft Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFT_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-surface-card p-6 sm:p-7 rounded-xl shadow-ambient flex flex-col justify-between space-y-5 border border-border-subtle/80"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  {getPillarIcon(pillar.icon)}
                </div>

                <h3 className="font-serif text-lg font-semibold text-espresso-rich">
                  {pillar.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-neutral-mineral leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="pt-2 border-t border-border-subtle/50">
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary-container h-full rounded-full transition-all duration-1000"
                    style={{ width: `${pillar.metricPercentage}%` }}
                  />
                </div>
                <span className="text-[11px] text-neutral-mineral font-sans font-medium mt-1.5 block">
                  {pillar.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Metrics Strip */}
        <div className="mt-12 bg-surface-card rounded-xl p-6 sm:p-8 shadow-ambient grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-border-subtle/80">
          {CRAFT_METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary-container font-semibold block">
                {metric.value}
              </span>
              <span className="block font-sans font-semibold text-xs sm:text-sm text-espresso-rich">
                {metric.label}
              </span>
              <span className="font-sans text-[11px] text-neutral-mineral block">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
