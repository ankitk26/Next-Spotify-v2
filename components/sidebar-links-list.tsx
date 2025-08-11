"use client";

import { Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarLinksList() {
  const pathname = usePathname();

  return (
    <div className="mt-8 flex w-full flex-col items-stretch">
      <Link
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-xl px-2 py-3 hover:text-white",
          pathname === "/"
            ? "bg-neutral-600 text-white"
            : "bg-transparent text-neutral-500"
        )}
        href="/"
      >
        <Home size={20} />
        <span className="font-semibold">Home</span>
      </Link>

      <Link
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-md px-2 py-3 hover:text-white",
          pathname === "/search"
            ? "bg-neutral-600 text-white"
            : "bg-transparent text-neutral-500"
        )}
        href="/search"
      >
        <Search size={20} />
        <span className="font-semibold">Search</span>
      </Link>
    </div>
  );
}
