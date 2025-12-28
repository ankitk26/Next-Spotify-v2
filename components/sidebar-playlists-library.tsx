"use client";

import { useAppStore } from "@/stores/app-store";
import SidebarLikedSongs from "./sidebar-liked-songs";
import SidebarUserPlaylists from "./sidebar-user-playlists";

export default function SidebarPlaylistsLibrary() {
  const library = useAppStore((store) => store.library);

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
