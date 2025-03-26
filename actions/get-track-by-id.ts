"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Track } from "@/types/types";
import { headers } from "next/headers";

export const getTrackById = async (trackId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<Track>(`/tracks/${trackId}`);

  return data;
};
