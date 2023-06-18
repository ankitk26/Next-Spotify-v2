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
    // <aside className="fixed w-64 h-screen col-span-2 text-sm top-2 bottom-2 left-2">
    <aside className="col-span-2 rounded-lg overflow-scroll h-[87vh] text-sm">
      <div className="flex flex-col items-center p-4 rounded-lg bg-paper-700">
        <Image
          src="/images/spotify_logo.png"
          width={125}
          height={50}
          alt="Spotify logo"
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
