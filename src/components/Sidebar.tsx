import { getUserLikedPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import Image from "next/image";
import Link from "next/link";
import SidebarLinksList from "./SidebarLinksList";

export default async function Sidebar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const playlists = await getUserLikedPlaylists(session);

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-black">
      <div className="flex flex-col items-center h-full m-5 mt-5">
        <Image
          src="/images/spotify_logo.png"
          width={125}
          height={50}
          alt="Spotify logo"
        />

        <SidebarLinksList />

        <div className="w-full h-px mt-4 bg-gray"></div>

        <ul
          id="sidebar-playlists"
          className="flex flex-col w-full gap-3 pr-3 mt-5 overflow-x-hidden text-sm text-gray"
        >
          {playlists.map((playlist) => (
            <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
              <li
                key={playlist.id}
                className="w-full text-sm font-semibold truncate cursor-default hover:text-white"
              >
                {playlist.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
