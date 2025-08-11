import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import TrackCards from "@/components/track-cards";
import type { Track } from "@/types/types";

export default async function TimeCapsule() {
  const allTimeTopTracks = (await getUserTopTracks({
    limit: 10,
    type: "tracks",
    timeRange: "long_term",
  })) as Track[];

  return <TrackCards tracks={allTimeTopTracks} />;
}
