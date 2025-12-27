"use client";

import { useQuery } from "@tanstack/react-query";
import AlbumCards from "@/components/album-cards";
import { artistAlbumsQuery } from "@/lib/queries";

export default function ArtistAlbums({ artistId }: { artistId: string }) {
  const { data: artistAlbums, isPending } = useQuery(
    artistAlbumsQuery(artistId)
  );

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
