import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { auth } from "@/lib/auth";
import { spotifyApiBaseUrl } from "@/constants/constants";
import { betterFetch } from "@better-fetch/fetch";

export interface Context {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
  getRequestWrapper: <T = unknown>(endpoint: string) => Promise<T>;
}

export async function createContext(
  opts: FetchCreateContextFnOptions
): Promise<Context> {
  const headers = new Headers();
  opts.req.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  const session = await auth.api.getSession({
    headers,
  });

  const getRequestWrapper = async <T = unknown>(endpoint: string) => {
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

  return {
    session,
    getRequestWrapper,
  };
}

