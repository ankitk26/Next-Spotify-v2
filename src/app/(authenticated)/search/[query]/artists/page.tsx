import ArtistCards from "@/components/ArtistCards";
import SearchFilters from "@/components/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Artist } from "@/types/types";
import { getAuthSession } from "@/utils/serverUtils";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

interface Props {
  params: {
    query: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = params.query;
  return {
    title: `Artists related to "${query}"`,
  };
}

export default async function ArtistsSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const query = decodeURI(params.query);

  const artistResponse = await getSearchItems(session, "artist", query, 50);
  const artists = artistResponse.artists.items as Artist[];

  return (
    <>
      <SearchFilters />
      <ArtistCards artists={artists} />
    </>
  );
}
