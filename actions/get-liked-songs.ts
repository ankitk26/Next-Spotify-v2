"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Track } from "@/types/types";

export type LikedSongs = {
  total: number;
  items: {
    track: Track;
  }[];
  next: string | null;
};

export const getLikedSongs = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<LikedSongs>("/me/tracks?limit=50");

  if (!data) {
    return {
      total: 0,
      tracks: [] as Track[],
    };
  }

  const finalData = { total: data.total, items: data.items };
  let currUrl = data?.next;

  while (currUrl !== null) {
    const nextData = await getRequestWrapper<LikedSongs>(currUrl as string);

    if (!nextData) {
      continue;
    }

    finalData.items.push(...nextData.items);
    currUrl = nextData.next;
  }

  return {
    total: data.total,
    items: data.items.map((item) => item.track),
  };
};
