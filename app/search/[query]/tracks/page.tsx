"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SearchFilters from "@/components/search-filters";
import TracksTable from "@/components/tracks-table";
import { searchQuery } from "@/lib/queries";

export default function TrackSearchResultPage() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } = useQuery(
    searchQuery("track", query, 50)
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
