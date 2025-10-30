// app/api/blogs/[slug]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Params {
  params: { slug: string };
}

// ✅ GET blog
export async function GET(req: NextRequest, context: Params) {
  const params = await context.params; // ✅ unwrap Promise
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { author: true, comments: true, likes: true },
    });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Something went wrong" }), { status: 500 });
  }
}

// ✅ DELETE blog
export async function DELETE(req: NextRequest, context: Params) {
  const params = await context.params; // ✅ unwrap Promise
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
    }

    await prisma.blog.delete({ where: { slug } });
    return new Response(JSON.stringify({ message: "Blog deleted successfully" }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Deletion failed" }), { status: 500 });
  }
}

// ✅ PUT blog
export async function PUT(req: NextRequest, context: Params) {
  const params = await context.params; // ✅ unwrap Promise
  const { slug } = params;
  const body = await req.json();

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
    }

    const updatedBlog = await prisma.blog.update({
      where: { slug },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        tag: body.tag,
        image: body.image,
      },
    });

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Update failed" }), { status: 500 });
  }
}
