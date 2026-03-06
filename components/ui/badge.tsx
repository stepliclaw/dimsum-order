import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/85",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/85",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline: "text-foreground border-2",
        // Category variants for menu items
        steamed:
          "border-transparent bg-category-steamed text-white hover:bg-category-steamed/85",
        "rice-rolls":
          "border-transparent bg-category-rice-rolls text-white hover:bg-category-rice-rolls/85",
        buns: "border-transparent bg-category-buns text-white hover:bg-category-buns/85",
        fried:
          "border-transparent bg-category-fried text-white hover:bg-category-fried/85",
        noodle:
          "border-transparent bg-category-noodle text-white hover:bg-category-noodle/85",
        dessert:
          "border-transparent bg-category-dessert text-white hover:bg-category-dessert/85",
        other:
          "border-transparent bg-category-other text-white hover:bg-category-other/85",
      },
      size: {
        default: "text-sm px-4 py-2 min-h-[44px]", // Enhanced for elderly
        lg: "text-base px-6 py-3 min-h-[48px]", // Large for elderly
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
