import PlaylistCards from "@/components/PlaylistCards";
import SearchFilters from "@/components/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Playlist } from "@/types/types";
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
    title: `Playlists related to "${query}"`,
  };
}

export default async function PlaylistSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const query = decodeURI(params.query);

  const playlistResponse = await getSearchItems(session, "playlist", query);

  const playlists = playlistResponse.playlists.items as Playlist[];

  return (
    <>
      <SearchFilters />
      <PlaylistCards playlists={playlists} />
    </>
  );
}
