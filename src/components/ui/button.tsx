import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 shadow-lg shadow-blue-500/30",
        gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 hover:scale-105 shadow-lg shadow-blue-500/50",
        outline: "border-2 border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500 hover:text-white hover:scale-105",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105",
        ghost: "bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
      },
      size: {
        sm: "h-9 px-4 py-2 text-xs",
        default: "h-10 px-6 py-3 text-sm",
        lg: "h-12 px-8 py-4 text-base",
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
