import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await prisma.link.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destination, slug: customSlug } = await req.json();

    if (!destination) {
      return NextResponse.json(
        { error: "Destination URL is required" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(destination);
    } catch {
      return NextResponse.json(
        { error: "Invalid destination URL" },
        { status: 400 }
      );
    }

    const slug = customSlug?.trim() || nanoid(6);

    // Validate slug format
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug can only contain letters, numbers, hyphens, and underscores" },
        { status: 400 }
      );
    }

    // Reserved slugs
    const reserved = [
      "api",
      "login",
      "signup",
      "dashboard",
      "billing",
      "privacy",
      "terms",
      "404",
    ];
    if (reserved.includes(slug.toLowerCase())) {
      return NextResponse.json(
        { error: "This slug is reserved" },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existing = await prisma.link.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "This slug is already taken" },
        { status: 409 }
      );
    }

    const link = await prisma.link.create({
      data: {
        userId: session.user.id,
        slug,
        destination,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}
