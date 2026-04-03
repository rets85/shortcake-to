import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  // Don't intercept known routes
  const reserved = [
    "api",
    "login",
    "signup",
    "dashboard",
    "billing",
    "privacy",
    "terms",
    "_next",
    "favicon.ico",
  ];
  if (reserved.includes(slug)) {
    return NextResponse.next();
  }

  try {
    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link || !link.enabled) {
      return NextResponse.redirect(
        new URL("/404", process.env.NEXT_PUBLIC_APP_URL || "https://shortcake.to")
      );
    }

    // Fire-and-forget: increment click count
    prisma.link
      .update({
        where: { id: link.id },
        data: {
          clicks: { increment: 1 },
          lastClickAt: new Date(),
        },
      })
      .catch(() => {
        // Silently ignore — don't block the redirect
      });

    return NextResponse.redirect(link.destination, 301);
  } catch {
    return NextResponse.redirect(
      new URL("/404", process.env.NEXT_PUBLIC_APP_URL || "https://shortcake.to")
    );
  }
}
