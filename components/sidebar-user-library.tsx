import { Layers } from "lucide-react";
import LibraryBadge from "./library-badge";

export default function SidebarUserLibrary() {
  return (
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

      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-500 scroll-smooth">
        <ul className="w-full pr-3 text-sm">
          {/* <SidebarPlaylistsLibrary />
          <SidebarAlbumsLibrary />
          <SidebarArtistsLibrary /> */}
        </ul>
      </div>
    </div>
  );
}
