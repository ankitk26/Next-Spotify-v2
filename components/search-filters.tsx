"use client";

import { searchFilterTags } from "@/constants/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function SearchFilters() {
  const pathname = usePathname();
  const params = useParams();

  const query = params.query as string;

  return (
    <div className="flex items-center gap-2 mb-8 text-sm">
      {searchFilterTags.map((tag) => {
        const href = `/search/${query}${tag.link}`;
        return (
          <Link
            key={tag.label}
            className={cn(
              "px-4 py-1 font-medium transition-colors rounded-full",
              pathname === href
                ? "bg-white text-neutral-900"
                : "bg-neutral-800 hover:bg-neutral-600 text-white"
            )}
            href={href}
          >
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
}
