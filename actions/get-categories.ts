"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import type { Category } from "@/types/types";

export const getCategories = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<{ categories: { items: Category[] } }>(
    "/browse/categories?limit=50&country=IN"
  );

  return data?.categories.items;
};
