import fs from "fs"
import path from "path"
import matter from "gray-matter"

const practiceAreasDirectory = path.join(process.cwd(), "content/practice-areas")

export interface PracticeAreaFrontmatter {
  title: string
  seoTitle: string
  description: string
  heroHeading: string
  slug: string
  semanticTerms?: string[]
  relatedAreas?: string[]
}

export interface PracticeAreaPage {
  slug: string
  title: string
  seoTitle: string
  description: string
  heroHeading: string
  content: string
  semanticTerms: string[]
  relatedAreas: string[]
}

export function getAllPracticeAreas(): PracticeAreaPage[] {
  if (!fs.existsSync(practiceAreasDirectory)) {
    fs.mkdirSync(practiceAreasDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(practiceAreasDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(practiceAreasDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as PracticeAreaFrontmatter

      return {
        slug,
        title: frontmatter.title,
        seoTitle: frontmatter.seoTitle,
        description: frontmatter.description,
        heroHeading: frontmatter.heroHeading,
        content,
        semanticTerms: frontmatter.semanticTerms || [],
        relatedAreas: frontmatter.relatedAreas || [],
      }
    })
}

export function getPracticeArea(slug: string): PracticeAreaPage | null {
  try {
    const fullPath = path.join(practiceAreasDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const frontmatter = data as PracticeAreaFrontmatter

    return {
      slug,
      title: frontmatter.title,
      seoTitle: frontmatter.seoTitle,
      description: frontmatter.description,
      heroHeading: frontmatter.heroHeading,
      content,
      semanticTerms: frontmatter.semanticTerms || [],
      relatedAreas: frontmatter.relatedAreas || [],
    }
  } catch {
    return null
  }
}
