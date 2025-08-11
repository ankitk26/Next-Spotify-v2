"use client";

import { Layers } from "lucide-react";
import { usePathname } from "next/navigation";
import LibraryBadge from "./library-badge";
import SidebarAlbumsLibrary from "./sidebar-albums-library";
import SidebarArtistsLibrary from "./sidebar-artists-library";
import SidebarPlaylistsLibrary from "./sidebar-playlists-library";

export default function SideBar() {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="col-span-2 flex min-h-screen flex-col rounded-lg bg-neutral-900 px-2 text-sm">
      <div className="mt-2 flex max-h-full flex-1 flex-col items-stretch overflow-hidden rounded-lg px-2 py-4">
        <div className="flex items-center gap-3 px-2 text-neutral-400">
          <Layers className="h-6 w-6" />
          <span className="font-semibold text-lg">Your Library</span>
        </div>

        <div className="my-6 flex flex-wrap items-center gap-2 font-semibold text-xs">
          <LibraryBadge type="playlists" />
          <LibraryBadge type="albums" />
          <LibraryBadge type="artists" />
        </div>

        <div className="spotify-scrollbar overflow-y-auto scroll-smooth">
          <ul className="mb-20 w-full pr-3 text-sm">
            <SidebarPlaylistsLibrary />
            <SidebarAlbumsLibrary />
            <SidebarArtistsLibrary />
          </ul>
        </div>
      </div>
    </aside>
  );
}
