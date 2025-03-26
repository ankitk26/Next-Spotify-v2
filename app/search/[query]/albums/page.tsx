import { getSearchItems } from "@/actions/get-search-items";
import AlbumCards from "@/components/album-cards";
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
    title: `Albums related to "${query}"`,
  };
}

export default async function AlbumsSearchResultPage(props: Props) {
  const params = await props.params;
  const query = decodeURI(params.query);

  const albums = (await getSearchItems("album", query, 50)).albums;

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
