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
    <aside className="flex flex-col min-h-screen col-span-2 px-2 text-sm bg-neutral-900 rounded-lg">
      <div className="flex flex-col items-stretch flex-1 max-h-full px-2 py-4 mt-2 overflow-hidden rounded-lg">
        <div className="flex items-center gap-3 px-2 text-neutral-400">
          <Layers className="h-6 w-6" />
          <span className="font-semibold text-lg">Your Library</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 my-6 text-xs font-semibold">
          <LibraryBadge type="playlists" />
          <LibraryBadge type="albums" />
          <LibraryBadge type="artists" />
        </div>

        <div className="overflow-y-auto spotify-scrollbar scroll-smooth">
          <ul className="w-full pr-3 text-sm mb-20">
            <SidebarPlaylistsLibrary />
            <SidebarAlbumsLibrary />
            <SidebarArtistsLibrary />
          </ul>
        </div>
      </div>
    </aside>
  );
}
