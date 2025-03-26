"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Artist } from "@/types/types";
import { headers } from "next/headers";

export const getUserLibraryArtists = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ artists: { items: Artist[] } }>(
    "/me/following?type=artist&limit=50"
  );

  return data?.artists.items;
};
