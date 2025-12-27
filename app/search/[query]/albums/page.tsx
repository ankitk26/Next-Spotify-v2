"use client";

import { useParams } from "next/navigation";
import AlbumCards from "@/components/album-cards";
import SearchFilters from "@/components/search-filters";
import { trpc } from "@/lib/trpc/react";

export default function AlbumsSearchResultPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } = trpc.spotify.search.items.useQuery(
    { type: "album", query, limit: 50 }
  );

  if (isPending) {
    return (
      <>
        <SearchFilters />
        <div>Loading...</div>
      </>
    );
  }

  const albums = searchResults?.albums;

  return (
    <>
      <SearchFilters />
      {albums && albums.length > 0 && (
        <div>
          <h1>Albums</h1>
          <AlbumCards albums={albums} />
        </div>
      )}
    </>
  );
}
