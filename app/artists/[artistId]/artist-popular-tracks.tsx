"use client";

import TracksTable from "@/components/tracks-table";
import { trpc } from "@/lib/trpc/react";

export default function ArtistTopTracks({ artistId }: { artistId: string }) {
  const { data: artistTopTracks, isPending } =
    trpc.spotify.artist.topTracks.useQuery({ artistId });

  if (isPending) {
    return null;
  }

  if (!artistTopTracks || artistTopTracks.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h1>Popular</h1>
      <div className="-mt-8">
        <TracksTable showCover tracks={artistTopTracks} />
      </div>
    </div>
  );
}
