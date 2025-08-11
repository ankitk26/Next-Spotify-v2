"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const collectionTabs = ["playlists", "artists", "albums"];

export default function CollectionTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8 bg-transparent">
      {collectionTabs.map((tab) => (
        <Link href={`/collection/${tab}`} key={tab}>
          <span
            className={cn(
              "rounded px-6 py-3 font-bold text-sm text-white capitalize",
              pathname === `/collection/${tab}`
                ? "bg-neutral-800"
                : "bg-transparent"
            )}
          >
            {tab}
          </span>
        </Link>
      ))}
    </div>
  );
}
