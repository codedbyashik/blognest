// app/api/blogs/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ Context type
type Context = { params?: { slug?: string } };

// ✅ GET all blogs
export async function GET(req: NextRequest, { params }: Context) {
  try {
    if (params?.slug) {
      // Fetch single blog by slug
      const blog = await prisma.blog.findUnique({
        where: { slug: params.slug },
        include: { author: true, comments: true, likes: true },
      });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    // Fetch all blogs
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ POST new blog
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Slug automatically generated from title
    const slug = body.title.toLowerCase().replace(/\s+/g, "-");

    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || "",
        tag: body.tag,
        image: body.image || null,
        authorId: body.authorId || null,
        slug,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Creation failed" }, { status: 500 });
  }
}

// ✅ PUT blog (update)
export async function PUT(req: NextRequest, { params }: Context) {
  const slug = params?.slug;
  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
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
  const slug = params?.slug;
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
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}

