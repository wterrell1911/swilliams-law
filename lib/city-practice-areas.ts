import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content/locations")

export interface CityPracticeAreaFrontmatter {
  title: string
  seoTitle: string
  description: string
  city: string
  cityName: string
  state: string
  practiceSlug: string
  practiceLabel: string
  practiceAreaSlug: string
  faqs: Array<{ question: string; answer: string }>
}

export interface CityPracticeAreaPage extends CityPracticeAreaFrontmatter {
  content: string
}

export function getCityPracticeArea(
  city: string,
  practiceSlug: string
): CityPracticeAreaPage | null {
  try {
    const fullPath = path.join(contentDirectory, city, `${practiceSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const frontmatter = data as CityPracticeAreaFrontmatter

    return {
      title: frontmatter.title,
      seoTitle: frontmatter.seoTitle,
      description: frontmatter.description,
      city: frontmatter.city,
      cityName: frontmatter.cityName,
      state: frontmatter.state,
      practiceSlug: frontmatter.practiceSlug,
      practiceLabel: frontmatter.practiceLabel,
      practiceAreaSlug: frontmatter.practiceAreaSlug,
      faqs: frontmatter.faqs || [],
      content,
    }
  } catch {
    return null
  }
}

export function getAllCityPracticeAreas(): CityPracticeAreaPage[] {
  const pages: CityPracticeAreaPage[] = []

  if (!fs.existsSync(contentDirectory)) return pages

  const cityDirs = fs.readdirSync(contentDirectory).filter((f) => {
    const fullPath = path.join(contentDirectory, f)
    return fs.statSync(fullPath).isDirectory() && f !== ".DS_Store"
  })

  for (const city of cityDirs) {
    const cityDir = path.join(contentDirectory, city)
    const files = fs.readdirSync(cityDir).filter((f) => f.endsWith(".mdx"))

    for (const file of files) {
      const practiceSlug = file.replace(/\.mdx$/, "")
      const page = getCityPracticeArea(city, practiceSlug)
      if (page) pages.push(page)
    }
  }

  return pages
}
