import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-headline uppercase text-sm tracking-wider rounded-none select-none transition-[color,background-color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-gold text-ink font-bold hover:bg-gold-hover active:bg-gold-active shadow-none",
        secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-ivory",
        secondaryLight: "border border-ivory/60 bg-transparent text-ivory hover:bg-ivory hover:text-ink",
        outline: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/5",
        ghost: "bg-transparent text-ink hover:bg-ink/10",
        link: "text-ink underline-offset-4 hover:underline p-0 h-auto font-body normal-case font-medium",
      },
      size: {
        default: "h-12 px-7 py-3 text-base min-h-[48px]",
        sm: "h-10 px-5 text-sm min-h-[40px]",
        lg: "h-14 px-9 text-lg min-h-[56px]",
        icon: "h-12 w-12 min-h-[48px]",
      },
      fullWidthMobile: {
        true: "w-full md:w-auto",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidthMobile: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidthMobile, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidthMobile, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
