"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { searchFilterTags } from "@/constants/constants";
import { cn } from "@/lib/utils";

export default function SearchFilters() {
  const pathname = usePathname();
  const params = useParams();

  const query = params.query as string;

  return (
    <div className="mb-8 flex items-center gap-2 text-sm">
      {searchFilterTags.map((tag) => {
        const href = `/search/${query}${tag.link}`;
        return (
          <Link
            className={cn(
              "rounded-full px-4 py-1 font-medium transition-colors",
              pathname === href
                ? "bg-white text-neutral-900"
                : "bg-neutral-800 text-white hover:bg-neutral-600"
            )}
            href={href}
            key={tag.label}
          >
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
}
