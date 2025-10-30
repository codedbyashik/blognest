import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: { id: string } };

// ✅ GET single comment by ID
export async function GET(req: NextRequest, { params }: Context) {
  const { id } = params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true, blog: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ PUT comment (update)
export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = params;
  const body = await req.json();

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

// ✅ DELETE comment
export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = params;

  try {
    const existingComment = await prisma.comment.findUnique({ where: { id } });
    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}
