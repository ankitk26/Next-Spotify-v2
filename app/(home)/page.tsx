import { getGreeting } from "@/lib/get-greeting";
import RecentlyPlayed from "./recently-played";
import UserTopTracks from "./user-top-tracks";
import TimeCapsule from "./time-capsule";
import TopArtists from "./top-artists";

export const metadata = {
  title: "Welcome to Spotify",
};

export default async function Home() {
  return (
    <section className="flex flex-col items-start">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>

      <h1 className="mt-8">Top Tracks</h1>
      <UserTopTracks />

      <h1 className="mt-16">Recently played</h1>
      <RecentlyPlayed />

      <h1 className="mt-16">Time Capsule</h1>
      <TimeCapsule />

      <h1 className="mt-16">Top Artists</h1>
      <TopArtists />
    </section>
  );
}
