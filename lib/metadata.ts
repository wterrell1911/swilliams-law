import { Metadata } from "next"
import { siteConfig } from "@/config/site"

interface GenerateMetadataProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: GenerateMetadataProps): Metadata {
  const url = canonical || siteConfig.url

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      // TODO: Phase 3 — read from firmConfig.seo.twitterHandle
      creator: "",
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  }
}

export function generateBlogPostMetadata({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors = [],
  tags = [],
  image,
}: {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  image?: string
}): Metadata {
  return {
    // TODO: Phase 3 — read firm name from firmConfig.identity.shortName
    title: `${title} | Blog`,
    description,
    keywords: tags,
    authors: authors.map((author) => ({ name: author })),
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
