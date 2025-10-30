import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const blogId = req.nextUrl.searchParams.get("blogId");
  if (!blogId) return NextResponse.json({ error: "blogId required" }, { status: 400 });

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const comment = await prisma.comment.create({ data });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
