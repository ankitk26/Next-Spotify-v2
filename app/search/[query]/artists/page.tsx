import { getSearchItems } from "@/actions/get-search-items";
import ArtistCards from "@/components/artist-cards";
import SearchFilters from "@/components/search-filters";
import { Metadata } from "next/types";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const query = params.query;
  return {
    title: `Artists related to "${query}"`,
  };
}

export default async function ArtistsSearchResultPage(props: Props) {
  const params = await props.params;
  const query = decodeURI(params.query);

  const artists = (await getSearchItems("artist", query, 50)).artists;

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
