import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: { slug: string } };

// ✅ GET single blog by slug
export async function GET(req: NextRequest, { params }: Context) {
  const { slug } = params;

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
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ PUT (update blog)
export async function PUT(req: NextRequest, { params }: Context) {
  const { slug } = params;
  const body = await req.json();

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
    return NextResponse.json({ error: err.message || "Update failed" }, { status: 500 });
  }
}

// ✅ DELETE blog
export async function DELETE(req: NextRequest, { params }: Context) {
  const { slug } = params;

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { slug } });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}
