import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId, blogId } = await req.json();

  if (!userId || !blogId) {
    return NextResponse.json(
      { error: "userId and blogId are required" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.bookmark.findUnique({
      where: { userId_blogId: { userId, blogId } },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { userId_blogId: { userId, blogId } },
      });
      return NextResponse.json({ message: "Bookmark removed" });
    }

    const bookmark = await prisma.bookmark.create({
      data: { userId, blogId },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to toggle bookmark" },
      { status: 500 }
    );
  }
}
