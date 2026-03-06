import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg border-2 border-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-lg border-2 border-destructive/20",
        outline:
          "border-4 border-primary bg-background hover:bg-primary/10 hover:text-primary shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75 shadow-md border-2 border-secondary/30",
        ghost:
          "hover:bg-accent/30 hover:text-accent-foreground border-2 border-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        category: "text-white shadow-lg border-2 border-white/20", // For category badges
      },
      size: {
        default: "h-12 px-6 text-base [&_svg]:w-6 [&_svg]:h-6", // Enhanced from h-10
        sm: "h-11 rounded-md px-5 text-sm [&_svg]:w-5 [&_svg]:h-5", // Enhanced from h-9
        lg: "h-14 rounded-md px-10 text-lg [&_svg]:w-7 [&_svg]:h-7", // Enhanced for elderly
        xl: "h-16 rounded-md px-12 text-xl [&_svg]:w-8 [&_svg]:h-8", // Extra large for elderly
        icon: "h-12 w-12 [&_svg]:w-7 [&_svg]:h-7", // Enhanced from h-10 w-10
        "icon-lg": "h-14 w-14 [&_svg]:w-8 [&_svg]:h-8", // Large icon for primary actions
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Icon size variants for elderly users
export const iconSizes = {
  sm: { width: "w-5", height: "h-5" }, // 20px
  md: { width: "w-6", height: "h-6" }, // 24px
  lg: { width: "w-7", height: "h-7" }, // 28px
  xl: { width: "w-8", height: "h-8" }, // 32px
};

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconSize?: "sm" | "md" | "lg" | "xl";
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconSize = "lg",
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconPosition === "right" ? <>{children}</> : <>{children}</>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
