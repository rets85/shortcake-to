import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "shortcake.to", template: "%s | shortcake.to" },
  description: "The URL shortener that doesn't get in your way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
