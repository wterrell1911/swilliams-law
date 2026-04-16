import Link from "next/link"
import { BlogPost } from "@/types/blog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card variant="elevated" className="h-full hover:border-gold-500 transition-all duration-300">
        {post.image && (
          <div className="aspect-video bg-navy-950 border-b border-navy-700 flex items-center justify-center">
            <span className="text-6xl">{post.image}</span>
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-navy-950 text-gold-500 text-xs font-semibold rounded-full border border-gold-500/30">
              {post.category}
            </span>
            <span className="text-sm text-warmWhite/60">{formattedDate}</span>
          </div>
          <CardTitle className="text-2xl hover:text-gold-500 transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed line-clamp-3">
            {post.excerpt}
          </CardDescription>
          {post.readingTime && (
            <p className="text-sm text-warmWhite/50 mt-4">
              {post.readingTime} read
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
