"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { label: "Links", href: "/dashboard", emoji: "🔗", comingSoon: false },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    emoji: "📊",
    comingSoon: true,
  },
  { label: "Billing", href: "/billing", emoji: "💳", comingSoon: false },
];

interface AppSidebarProps {
  userEmail?: string;
}

export default function AppSidebar({ userEmail }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-[#1E1E3A] shrink-0">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span>🍓</span>
          <span>
            <span className="text-violet-400">shortcake</span>
            <span className="text-slate-500">.to</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          if (item.comingSoon) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
                title="Coming in v2"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
                <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-slate-600 bg-slate-900/30 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-violet-500/10 text-violet-400 border-r-2 border-violet-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-[#1E1E3A] p-4 space-y-2">
        {userEmail && (
          <span className="text-xs text-slate-500 truncate block">{userEmail}</span>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-xs text-slate-500 hover:text-slate-400 transition-colors duration-150"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
