"use client";

import { useQuery } from "@tanstack/react-query";
import TracksTable from "@/components/tracks-table";
import { artistTopTracksQuery } from "@/lib/queries";

export default function ArtistTopTracks({ artistId }: { artistId: string }) {
  const { data: artistTopTracks, isPending } = useQuery(
    artistTopTracksQuery(artistId)
  );

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
