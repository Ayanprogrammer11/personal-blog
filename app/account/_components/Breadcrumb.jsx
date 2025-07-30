"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  return (
    <header className="mb-8 mt-20">
      <div className="flex items-center gap-2 text-sm text-sage-600 mb-2">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-brand-600">Account</span>
        {pathname !== "/account" && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sage-800 font-medium capitalize">
              {pathname.split("/").pop()}
            </span>
          </>
        )}
      </div>
    </header>
  );
}
