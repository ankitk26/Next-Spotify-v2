import { getSearchItems } from "@/actions/get-search-items";
import PlaylistCards from "@/components/playlist-cards";
import SearchFilters from "@/components/search-filters";
import { Metadata } from "next/types";

interface Props {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const query = params.query;
  return {
    title: `Playlists related to "${query}"`,
  };
}

export default async function PlaylistSearchResultPage(props: Props) {
  const params = await props.params;
  const query = decodeURI(params.query);

  const playlists = (await getSearchItems("playlist", query, 50)).playlists;

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
