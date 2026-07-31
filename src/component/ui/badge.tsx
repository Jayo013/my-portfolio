import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-heading text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[linear-gradient(120deg,#7b2cbf,#2563eb)] text-white shadow-[0_0_10px_rgba(var(--glow-violet-rgb),0.4)] hover:shadow-[0_0_16px_rgba(var(--glow-cyan-rgb),0.4)]",
        secondary:
          "border-primary/30 bg-white/5 text-secondary-foreground backdrop-blur-sm hover:border-neon-cyan/60 hover:text-neon-cyan hover:shadow-[0_0_12px_rgba(var(--glow-cyan-rgb),0.3)]",
        outline: "border-primary/40 text-foreground hover:border-neon-cyan/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
