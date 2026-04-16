import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/mdx"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/blog", "/contact", "/privacy", "/terms"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Include blog posts in sitemap
  const posts = getAllPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // TODO: Phase 3 — add practice area pages, attorney pages, location pages from firm.config.ts

  return [...routes, ...blogRoutes]
}
