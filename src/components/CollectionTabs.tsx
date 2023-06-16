"use client";

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
            className={`${
              pathname === `/collection/${tab}`
                ? "bg-[#323233]"
                : "bg-transparent"
            } text-white rounded capitalize text-sm font-bold px-6 py-3`}
          >
            {tab}
          </span>
        </Link>
      ))}
    </div>
  );
}
