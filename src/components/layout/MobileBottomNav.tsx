"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080F] border-t border-[#1E1E3A] flex md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        if (item.comingSoon) {
          return (
            <div
              key={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 opacity-40 pointer-events-none"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[10px] font-medium text-slate-500">
                {item.label}
              </span>
            </div>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
          >
            <span className="text-xl">{item.emoji}</span>
            <span
              className={`text-[10px] font-medium ${
                isActive ? "text-violet-400" : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
