"use client";

import { useQuery } from "@tanstack/react-query";
import AlbumCards from "@/components/album-cards";
import { artistAppearsOnQuery } from "@/lib/queries";

export default function ArtistAppearsOn({ artistId }: { artistId: string }) {
  const { data: artistAppearsOnAlbums, isPending } = useQuery(
    artistAppearsOnQuery(artistId)
  );

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
