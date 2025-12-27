"use client";

import { trpc } from "@/lib/trpc/react";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarArtistsLibrary() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = trpc.spotify.library.artists.useQuery(
    undefined,
    {
      enabled: library === "artists",
    }
  );

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
