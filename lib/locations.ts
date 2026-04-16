import fs from "fs"
import path from "path"
import matter from "gray-matter"

const locationsDirectory = path.join(process.cwd(), "content/locations")

export interface LocationFrontmatter {
  title: string
  seoTitle: string
  description: string
  slug: string
}

export interface LocationPage {
  slug: string
  title: string
  seoTitle: string
  description: string
  content: string
}

export function getLocation(slug: string): LocationPage | null {
  try {
    const fullPath = path.join(locationsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const frontmatter = data as LocationFrontmatter

    return {
      slug,
      title: frontmatter.title,
      seoTitle: frontmatter.seoTitle,
      description: frontmatter.description,
      content,
    }
  } catch {
    return null
  }
}
