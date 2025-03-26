"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Category } from "@/types/types";
import { headers } from "next/headers";

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
