"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Playlist } from "@/types/types";
import { headers } from "next/headers";

export const getUserLibraryPlaylists = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: Playlist[] }>("/me/playlists");

  return data?.items;
};
