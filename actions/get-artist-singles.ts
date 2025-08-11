"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Album } from "@/types/types";

export const getArtistSingles = async (artistId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ items: Album[] }>(
    `/artists/${artistId}/albums?include_groups=single`
  );

  return data?.items;
};
