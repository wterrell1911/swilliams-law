import { BlogPost } from "@/types/blog"
import { BlogCard } from "./BlogCard"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-warmWhite/60 text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <ScrollReveal stagger staggerDelay={0.1}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ScrollRevealItem key={post.slug}>
            <BlogCard post={post} />
          </ScrollRevealItem>
        ))}
      </div>
    </ScrollReveal>
  )
}
