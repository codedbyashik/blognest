// app/api/comments/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET comments by blogId
export async function GET(req: NextRequest) {
  const blogId = req.nextUrl.searchParams.get("blogId"); // ✅ NextRequest ব্যবহার
  if (!blogId) {
    return NextResponse.json({ error: "blogId required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: { user: true }, // যদি user info লাগছে
    });
    return NextResponse.json(comments);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

// POST new comment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blogId, userId, content } = body;

    if (!blogId || !userId || !content) {
      return NextResponse.json(
        { error: "blogId, userId, and content are required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: { blogId, userId, content },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Failed to create comment" }, { status: 500 });
  }
}

// DELETE comment by id
export async function DELETE(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get("id"); // ✅ NextRequest ব্যবহার
  if (!commentId) {
    return NextResponse.json({ error: "comment id required" }, { status: 400 });
  }

  try {
    await prisma.comment.delete({ where: { id: commentId } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}
