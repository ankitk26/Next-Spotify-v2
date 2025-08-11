import type { Metadata } from "next/types";
import { getSearchItems } from "@/actions/get-search-items";
import SearchFilters from "@/components/search-filters";
import TracksTable from "@/components/tracks-table";

interface Props {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const query = params.query;
  return {
    title: `Tracks related to "${query}"`,
  };
}

export default async function TrackSearchResultPage(props: Props) {
  const params = await props.params;
  const query = decodeURI(params.query);

  const tracks = (await getSearchItems("track", query, 50)).tracks;

  return (
    <>
      <SearchFilters />
      {tracks && tracks.length > 0 && (
        <TracksTable showCover showSubtitle tracks={tracks} />
      )}
    </>
  );
}
