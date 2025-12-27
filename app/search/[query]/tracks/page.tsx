"use client";

import { useParams } from "next/navigation";
import SearchFilters from "@/components/search-filters";
import TracksTable from "@/components/tracks-table";
import { trpc } from "@/lib/trpc/react";

export default function TrackSearchResultPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } = trpc.spotify.search.items.useQuery(
    { type: "track", query, limit: 50 }
  );

  if (isPending) {
    return (
      <>
        <SearchFilters />
        <div>Loading...</div>
      </>
    );
  }

  const tracks = searchResults?.tracks;

  return (
    <>
      <SearchFilters />
      {tracks && tracks.length > 0 && (
        <TracksTable showCover showSubtitle tracks={tracks} />
      )}
    </>
  );
}
