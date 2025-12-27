"use client";

import { useParams } from "next/navigation";
import PlaylistCards from "@/components/playlist-cards";
import SearchFilters from "@/components/search-filters";
import { trpc } from "@/lib/trpc/react";

export default function PlaylistSearchResultPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } =
    trpc.spotify.search.items.useQuery({ type: "playlist", query, limit: 50 });

  if (isPending) {
    return (
      <>
        <SearchFilters />
        <div>Loading...</div>
      </>
    );
  }

  const playlists = searchResults?.playlists;

  return (
    <>
      <SearchFilters />
      {playlists && playlists.length > 0 && (
        <PlaylistCards
          playlists={playlists.filter((playlist) => playlist !== null)}
        />
      )}
    </>
  );
}
