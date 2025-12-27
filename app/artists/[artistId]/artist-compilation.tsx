"use client";

import AlbumCards from "@/components/album-cards";
import { trpc } from "@/lib/trpc/react";

export default function ArtistCompilation({ artistId }: { artistId: string }) {
  const { data: artistCompilation, isPending } =
    trpc.spotify.artist.compilation.useQuery({ artistId });

  if (isPending) {
    return null;
  }

  if (artistCompilation?.length === 0 || !artistCompilation) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Compilation</h1>
      <AlbumCards albums={artistCompilation} />
    </div>
  );
}
