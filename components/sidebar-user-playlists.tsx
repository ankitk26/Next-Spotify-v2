import { useQuery } from "@tanstack/react-query";
import { getUserLibraryPlaylists } from "@/actions/get-user-playlists";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarUserPlaylists() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = useQuery({
    queryKey: ["sidebar_playlists"],
    queryFn: getUserLibraryPlaylists,
    enabled: library === "playlists",
  });

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
