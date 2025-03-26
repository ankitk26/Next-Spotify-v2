import { getUserLibraryPlaylists } from "@/actions/get-user-playlists";
import { useQuery } from "@tanstack/react-query";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";
import { useSidebarStore } from "@/stores/sidebar-store";

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
      key={"playlist" + playlist.id}
      entity={playlist}
      type="playlists"
      subtitle={playlist.owner.display_name}
    />
  ));
}
