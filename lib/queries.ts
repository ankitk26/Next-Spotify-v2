import { queryOptions } from "@tanstack/react-query";
import { getAlbumById } from "@/actions/get-album-by-id";
import { getArtistAlbums } from "@/actions/get-artist-albums";
import { getArtistAppearsOnAlbums } from "@/actions/get-artist-appears-on-albums";
import { getArtistById } from "@/actions/get-artist-by-id";
import { getArtistCompilation } from "@/actions/get-artist-compilation";
import { getArtistSingles } from "@/actions/get-artist-singles";
import { getArtistTopTracks } from "@/actions/get-artist-top-tracks";
import { getLikedSongs } from "@/actions/get-liked-songs";
import { getPlaylistById } from "@/actions/get-playlist-by-id";
import { getRecentlyPlayedTracks } from "@/actions/get-recently-played";
import { getSearchItems } from "@/actions/get-search-items";
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

export const likedSongsFullQuery = () =>
  queryOptions({
    queryKey: ["liked_songs_full"],
    queryFn: getLikedSongs,
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

export const searchQuery = (
  type: "artist" | "album" | "track" | "playlist" | "all",
  query: string,
  limit = 5
) =>
  queryOptions({
    queryKey: ["search", type, query, limit],
    queryFn: () => getSearchItems(type, query, limit),
  });

export const artistByIdQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist", artistId],
    queryFn: () => getArtistById(artistId),
  });

export const artistAlbumsQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist_albums", artistId],
    queryFn: () => getArtistAlbums(artistId),
  });

export const artistTopTracksQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist_top_tracks", artistId],
    queryFn: () => getArtistTopTracks(artistId),
  });

export const artistSinglesQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist_singles", artistId],
    queryFn: () => getArtistSingles(artistId),
  });

export const artistAppearsOnQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist_appears_on", artistId],
    queryFn: () => getArtistAppearsOnAlbums(artistId),
  });

export const artistCompilationQuery = (artistId: string) =>
  queryOptions({
    queryKey: ["artist_compilation", artistId],
    queryFn: () => getArtistCompilation(artistId),
  });

export const albumByIdQuery = (albumId: string) =>
  queryOptions({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
  });

export const playlistByIdQuery = (playlistId: string) =>
  queryOptions({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistById(playlistId),
  });
