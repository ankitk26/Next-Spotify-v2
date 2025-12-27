"use client";

import { useParams } from "next/navigation";
import ArtistCards from "@/components/artist-cards";
import SearchFilters from "@/components/search-filters";
import { trpc } from "@/lib/trpc/react";

export default function ArtistsSearchResultPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } = trpc.spotify.search.items.useQuery(
    { type: "artist", query, limit: 50 }
  );

  if (isPending) {
    return (
      <>
        <SearchFilters />
        <div>Loading...</div>
      </>
    );
  }

  const artists = searchResults?.artists;

  return (
    <>
      <SearchFilters />
      {artists && artists.length > 0 && (
        <div>
          <h1>Artists</h1>
          <ArtistCards artists={artists} />
        </div>
      )}
    </>
  );
}
