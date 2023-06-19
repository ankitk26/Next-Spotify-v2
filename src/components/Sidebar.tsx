import {
  getUserLikedAlbums,
  getUserLikedArtists,
  getUserLikedPlaylists,
  getUserLikedSongs,
} from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import Image from "next/image";
import SidebarLinksList from "./SidebarLinksList";
import UserLibrary from "./UserLibrary";

export default async function Sidebar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists, albums, artists, likedSongsCount] = await Promise.all([
    getUserLikedPlaylists(session),
    getUserLikedAlbums(session),
    getUserLikedArtists(session),
    getUserLikedSongs(session).then((data) => data.total),
  ]);

  return (
    <aside className="flex flex-col h-[87vh] col-span-2 text-sm rounded-lg">
      <div className="flex flex-col items-center p-4 rounded-lg bg-paper-700">
        <Image
          src="/images/spotify_logo.png"
          width={125}
          height={50}
          alt="Spotify logo"
          priority
        />
        <SidebarLinksList />
      </div>

      <UserLibrary
        likedSongsCount={likedSongsCount}
        playlists={playlists}
        artists={artists}
        albums={albums}
      />
    </aside>
  );
}
