import { DefaultSession } from "next-auth";

interface AuthUser {
  name: string;
  email: string;
  picture?: string | null;
  image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Category {
  id: string;
  name: string;
  icons: Image[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  album_type?: string;
  release_date: string;
  tracks: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  preview_url: string;
}

export interface Playlist {
  description?: string;
  id: string;
  followers: {
    total: number;
  };
  images: Image[];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track }];
  tracks: {
    items: [{ added_at: string; track: Track }];
    total: number;
  };
  type: string;
  total?: number;
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: Playlist[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface TrackAnalysis {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: 1 | 0;
  speechiness: number;
  tempo: number;
  valence: number;
}
