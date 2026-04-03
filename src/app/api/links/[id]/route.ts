import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await prisma.link.findUnique({
      where: { id: params.id },
    });

    if (!link || link.userId !== session.user.id) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const body = await req.json();
    const updates: Record<string, unknown> = {};

    if (body.destination !== undefined) {
      try {
        new URL(body.destination);
        updates.destination = body.destination;
      } catch {
        return NextResponse.json(
          { error: "Invalid destination URL" },
          { status: 400 }
        );
      }
    }

    if (body.slug !== undefined) {
      const slug = body.slug.trim();
      if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
        return NextResponse.json(
          { error: "Invalid slug format" },
          { status: 400 }
        );
      }
      // Check uniqueness if slug changed
      if (slug !== link.slug) {
        const existing = await prisma.link.findUnique({ where: { slug } });
        if (existing) {
          return NextResponse.json(
            { error: "This slug is already taken" },
            { status: 409 }
          );
        }
      }
      updates.slug = slug;
    }

    if (body.enabled !== undefined) {
      updates.enabled = body.enabled;
    }

    const updated = await prisma.link.update({
      where: { id: params.id },
      data: updates,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await prisma.link.findUnique({
      where: { id: params.id },
    });

    if (!link || link.userId !== session.user.id) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    await prisma.link.delete({ where: { id: params.id } });

    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
