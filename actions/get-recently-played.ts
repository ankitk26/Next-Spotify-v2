"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Track } from "@/types/types";

export const getRecentlyPlayedTracks = async (limit = 50) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: { track: Track }[] }>(
    `/me/player/recently-played?limit=${limit}`
  );

  return data?.items.map((item: { track: Track }) => item.track);
};
