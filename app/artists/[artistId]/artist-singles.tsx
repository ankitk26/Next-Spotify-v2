"use client";

import AlbumCards from "@/components/album-cards";
import { trpc } from "@/lib/trpc/react";

export default function ArtistSingles({ artistId }: { artistId: string }) {
  const { data: artistSingles, isPending } =
    trpc.spotify.artist.singles.useQuery({ artistId });

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
