"use client";

import AlbumCards from "@/components/album-cards";
import { trpc } from "@/lib/trpc/react";

export default function ArtistAlbums({ artistId }: { artistId: string }) {
  const { data: artistAlbums, isPending } =
    trpc.spotify.artist.albums.useQuery({ artistId });

  if (isPending) {
    return null;
  }

  if (artistAlbums?.length === 0 || !artistAlbums) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Albums</h1>
      <AlbumCards albums={artistAlbums} />
    </div>
  );
}
