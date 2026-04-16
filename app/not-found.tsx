import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/animations/FadeIn"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 px-4">
      <FadeIn className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl font-display font-bold text-gradient mb-4">404</div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-warmWhite/80 mb-8">
            Looks like you&apos;ve wandered into uncharted territory. The page you&apos;re looking
            for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" variant="primary">
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-12 border-t border-navy-700">
          <p className="text-warmWhite/60 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/practice-areas"
              className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors"
            >
              Practice Areas
            </Link>
            <span className="text-warmWhite/40">•</span>
            <Link
              href="/about"
              className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors"
            >
              About
            </Link>
            <span className="text-warmWhite/40">•</span>
            <Link
              href="/blog"
              className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
