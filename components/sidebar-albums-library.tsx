"use client";

import { getUserLibraryAlbums } from "@/actions/get-user-albums";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useQuery } from "@tanstack/react-query";
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
      key={"album_" + album.album.id}
      entity={album.album}
      type="albums"
      subtitle={
        album.album.artists.length > 0 ? album.album.artists[0].name : ""
      }
    />
  ));
}
