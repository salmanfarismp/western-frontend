export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  category: "canvas-surface" | "brand-earth" | "materials-accents" | "system";
  description: string;
}

export const COLOR_PALETTE: ColorToken[] = [
  // Canvas & Surfaces
  {
    name: "canvas-linen",
    variable: "--color-canvas-linen",
    hex: "#FAF8F5",
    category: "canvas-surface",
    description: "Foundational warm linen canvas background; replaces sterile white.",
  },
  {
    name: "surface-cream",
    variable: "--color-surface-cream",
    hex: "#F3EFEA",
    category: "canvas-surface",
    description: "Tactile cream for secondary container backgrounds.",
  },
  {
    name: "surface-card",
    variable: "--color-surface-card",
    hex: "#FFFFFF",
    category: "canvas-surface",
    description: "Pure white surface reserved for product photography cards.",
  },
  {
    name: "surface",
    variable: "--color-surface",
    hex: "#fdf9f1",
    category: "canvas-surface",
    description: "Warm neutral surface tone.",
  },
  {
    name: "surface-dim",
    variable: "--color-surface-dim",
    hex: "#dddad2",
    category: "canvas-surface",
    description: "Dimmed ambient surface tint.",
  },
  {
    name: "surface-container-low",
    variable: "--color-surface-container-low",
    hex: "#f7f3ec",
    category: "canvas-surface",
    description: "Lowest contrast container background.",
  },
  {
    name: "surface-container",
    variable: "--color-surface-container",
    hex: "#f1ede6",
    category: "canvas-surface",
    description: "Standard container surface fill.",
  },
  {
    name: "surface-container-high",
    variable: "--color-surface-container-high",
    hex: "#ece8e0",
    category: "canvas-surface",
    description: "Elevated container surface fill.",
  },
  {
    name: "surface-container-highest",
    variable: "--color-surface-container-highest",
    hex: "#e6e2db",
    category: "canvas-surface",
    description: "Highest elevation container surface fill.",
  },

  // Brand Earth Tones
  {
    name: "primary-container (organic sage)",
    variable: "--color-primary-container",
    hex: "#627361",
    category: "brand-earth",
    description: "Core organic sage green; primary action highlights and branding.",
  },
  {
    name: "moss-deep",
    variable: "--color-moss-deep",
    hex: "#475546",
    category: "brand-earth",
    description: "Deep forest moss for hover states and high-contrast text.",
  },
  {
    name: "moss-light",
    variable: "--color-moss-light",
    hex: "#8D9E8C",
    category: "brand-earth",
    description: "Softer botanical sage for subtle badges and secondary accents.",
  },
  {
    name: "espresso-rich",
    variable: "--color-espresso-rich",
    hex: "#251B17",
    category: "brand-earth",
    description: "Grounding deep espresso wood tone; replaces harsh pure blacks.",
  },
  {
    name: "neutral-mineral",
    variable: "--color-neutral-mineral",
    hex: "#76746E",
    category: "brand-earth",
    description: "Balanced mineral gray for secondary UI copy and dividers.",
  },

  // Materials & Accents
  {
    name: "terracotta-soft",
    variable: "--color-terracotta-soft",
    hex: "#D99377",
    category: "materials-accents",
    description: "Warm sunbaked terracotta accent for tags and highlights.",
  },
  {
    name: "terracotta-rich",
    variable: "--color-terracotta-rich",
    hex: "#C2795B",
    category: "materials-accents",
    description: "High-contrast terracotta for accent typography and badges.",
  },
  {
    name: "sand-tint",
    variable: "--color-sand-tint",
    hex: "#E8DEC8",
    category: "materials-accents",
    description: "Tactile sand tone for material badges and chips.",
  },
  {
    name: "border-subtle",
    variable: "--color-border-subtle",
    hex: "#E4DDD3",
    category: "materials-accents",
    description: "1px structural divider border maintaining a tactile, soft touch.",
  },

  // System
  {
    name: "error",
    variable: "--color-error",
    hex: "#ba1a1a",
    category: "system",
    description: "System error and urgent validation state.",
  },
  {
    name: "error-container",
    variable: "--color-error-container",
    hex: "#ffdad6",
    category: "system",
    description: "Soft container fill for alerts and errors.",
  },
];

export interface TypographyPreset {
  name: string;
  className: string;
  fontFamily: "Playfair Display" | "Plus Jakarta Sans";
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
  sampleText: string;
}

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    name: "Display Hero",
    className: "font-display-hero",
    fontFamily: "Playfair Display",
    fontSize: "56px (3.5rem)",
    lineHeight: "68px",
    fontWeight: "600",
    letterSpacing: "-0.02em",
    sampleText: "Slow Outdoor Living",
  },
  {
    name: "Headline Large",
    className: "font-headline-lg",
    fontFamily: "Playfair Display",
    fontSize: "40px (2.5rem)",
    lineHeight: "50px",
    fontWeight: "600",
    letterSpacing: "-0.015em",
    sampleText: "Curated Patio Sanctuaries",
  },
  {
    name: "Headline Medium",
    className: "font-headline-md",
    fontFamily: "Playfair Display",
    fontSize: "28px (1.75rem)",
    lineHeight: "36px",
    fontWeight: "500",
    letterSpacing: "-0.01em",
    sampleText: "Handcrafted Solid Teak & All-Weather Wicker",
  },
  {
    name: "Headline Small",
    className: "font-headline-sm",
    fontFamily: "Playfair Display",
    fontSize: "22px (1.375rem)",
    lineHeight: "30px",
    fontWeight: "500",
    sampleText: "Artisanal Outdoor Loungers",
  },
  {
    name: "Title Large",
    className: "font-title-lg",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "18px (1.125rem)",
    lineHeight: "26px",
    fontWeight: "600",
    sampleText: "Architectural proportions for contemporary veranda spaces.",
  },
  {
    name: "Title Medium",
    className: "font-title-md",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "16px (1rem)",
    lineHeight: "24px",
    fontWeight: "600",
    sampleText: "Serenade Hanging Egg Lounger",
  },
  {
    name: "Body Large",
    className: "font-body-lg",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "18px (1.125rem)",
    lineHeight: "28px",
    fontWeight: "400",
    sampleText:
      "Drawing inspiration from tactile organic minimalism and quiet luxury, integrating soothing sun-dappled neutrals.",
  },
  {
    name: "Body Medium",
    className: "font-body-md",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "15px (0.9375rem)",
    lineHeight: "24px",
    fontWeight: "400",
    sampleText:
      "Wide aperture and contemporary proportion guarantee effortless legibility across specifications and narrative blocks.",
  },
  {
    name: "Body Small",
    className: "font-body-sm",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "13px (0.8125rem)",
    lineHeight: "20px",
    fontWeight: "400",
    sampleText: "Natural teak grain with weatherproof outdoor finish. 10-year warranty included.",
  },
  {
    name: "Label Large",
    className: "font-label-lg",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "14px (0.875rem)",
    lineHeight: "20px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    sampleText: "EXPLORE COLLECTION",
  },
  {
    name: "Label Medium",
    className: "font-label-md",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "12px (0.75rem)",
    lineHeight: "16px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    sampleText: "SPECIFICATIONS & CARE",
  },
  {
    name: "Label Caption",
    className: "font-label-caption",
    fontFamily: "Plus Jakarta Sans",
    fontSize: "11px (0.6875rem)",
    lineHeight: "14px",
    fontWeight: "500",
    letterSpacing: "0.06em",
    sampleText: "ALL-WEATHER WICKER",
  },
];
