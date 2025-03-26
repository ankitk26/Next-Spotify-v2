"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Album, Artist, Playlist, Track } from "@/types/types";
import { headers } from "next/headers";

type SearchResults = {
  tracks: {
    items: Track[];
  };
  artists: {
    items: Artist[];
  };
  albums: {
    items: Album[];
  };
  playlists: {
    items: Playlist[] | null[];
  };
};

export const getSearchItems = async (
  type: "artist" | "album" | "track" | "playlist" | "all",
  query: string,
  limit = 5
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  let searchType: string;
  if (type === "all") {
    searchType = "album,artist,track,playlist";
  } else {
    searchType = type;
  }

  const data = await getRequestWrapper<SearchResults>(
    `/search?q=${query}&market=from_token&type=${searchType}&limit=${limit}`
  );

  return {
    tracks: data?.tracks?.items,
    artists: data?.artists?.items,
    albums: data?.albums?.items,
    playlists: data?.playlists?.items,
  };
};
