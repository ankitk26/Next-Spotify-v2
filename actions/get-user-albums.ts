"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Album } from "@/types/types";
import { headers } from "next/headers";

export const getUserLibraryAlbums = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: { album: Album }[] }>(
    "/me/albums?market=from_token&limit=50"
  );

  return data?.items;
};
