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
    <aside className="fixed w-64 h-screen text-sm top-2 bottom-2 left-2">
      <div className="flex flex-col items-center p-4 rounded-lg bg-paper-700">
        <Image
          src="/images/spotify_logo.png"
          width={125}
          height={50}
          alt="Spotify logo"
        />
        <SidebarLinksList />
      </div>

      <div className="flex flex-col items-center p-4 mt-2 rounded-lg bg-paper-700">
        <ul className="flex flex-col w-full gap-3 pr-3 overflow-x-hidden overflow-y-scroll text-sm text-gray">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="flex items-center gap-3"
            >
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                height={50}
                width={50}
                className="rounded-md"
              />
              <span className="w-full text-sm font-semibold truncate cursor-default hover:text-white">
                {playlist.name}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
