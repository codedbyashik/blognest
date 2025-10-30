// app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // ✅ Promise
) {
  const { id } = await context.params;  // Promise unwrap

  if (!id) {
    return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true, blog: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
