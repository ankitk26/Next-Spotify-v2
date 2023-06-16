import ArtistCards from "@/components/ArtistCards";
import { getUserLikedArtists } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spotify - Your Library",
};

export default async function FollowedArtistsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const followedArtists = await getUserLikedArtists(session);

  return (
    <>
      <h1>Artists</h1>
      <ArtistCards artists={followedArtists} />
    </>
  );
}
