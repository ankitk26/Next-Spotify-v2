"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const collectionTabs = ["playlists", "artists", "albums"];

export default function CollectionTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8 bg-transparent">
      {collectionTabs.map((tab) => (
        <Link href={`/collection/${tab}`} key={tab}>
          <span
            className={cn(
              "text-white rounded capitalize text-sm font-bold px-6 py-3",
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
