import { getRecentlyPlayedTracks } from "@/actions/get-recently-played";
import TrackCards from "@/components/track-cards";

export default async function RecentlyPlayed() {
  const recentlyPlayed = await getRecentlyPlayedTracks(10);

  if (!recentlyPlayed) {
    return null;
  }

  return <TrackCards tracks={recentlyPlayed} />;
}
