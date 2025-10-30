// app/api/blogs/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true, // include author info
      },
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const defaultAuthorId = "default-user-id-1"; // replace with your dev/test user
    const authorId = body.authorId || defaultAuthorId;

    // Ensure default user exists
    await prisma.user.upsert({
      where: { id: authorId },
      update: {},
      create: { id: authorId, name: "Default User", email: "default@example.com" },
    });

    if (!body.title || !body.slug || !body.content) {
      return new Response(
        JSON.stringify({ error: "Title, slug, and content are required" }),
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || null,
        tag: body.tag || null,
        image: body.image || null,
        author: { connect: { id: authorId } },
      },
    });

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
