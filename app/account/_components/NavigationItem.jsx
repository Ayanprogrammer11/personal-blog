"use client";

import { ChevronRight, Link } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavigationItem({ item }) {
  const pathName = usePathname();
  const isActive = pathName === item.href;
  return (
    <Link
      href={item.href}
      className={`
        group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-brand-500 text-cream-50 shadow-lg shadow-brand-500/25"
            : "text-sage-700 hover:bg-brand-50 hover:text-brand-700"
        }
      `}
    >
      {/* <item.icon
        className={`h-5 w-5 transition-colors ${isActive ? "text-cream-50" : "text-sage-500 group-hover:text-brand-600"}`}
      /> */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{item.name}</div>
        <div
          className={`text-xs truncate ${isActive ? "text-brand-100" : "text-sage-500 group-hover:text-brand-500"}`}
        >
          {item.description}
        </div>
      </div>
      {isActive && <ChevronRight className="h-4 w-4 text-cream-50" />}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cream-50 rounded-r-full" />
      )}
    </Link>
  );
}
