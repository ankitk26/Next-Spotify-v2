import { getUserTopTracks } from "@/actions/get-user-top-tracks";
import ArtistCards from "@/components/artist-cards";
import { Artist } from "@/types/types";

export default async function TopArtists() {
  const topArtists = (await getUserTopTracks({
    limit: 15,
    type: "artists",
  })) as Artist[];

  return <ArtistCards artists={topArtists} />;
}
