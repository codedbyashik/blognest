import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Shared context type for cleaner code
type Context = { params: Promise<{ slug: string }> };

// GET blog
export async function GET(req: NextRequest, context: Context) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { author: true, comments: true, likes: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(req: NextRequest, context: Context) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { slug } });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Deletion failed" },
      { status: 500 }
    );
  }
}

// PUT blog
export async function PUT(req: NextRequest, context: Context) {
  const { slug } = await context.params;
  const body = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Update failed" },
      { status: 500 }
    );
  }
}
