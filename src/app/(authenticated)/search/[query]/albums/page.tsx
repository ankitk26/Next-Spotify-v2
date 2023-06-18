import AlbumCards from "@/components/AlbumCards";
import SearchFilters from "@/components/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Album } from "@/types/types";
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
    title: `Albums related to "${query}"`,
  };
}

export default async function AlbumsSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const query = decodeURI(params.query);

  const albumResponse = await getSearchItems(session, "album", query, 50);

  const albums = albumResponse.albums.items as Album[];

  return (
    <>
      <SearchFilters />
      <AlbumCards albums={albums} />
    </>
  );
}
