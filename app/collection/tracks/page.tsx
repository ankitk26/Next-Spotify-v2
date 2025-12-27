"use client";

import { Dot } from "lucide-react";
import Image from "next/image";
import TracksTable from "@/components/tracks-table";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc/react";

export default function LikedTracksPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const { data: likedTracks, isPending: tracksPending } =
    trpc.spotify.library.likedSongs.useQuery();

  const isPending = sessionPending || tracksPending;

  if (isPending) {
    return (
      <div className="flex items-end gap-6">
        <Skeleton className="h-52 w-52 rounded-sm" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-16 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-end gap-6">
        <Image
          alt="Liked Songs"
          height={208}
          priority
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          width={208}
        />
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-sm">Playlist</h5>
          <h2 className="mt-2 font-bold text-6xl">Liked Songs</h2>

          <div className="flex items-center font-semibold text-sm">
            <span>{session?.user.name}</span>
            {likedTracks && likedTracks.total > 0 && (
              <>
                <Dot />
                <span>{likedTracks.total} songs</span>
              </>
            )}
          </div>
        </div>
      </div>

      {likedTracks?.items && (
        <TracksTable
          showAlbum
          showCover
          showHeader
          showSubtitle
          tracks={likedTracks.items}
        />
      )}
    </>
  );
}
