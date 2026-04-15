import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

/**
 * External API for creating short links via API key (server-to-server).
 * Authenticates with x-api-key header against ADMIN_KEY env var.
 * Links are created under the ADMIN_USER_ID or the first user in the DB.
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destination, slug: customSlug } = await req.json();

    if (!destination) {
      return NextResponse.json(
        { error: "Destination URL is required" },
        { status: 400 }
      );
    }

    try {
      new URL(destination);
    } catch {
      return NextResponse.json(
        { error: "Invalid destination URL" },
        { status: 400 }
      );
    }

    const slug = customSlug?.trim() || nanoid(6);

    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Slug can only contain letters, numbers, hyphens, and underscores",
        },
        { status: 400 }
      );
    }

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

    // Upsert: if slug exists, update destination; otherwise create
    const adminUserId = process.env.ADMIN_USER_ID;
    const userId =
      adminUserId ||
      (await prisma.user.findFirst({ select: { id: true } }))?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "No admin user configured" },
        { status: 500 }
      );
    }

    const link = await prisma.link.upsert({
      where: { slug },
      update: { destination },
      create: { userId, slug, destination },
    });

    const shortUrl = `https://${process.env.BASE_DOMAIN || "shortcake.to"}/${slug}`;

    return NextResponse.json({ ...link, shortUrl }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}
