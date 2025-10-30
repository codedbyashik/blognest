import { prisma } from "./prisma";

export async function fetchBlogs(category = "All", page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const where = category !== "All" ? { tag: category } : {};
  return await prisma.blog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });
}

export async function fetchBlogBySlug(slug: string) {
  return await prisma.blog.findUnique({ where: { slug } });
}
