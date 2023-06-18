import SearchFilters from "@/components/SearchFilters";
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

  const tracks = (await getSearchItems(session, "track", query, 50).then(
    (data) => data.tracks.items
  )) as Track[];

  return (
    <>
      <SearchFilters />
      <TracksTable tracks={tracks} showCover showSubtitle />
    </>
  );
}
