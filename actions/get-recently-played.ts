"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Track } from "@/types/types";
import { headers } from "next/headers";

export const getRecentlyPlayedTracks = async (limit: number = 50) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: { track: Track }[] }>(
    `/me/player/recently-played?limit=${limit}`
  );

  return data?.items.map((item) => item.track);
};
