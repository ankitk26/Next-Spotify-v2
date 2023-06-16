import CardItem from "@/components/CardItem";
import CardItemGrid from "@/components/CardItemGrid";
import { getUserLikedPlaylists, getUserLikedSongs } from "@/lib/actions";
import { Playlist, Track } from "@/types/types";
import { getAuthSession } from "@/utils/serverUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spotify - Your Library",
};

export default async function UserPlaylistsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const likedTracks = await getUserLikedSongs(session, 5);
  const playlists = await getUserLikedPlaylists(session);

  return (
    <>
      <h1>Playlists</h1>
      <CardItemGrid>
        <Link
          href="/collection/tracks"
          className="flex flex-col items-start justify-end col-span-2 gap-8 p-4 rounded cursor-pointer"
          style={{
            background: "linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)",
          }}
        >
          <div className="inline">
            {likedTracks.map((track: Track) => (
              <span key={track.id} className="mr-3">
                <span>{track.artists[0].name}</span>{" "}
                <span className="text-white opacity-70">{track.name}</span>
              </span>
            ))}
          </div>
          <div>
            <h1 className="text-4xl font-bold">Liked songs</h1>
            <h3 className="mt-1">{likedTracks.length} liked songs</h3>
          </div>
        </Link>

        {playlists?.map((playlist: Playlist) => (
          <CardItem
            key={playlist.id}
            heading={playlist.name}
            id={playlist.id}
            images={playlist.images}
            altTitle={playlist.name}
            subheading={playlist.description}
            type="playlists"
          />
        ))}
      </CardItemGrid>
    </>
  );
}
