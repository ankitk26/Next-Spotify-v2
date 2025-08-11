"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Album } from "@/types/types";

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
