// app/api/comments/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

// DELETE comment
export async function DELETE(req: NextRequest, context: Params) {
  const { id } = await context.params;

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
  }
}
