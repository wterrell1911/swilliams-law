import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900",
          {
            "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-lg shadow-gold-500/25 hover:shadow-gold-400/30":
              variant === "primary",
            "bg-navy-800 text-warmWhite hover:bg-navy-700 border border-navy-600":
              variant === "secondary",
            "border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-950":
              variant === "outline",
            "text-warmWhite hover:bg-navy-800": variant === "ghost",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
