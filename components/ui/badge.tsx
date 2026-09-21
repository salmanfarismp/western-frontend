import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] transition-colors select-none",
  {
    variants: {
      variant: {
        botanical:
          "bg-[#e5f8e1] text-moss-deep border border-moss-deep/10",
        terracotta:
          "bg-[#D99377]/15 text-[#C2795B] border border-[#C2795B]/15",
        material:
          "bg-sand-tint text-espresso-rich border border-[#d5c7ab]/40",
        outline:
          "border border-border-subtle bg-transparent text-espresso-rich",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] tracking-[0.05em]",
        md: "px-3 py-1 text-[11px] tracking-[0.06em]",
      },
    },
    defaultVariants: {
      variant: "botanical",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot = false, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              variant === "botanical" && "bg-moss-deep",
              variant === "terracotta" && "bg-[#C2795B]",
              variant === "material" && "bg-espresso-rich",
              variant === "outline" && "bg-neutral-mineral"
            )}
            aria-hidden="true"
          />
        )}
        {icon}
        <span>{children}</span>
      </div>
    );
  }
);

Badge.displayName = "Badge";
