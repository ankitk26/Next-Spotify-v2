"use server";

import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "./auth";
import { spotifyApiBaseUrl } from "@/constants/constants";

export const getRequestWrapper = async <T = unknown>(endpoint: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Session not found");
  }

  const res = await betterFetch<T>(endpoint, {
    baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  return res.data;
};
