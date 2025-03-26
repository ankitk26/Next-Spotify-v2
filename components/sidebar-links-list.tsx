"use client";

import { cn } from "@/lib/utils";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinksList() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-stretch w-full mt-8">
      <Link
        href="/"
        className={cn(
          "flex items-center gap-4 px-2 py-3 rounded-xl cursor-pointer hover:text-white",
          pathname === "/"
            ? "bg-neutral-600 text-white"
            : "bg-transparent text-neutral-500"
        )}
      >
        <Home size={20} />
        <span className="font-semibold">Home</span>
      </Link>

      <Link
        href="/search"
        className={cn(
          "flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer hover:text-white",
          pathname === "/search"
            ? "bg-neutral-600 text-white"
            : "bg-transparent text-neutral-500"
        )}
      >
        <Search size={20} />
        <span className="font-semibold">Search</span>
      </Link>
    </div>
  );
}
