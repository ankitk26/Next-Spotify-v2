"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Artist, Track } from "@/types/types";

type Props = {
  timeRange?: "long_term" | "short_term" | "medium_term";
  limit: number;
  type: "artists" | "tracks";
};

type ResponseData<T extends "artists" | "tracks"> = {
  items: T extends "artists" ? Artist[] : Track[];
};

export const getTimeCapsule = async ({
  timeRange = "short_term",
  limit = 50,
  type = "artists",
}: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<ResponseData<typeof type>>(
    `/me/top/${type}?time_range=${timeRange}&limit=${limit}`
  );

  return data?.items;
};
