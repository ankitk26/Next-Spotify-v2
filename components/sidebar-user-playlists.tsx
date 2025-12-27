"use client";

import { trpc } from "@/lib/trpc/react";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLibraryItem from "./sidebar-library-item";
import SideBarSkeleton from "./sidebar-skeleton";

export default function SidebarUserPlaylists() {
  const library = useSidebarStore((store) => store.library);

  const { data, isPending } = trpc.spotify.library.playlists.useQuery(
    undefined,
    {
      enabled: library === "playlists",
    }
  );

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
