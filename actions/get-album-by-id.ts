"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Album } from "@/types/types";
import { headers } from "next/headers";

export const getAlbumById = async (albumId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<Album>(`/albums/${albumId}`);

  return data;
};
