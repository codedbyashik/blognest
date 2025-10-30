import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const blogId = req.nextUrl.searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json({ error: "blogId required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
  }

  try {
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
  }

  try {
    const existingComment = await prisma.comment.findUnique({ where: { id } });
    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content: body.content },
    });

    return NextResponse.json(updatedComment);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Update failed" }, { status: 500 });
  }
}
