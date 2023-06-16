import AlbumCards from "@/components/AlbumCards";
import ArtistCards from "@/components/ArtistCards";
import TrackCards from "@/components/TrackCards";
import {
  getNewReleases,
  getRecentlyPlayedTracks,
  getTopItems,
} from "@/lib/actions";
import { getGreeting } from "@/utils/clientUtils";
import { getAuthSession } from "@/utils/serverUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome to Spotify",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const recentlyPlayed = await getRecentlyPlayedTracks(session);
  const topTracks = await getTopItems({ session, limit: 12, type: "tracks" });
  const topArtists = await getTopItems({ session, limit: 12, type: "artists" });
  const newReleases = await getNewReleases(session);

  return (
    <section className="flex flex-col items-start">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>

      <h1 className="mt-10">Recently played</h1>
      <TrackCards
        tracks={recentlyPlayed.items.map((track: any) => track.track)}
      />

      <h1 className="mt-16">Top Tracks</h1>
      <TrackCards tracks={topTracks.items} />

      <h1 className="mt-16">Top Artists</h1>
      <ArtistCards artists={topArtists.items} />

      <h1 className="mt-16">New releases</h1>
      <AlbumCards albums={newReleases} />
    </section>
  );
}
