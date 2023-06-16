import PlaylistCards from "@/components/PlaylistCards";
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

  const query = params.query;

  const playlistResponse = await getSearchItems(session, "playlist", query);

  const playlists = playlistResponse.playlists.items as Playlist[];

  return (
    <>
      <h1>All Playlists for {`"${query}"`}</h1>
      <PlaylistCards playlists={playlists} />
    </>
  );
}
