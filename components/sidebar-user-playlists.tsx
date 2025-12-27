import { useQuery } from "@tanstack/react-query";
import { sidebarPlaylistsQuery } from "@/lib/queries";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarUserPlaylists() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = useQuery(sidebarPlaylistsQuery(library));

  if (isPending) {
    return <SideBarSkeleton />;
  }

  return data?.map((playlist) => (
    <SidebarLibraryItem
      entity={playlist}
      key={`playlist${playlist.id}`}
      subtitle={playlist.owner.display_name}
      type="playlists"
    />
  ));
}
