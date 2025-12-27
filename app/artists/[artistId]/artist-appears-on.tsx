"use client";

import AlbumCards from "@/components/album-cards";
import { trpc } from "@/lib/trpc/react";

export default function ArtistAppearsOn({ artistId }: { artistId: string }) {
  const { data: artistAppearsOnAlbums, isPending } =
    trpc.spotify.artist.appearsOn.useQuery({ artistId });

  if (isPending) {
    return null;
  }

  if (artistAppearsOnAlbums?.length === 0 || !artistAppearsOnAlbums) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Appears On</h1>
      <AlbumCards albums={artistAppearsOnAlbums} />
    </div>
  );
}
