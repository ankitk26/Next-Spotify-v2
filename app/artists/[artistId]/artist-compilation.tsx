"use client";

import { useQuery } from "@tanstack/react-query";
import AlbumCards from "@/components/album-cards";
import { artistCompilationQuery } from "@/lib/queries";

export default function ArtistCompilation({ artistId }: { artistId: string }) {
  const { data: artistCompilation, isPending } = useQuery(
    artistCompilationQuery(artistId)
  );

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
