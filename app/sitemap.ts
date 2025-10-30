import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma"; // অথবা তোমার DB config

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blognest.vercel.app";

  const blogs = await prisma.blog.findMany({
    select: { slug: true, updatedAt: true },
  });

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogUrls,
  ];
}
