import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/auth-schema";
import { getAccessToken } from "./get-access-token";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },

  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      scope: [
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-follow-read",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
      ],
    },
  },

  plugins: [
    customSession(async ({ session: authSession, user: authUser }) => {
      const accessToken = await getAccessToken(authSession);

      return {
        user: {
          ...authUser,
          accessToken,
        },
        session: authSession,
      };
    }),
  ],
});
