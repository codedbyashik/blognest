// app/api/blogs/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cuid } from "cuid";

// ✅ Context type
type Context = { params?: { slug?: string } };

// GET all blogs
export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true, likes: true, comments: true },
    });
    return NextResponse.json(blogs);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new blog
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.title || !body.content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || "",
        tag: body.tag || "",
        image: body.image || "",
        authorId: body.authorId || null,
        slug: body.slug || cuid(), // ✅ slug auto-generate
      },
    });

    return NextResponse.json(newBlog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update blog by slug
export async function PUT(req: NextRequest, { params }: Context) {
  if (!params?.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const updatedBlog = await prisma.blog.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || "",
        tag: body.tag || "",
        image: body.image || "",
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE blog by slug
export async function DELETE(req: NextRequest, { params }: Context) {
  if (!params?.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({ where: { slug: params.slug } });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
