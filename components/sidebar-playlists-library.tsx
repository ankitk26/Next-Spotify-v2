"use client";

import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarLikedSongs from "./sidebar-liked-songs";
import SidebarUserPlaylists from "./sidebar-user-playlists";

export default function SidebarPlaylistsLibrary() {
  const library = useSidebarStore((store) => store.library);

  if (library !== "playlists") {
    return null;
  }

  return (
    <>
      <SidebarLikedSongs />
      <SidebarUserPlaylists />
    </>
  );
}
