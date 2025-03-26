"use client";

import { getLikedSongs } from "@/actions/get-liked-songs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBarSkeleton from "./sidebar-skeleton";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";

export default function SidebarLikedSongs() {
  const pathname = usePathname();
  const library = useSidebarStore((store) => store.library);

  const { data: likedSongsCount, isPending } = useQuery({
    queryKey: ["liked_songs"],
    queryFn: getLikedSongs,
    select: (data) => {
      return data.total;
    },
    enabled: library === "playlists",
  });

  if (isPending) {
    return <SideBarSkeleton count={1} />;
  }

  return (
    <Link
      href="/collection/tracks"
      className={cn(
        "flex items-center p-2 gap-3 rounded-md text-white cursor-pointer hover:bg-neutral-800",
        pathname === "/collection/tracks" ? "bg-neutral-600" : ""
      )}
    >
      <Image
        src="/images/liked_cover.jpeg"
        height={50}
        width={50}
        className="rounded-md"
        alt="Liked playlist cover"
      />

      <div className="truncate">
        <h6 className="w-full text-sm font-semibold truncate hover:text-white">
          Liked Songs
        </h6>
        <span className="mt-1 text-xs font-medium text-neutral-500">
          {likedSongsCount} songs
        </span>
      </div>
    </Link>
  );
}
