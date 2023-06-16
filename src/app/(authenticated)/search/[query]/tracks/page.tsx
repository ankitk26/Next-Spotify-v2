import TracksTable from "@/components/TracksTable";
import { getSearchItems } from "@/lib/actions";
import { Track } from "@/types/types";
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
    title: `Tracks related to "${query}"`,
  };
}

export default async function TrackSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const query = params.query;

  const trackResponse = await getSearchItems(session, "track", query);

  const tracks = trackResponse.tracks.items as Track[];

  return (
    <>
      <h1>All Playlists for {`"${query}"`}</h1>
      <TracksTable tracks={tracks} />
    </>
  );
}
