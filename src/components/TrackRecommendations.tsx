import { getTrackRecommendations } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import TrackCards from "./TrackCards";

interface Props {
  trackId: string;
}

export default async function TrackRecommendations({ trackId }: Props) {
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  const recommendations = await getTrackRecommendations(session, trackId);

  return (
    <div className="mt-16">
      <h1>Recommendations</h1>
      <TrackCards tracks={recommendations} />
    </div>
  );
}
