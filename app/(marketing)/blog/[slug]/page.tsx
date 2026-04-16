import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { mdxComponents } from "@/components/blog/MDXComponents"
import { getAllPosts, getPost } from "@/lib/mdx"
import { generateArticleSchema } from "@/lib/structured-data"
import { siteConfig } from "@/config/site"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    // TODO: Phase 3 — read firm name from firmConfig
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.image || `${siteConfig.url}/og-image.jpg`,
    datePublished: post.date,
    author: post.author,
    url: `${siteConfig.url}/blog/${post.slug}`,
  })

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ]}
            className="mb-8"
          />

          {/* Post Header */}
          <ScrollReveal>
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-navy-800 text-gold-500 text-sm font-semibold rounded-full border border-gold-500/30">
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-warmWhite/60">
                  {formattedDate}
                </time>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-warmWhite mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-warmWhite/80 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-navy-700">
                <div className="text-sm text-warmWhite/80">
                  By <span className="font-semibold text-warmWhite">{post.author}</span>
                </div>
                {post.readingTime && (
                  <>
                    <span className="text-warmWhite/40">•</span>
                    <div className="text-sm text-warmWhite/60">{post.readingTime} read</div>
                  </>
                )}
              </div>
            </header>
          </ScrollReveal>

          {/* Post Content */}
          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg prose-invert max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </ScrollReveal>

          {/* Post Footer */}
          {post.tags && post.tags.length > 0 && (
            <ScrollReveal delay={0.3} className="mt-12 pt-8 border-t border-navy-700">
              <div>
                <h3 className="text-sm font-semibold text-warmWhite/60 mb-3">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-navy-800 text-warmWhite/80 text-sm rounded-full border border-navy-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </article>
    </>
  )
}
