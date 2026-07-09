import type { Metadata } from "next";

export const siteConfig = {
  name: "Alex Lohinov",
  title: "Alex Lohinov - Product Designer",
  description: "Alex Lohinov - Product Designer",
  url: "https://lohinov.com",
  author: "Alex Lohinov",
  email: "hello@lohinov.com",
};

export function createMetadata(metadata: Metadata = {}): Metadata {
  const title = metadata.title ?? siteConfig.title;
  const description = metadata.description ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_US",
      type: "website",
      ...metadata.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
      ...metadata.twitter,
    },
    ...metadata,
  };
}
