"use server";

import { auth } from "@/lib/auth";
import { getRequestWrapper } from "@/lib/get-request-wrapper";
import { Category } from "@/types/types";
import { headers } from "next/headers";

export const getCategoryById = async (categoryId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Invalid request");
  }

  const data = await getRequestWrapper<Category>(
    `/browse/categories/${categoryId}`
  );

  return data;
};
