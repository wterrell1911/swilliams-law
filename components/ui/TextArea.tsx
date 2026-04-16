import { cn } from "@/lib/utils"
import { TextareaHTMLAttributes, forwardRef } from "react"

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border bg-navy-800 px-4 py-3 text-base text-warmWhite placeholder:text-warmWhite/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-navy-600 hover:border-navy-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea }
