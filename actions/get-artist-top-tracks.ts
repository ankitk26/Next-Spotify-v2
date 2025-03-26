"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Track } from "@/types/types";
import { headers } from "next/headers";

export const getArtistTopTracks = async (artistId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ tracks: Track[] }>(
    `/artists/${artistId}/top-tracks?market=from_token`
  );

  return data?.tracks;
};
