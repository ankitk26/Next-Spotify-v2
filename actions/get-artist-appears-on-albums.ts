"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Album } from "@/types/types";
import { headers } from "next/headers";

export const getArtistAppearsOnAlbums = async (artistId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: Album[] }>(
    `/artists/${artistId}/albums?include_groups=appears_on`
  );

  return data?.items;
};
