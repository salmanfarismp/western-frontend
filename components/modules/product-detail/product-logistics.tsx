"use client";

import React from "react";
import {
  Truck,
  Sparkles,
  Clock,
  Wrench,
  MessageSquare,
  Droplets,
  ShieldCheck,
  CloudRain,
} from "lucide-react";
import type { LogisticsSection } from "@/lib/data/product-detail-data";

interface ProductLogisticsProps {
  shipping: LogisticsSection;
  care: LogisticsSection;
}

export function ProductLogistics({ shipping, care }: ProductLogisticsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock":
        return <Clock className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "wrench":
        return <Wrench className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "droplet":
        return <Droplets className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "shield":
        return <ShieldCheck className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      case "cloud":
        return <CloudRain className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
      default:
        return <Sparkles className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full">
      <div className="bg-surface-card rounded-2xl border border-border-subtle/80 p-5 sm:p-7 lg:p-10 shadow-ambient">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] uppercase tracking-widest text-neutral-mineral font-sans font-semibold mb-1.5">
            Care &amp; Delivery Logistics
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso-rich tracking-tight font-normal">
            Maintenance &amp; Delivery
          </h2>
        </div>

        {/* 2 Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Shipping & Delivery */}
          <div className="p-5 sm:p-7 bg-white border border-border-subtle rounded-xl space-y-4 shadow-2xs hover:shadow-ambient transition-shadow">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-espresso-rich">
                  {shipping.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  {shipping.subtitle}
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-espresso-rich pt-1">
              {shipping.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  {getIcon(item.icon)}
                  <span>
                    <strong className="font-semibold text-espresso-rich">
                      {item.title}:
                    </strong>{" "}
                    <span className="text-on-surface-variant">
                      {item.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Care & Maintenance */}
          <div className="p-5 sm:p-7 bg-white border border-border-subtle rounded-xl space-y-4 shadow-2xs hover:shadow-ambient transition-shadow">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-espresso-rich">
                  {care.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  {care.subtitle}
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-espresso-rich pt-1">
              {care.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  {getIcon(item.icon)}
                  <span>
                    <strong className="font-semibold text-espresso-rich">
                      {item.title}:
                    </strong>{" "}
                    <span className="text-on-surface-variant">
                      {item.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
