import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-heading text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(120deg,#7b2cbf,#2563eb)] text-white shadow-[0_0_18px_rgba(var(--glow-violet-rgb),0.45)] hover:shadow-[0_0_28px_rgba(var(--glow-cyan-rgb),0.5)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_0_16px_rgba(239,68,68,0.4)] hover:bg-destructive/90 hover:shadow-[0_0_24px_rgba(239,68,68,0.55)]",
        outline:
          "border border-primary/40 bg-white/5 backdrop-blur-md text-foreground hover:border-neon-cyan hover:bg-white/10 hover:shadow-[0_0_20px_rgba(var(--glow-cyan-rgb),0.3)]",
        secondary:
          "border border-white/10 bg-secondary text-secondary-foreground backdrop-blur-md hover:border-neon-cyan/50 hover:shadow-[0_0_18px_rgba(var(--glow-cyan-rgb),0.25)]",
        ghost:
          "hover:bg-accent/60 hover:text-accent-foreground hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.2)]",
        link: "text-primary underline-offset-4 hover:underline hover:text-neon-cyan",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
