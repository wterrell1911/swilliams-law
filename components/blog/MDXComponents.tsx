import { HTMLAttributes } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const mdxComponents = {
  h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-4xl font-display font-bold text-warmWhite mt-8 mb-4 scroll-mt-20",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-3xl font-display font-bold text-warmWhite mt-12 mb-4 scroll-mt-20",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-2xl font-semibold text-warmWhite mt-8 mb-3 scroll-mt-20",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "text-xl font-semibold text-warmWhite mt-6 mb-2 scroll-mt-20",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("text-warmWhite/80 leading-relaxed mb-6 text-lg", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("list-disc list-inside text-warmWhite/80 mb-6 space-y-2 text-lg", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "list-decimal list-inside text-warmWhite/80 mb-6 space-y-2 text-lg",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("ml-4", className)} {...props} />
  ),
  a: ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "text-electric-500 hover:text-electric-400 underline underline-offset-4 transition-colors",
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 border-gold-500 pl-6 italic text-warmWhite/90 my-6 bg-navy-800/50 py-4 rounded-r-lg",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-navy-800 text-gold-400 px-1.5 py-0.5 rounded text-sm font-mono",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "bg-navy-950 border border-navy-700 rounded-lg p-6 overflow-x-auto mb-6",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("border-navy-700 my-12", className)} {...props} />
  ),
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        className={cn("min-w-full border border-navy-700 rounded-lg", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "bg-navy-800 text-warmWhite font-semibold p-3 text-left border-b border-navy-700",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("text-warmWhite/80 p-3 border-b border-navy-700", className)}
      {...props}
    />
  ),
}
