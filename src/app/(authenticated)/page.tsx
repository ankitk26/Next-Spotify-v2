import AlbumCards from "@/components/AlbumCards";
import ArtistCards from "@/components/ArtistCards";
import PlayTrackButton from "@/components/PlayTrackButton";
import TrackCards from "@/components/TrackCards";
import {
  getNewReleases,
  getRecentlyPlayedTracks,
  getTopItems,
} from "@/lib/actions";
import { Artist, Track } from "@/types/types";
import { getGreeting } from "@/utils/clientUtils";
import { getAuthSession } from "@/utils/serverUtils";
import { Album } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome to Spotify",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const recentlyPlayed = (await getRecentlyPlayedTracks(session, 10).then(
    (data) => data.items.map((item: any) => item.track)
  )) as Track[];

  const topTracks = (await getTopItems({
    session,
    limit: 9,
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const allTimeTopTracks = (await getTopItems({
    session,
    limit: 10,
    timeRange: "long_term",
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const topArtists = (await getTopItems({
    session,
    limit: 12,
    type: "artists",
  }).then((data) => data.items)) as Artist[];

  const newReleases = await getNewReleases(session);

  return (
    <section className="flex flex-col items-start">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>

      <h1 className="mt-8">Top Tracks</h1>
      <div className="grid w-full grid-cols-12 gap-4">
        {topTracks.map((track) => (
          <Link
            href={`/tracks/${track.id}`}
            key={track.id}
            className="flex items-center justify-between col-span-4 pr-4 truncate rounded-md group/item bg-paper-600 hover:bg-paper-400"
          >
            <div className="flex items-center gap-4">
              {track.album.images.length > 0 ? (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={72}
                  height={72}
                  className="object-cover h-full rounded-tl-md rounded-bl-md aspect-square"
                />
              ) : (
                <Album size={20} />
              )}
              <h3 className="font-semibold truncate">{track.name}</h3>
            </div>

            <PlayTrackButton
              track={track}
              variant="filled"
              className="invisible w-12 h-12 text-3xl group/btn group-hover/item:visible"
            />
          </Link>
        ))}
      </div>

      <h1 className="mt-16">Recently played</h1>
      <TrackCards tracks={recentlyPlayed} />

      <h1 className="mt-16">Time Capsule</h1>
      <TrackCards tracks={allTimeTopTracks} />

      <h1 className="mt-16">Top Artists</h1>
      <ArtistCards artists={topArtists} />

      <h1 className="mt-16">New releases</h1>
      <AlbumCards albums={newReleases} />
    </section>
  );
}
