import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma"; // তোমার DB config

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blognest.vercel.app";

  // DB থেকে সব blog নাও
  const blogs = await prisma.blog.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Blog URLs generate
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly" as const, // ✅ type safe
    priority: 0.8,
  }));

  // Homepage + blog URLs
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const, // ✅ type safe
      priority: 1,
    },
    ...blogUrls,
  ];
}
