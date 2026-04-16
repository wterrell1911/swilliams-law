import type { Metadata } from "next"
import { inter, displayFont } from "@/lib/fonts"
import "./globals.css"
import { siteConfig } from "@/config/site"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "S. Williams Law Firm | Atlanta Personal Injury Lawyer",
    template: `%s | S. Williams Law Firm`,
  },
  description: siteConfig.description,
  keywords: [
    "personal injury attorney",
    "Atlanta personal injury lawyer",
    "workers compensation lawyer",
    "car accident attorney",
    "Georgia injury lawyer",
    "Mississippi injury lawyer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "S. Williams Law Firm | Atlanta Personal Injury Lawyer",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S. Williams Law Firm | Atlanta Personal Injury Lawyer",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${displayFont.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateLocalBusinessSchema()} />
        {process.env.NEXT_PUBLIC_CALLRAIL_COMPANY_ID && (
          <script
            async
            src={`https://cdn.callrail.com/companies/${process.env.NEXT_PUBLIC_CALLRAIL_COMPANY_ID}/swap.js`}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-950 focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
