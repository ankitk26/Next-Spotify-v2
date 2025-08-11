"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserLibraryArtists } from "@/actions/get-user-artists";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarArtistsLibrary() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = useQuery({
    queryKey: ["sidebar_artists"],
    queryFn: getUserLibraryArtists,
    enabled: library === "artists",
  });

  if (library !== "artists") {
    return null;
  }

  if (isPending) {
    return <SideBarSkeleton />;
  }

  return data?.map((artist) => (
    <SidebarLibraryItem
      entity={artist}
      key={`artist_${artist.id}`}
      type="artists"
    />
  ));
}
