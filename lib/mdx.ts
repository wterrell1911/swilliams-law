import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { BlogPost, BlogFrontmatter } from "@/types/blog"

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as BlogFrontmatter

      return {
        slug,
        title: frontmatter.title,
        excerpt: frontmatter.excerpt,
        content,
        date: frontmatter.date,
        author: frontmatter.author || "",
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        image: frontmatter.image,
      } as BlogPost
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const frontmatter = data as BlogFrontmatter

    return {
      slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      content,
      date: frontmatter.date,
      author: frontmatter.author || "",
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      featured: frontmatter.featured || false,
      image: frontmatter.image,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts.map((post) => post.category)
  return Array.from(new Set(categories))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap((post) => post.tags)
  return Array.from(new Set(tags))
}
