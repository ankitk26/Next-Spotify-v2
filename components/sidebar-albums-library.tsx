"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserLibraryAlbums } from "@/actions/get-user-albums";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarAlbumsLibrary() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = useQuery({
    queryKey: ["sidebar_albums"],
    queryFn: getUserLibraryAlbums,
    enabled: library === "albums",
  });

  if (library !== "albums") {
    return null;
  }

  if (isPending) {
    return <SideBarSkeleton />;
  }

  return data?.map((album) => (
    <SidebarLibraryItem
      entity={album.album}
      key={`album_${album.album.id}`}
      subtitle={
        album.album.artists.length > 0 ? album.album.artists[0].name : ""
      }
      type="albums"
    />
  ));
}
