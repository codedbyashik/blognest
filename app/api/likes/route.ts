import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, blogId } = await req.json();

  try {
    const existing = await prisma.like.findUnique({ where: { userId_blogId: { userId, blogId } } });

    if (existing) {
      await prisma.like.delete({ where: { userId_blogId: { userId, blogId } } });
      return NextResponse.json({ message: "Unliked" });
    }

    const like = await prisma.like.create({ data: { userId, blogId } });
    return NextResponse.json(like);
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
