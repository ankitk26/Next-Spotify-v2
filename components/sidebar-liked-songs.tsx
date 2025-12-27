"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { likedSongsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarLikedSongs() {
  const pathname = usePathname();
  const library = useSidebarStore((store) => store.library);

  const { data: likedSongsCount, isPending } = useQuery(
    likedSongsQuery(library)
  );

  if (isPending) {
    return <SideBarSkeleton count={1} />;
  }

  return (
    <Link
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md p-2 text-white hover:bg-neutral-800",
        pathname === "/collection/tracks" ? "bg-neutral-600" : ""
      )}
      href="/collection/tracks"
    >
      <Image
        alt="Liked playlist cover"
        className="rounded-md"
        height={50}
        src="https://res.cloudinary.com/drnu1myuq/image/upload/v1754937393/liked_cover_x3ach0.jpg"
        width={50}
      />

      <div className="truncate">
        <h6 className="w-full truncate font-semibold text-sm hover:text-white">
          Liked Songs
        </h6>
        <span className="mt-1 font-medium text-neutral-500 text-xs">
          {likedSongsCount} songs
        </span>
      </div>
    </Link>
  );
}
