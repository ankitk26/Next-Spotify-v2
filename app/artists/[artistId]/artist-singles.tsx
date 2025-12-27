"use client";

import { useQuery } from "@tanstack/react-query";
import AlbumCards from "@/components/album-cards";
import { artistSinglesQuery } from "@/lib/queries";

export default function ArtistSingles({ artistId }: { artistId: string }) {
  const { data: artistSingles, isPending } = useQuery(
    artistSinglesQuery(artistId)
  );

  if (isPending) {
    return null;
  }

  if (artistSingles?.length === 0 || !artistSingles) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Singles</h1>
      <AlbumCards albums={artistSingles} />
    </div>
  );
}
