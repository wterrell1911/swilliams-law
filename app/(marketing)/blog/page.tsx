import type { Metadata } from "next"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { getAllPosts } from "@/lib/mdx"
import { pageMetadata } from "@/config/seo"

export const metadata: Metadata = {
  title: pageMetadata.blog.title,
  description: pageMetadata.blog.description,
  keywords: pageMetadata.blog.keywords,
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} className="mb-8" />

        {/* Hero */}
        <ScrollReveal className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-warmWhite mb-6">
            Legal Insights & <span className="text-gold-500">Resources</span>
          </h1>
          <p className="text-xl text-warmWhite/80 leading-relaxed">
            Expert insights on personal injury law, workers&apos; compensation, and your legal rights in Georgia and Mississippi.
          </p>
        </ScrollReveal>

        {/* Blog Grid */}
        <BlogGrid posts={posts} />
      </div>
    </div>
  )
}
