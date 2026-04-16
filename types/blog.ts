export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  featured?: boolean
  image?: string
  readingTime?: string
}

export interface BlogFrontmatter {
  title: string
  excerpt: string
  date: string
  author?: string
  category: string
  tags?: string[]
  featured?: boolean
  image?: string
}
