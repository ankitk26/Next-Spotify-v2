import { queryOptions } from "@tanstack/react-query";
import { getLikedSongs } from "@/actions/get-liked-songs";
import { getRecentlyPlayedTracks } from "@/actions/get-recently-played";
import { getUserLibraryAlbums } from "@/actions/get-user-albums";
import { getUserLibraryArtists } from "@/actions/get-user-artists";
import { getUserLibraryPlaylists } from "@/actions/get-user-playlists";
import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import type { SidebarLibrary } from "@/stores/sidebar-store";
import type { Artist, Track } from "@/types/types";

export const likedSongsQuery = (library: SidebarLibrary) =>
  queryOptions({
    queryKey: ["liked_songs"],
    queryFn: getLikedSongs,
    select: (data) => {
      return data.total;
    },
    enabled: library === "playlists",
  });

export const recentlyPlayedQuery = (limit = 10) =>
  queryOptions({
    queryKey: ["recently_played"],
    queryFn: () => getRecentlyPlayedTracks(limit),
  });

export const timeCapsuleQuery = (limit = 10) =>
  queryOptions({
    queryKey: ["time_capsule"],
    queryFn: () =>
      getUserTopTracks({
        limit,
        type: "tracks",
        timeRange: "long_term",
      }) as Promise<Track[]>,
  });

export const topArtistsQuery = (limit = 15) =>
  queryOptions({
    queryKey: ["top_artists"],
    queryFn: () =>
      getUserTopTracks({
        limit,
        type: "artists",
      }) as Promise<Artist[]>,
  });

export const userTopTracksQuery = (limit = 10) =>
  queryOptions({
    queryKey: ["user_top_tracks"],
    queryFn: () =>
      getUserTopTracks({
        limit,
        type: "tracks",
      }) as Promise<Track[]>,
  });

export const sidebarAlbumsQuery = (library: SidebarLibrary) =>
  queryOptions({
    queryKey: ["sidebar_albums"],
    queryFn: getUserLibraryAlbums,
    enabled: library === "albums",
  });

export const sidebarArtistsQuery = (library: SidebarLibrary) =>
  queryOptions({
    queryKey: ["sidebar_artists"],
    queryFn: getUserLibraryArtists,
    enabled: library === "artists",
  });

export const sidebarPlaylistsQuery = (library: SidebarLibrary) =>
  queryOptions({
    queryKey: ["sidebar_playlists"],
    queryFn: getUserLibraryPlaylists,
    enabled: library === "playlists",
  });
