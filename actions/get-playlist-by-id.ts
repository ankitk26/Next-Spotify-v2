"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Playlist, Track } from "@/types/types";

export const getPlaylistById = async (playlistId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<Playlist>(`/playlists/${playlistId}`);

  if (!data) {
    return null;
  }

  const playlist = {
    ...data,
    tracks: data.tracks.items.map((item) => item.track),
  };

  let currUrl = data.tracks.next;

  while (currUrl !== null) {
    const nextData = await getRequestWrapper<{
      items: { track: Track }[];
      next?: string;
    }>(currUrl as string);
    if (nextData) {
      playlist.tracks.push(...nextData.items.map((item) => item.track));
    }
    currUrl = nextData?.next;
  }

  return playlist;
};
