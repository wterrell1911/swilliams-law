import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/mdx"
import { firmConfig } from "@/config/firm.config"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/blog", "/contact", "/practice-areas", "/privacy", "/terms"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Practice area pages
  const practiceAreaRoutes = firmConfig.practiceAreas.map((area) => ({
    url: `${siteConfig.url}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // Location pages
  const locationRoutes = firmConfig.locations
    .filter((loc) => loc.hasLocationPage)
    .map((loc) => ({
      url: `${siteConfig.url}/locations/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

  // Blog posts
  const posts = getAllPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // City + practice area pages
  const cityPracticeRoutes = firmConfig.cityPracticePages.map((page) => ({
    url: `${siteConfig.url}/${page.city}/${page.practiceSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...practiceAreaRoutes, ...locationRoutes, ...cityPracticeRoutes, ...blogRoutes]
}
