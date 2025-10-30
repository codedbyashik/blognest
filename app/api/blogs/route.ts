// app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: true, likes: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, content, excerpt, tag, image, authorId } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        tag,
        image,
        authorId,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
