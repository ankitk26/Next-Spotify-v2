import { getArtistSingles } from "@/actions/get-artist-singles";
import AlbumCards from "@/components/album-cards";

export default async function ArtistSingles({
  artistId,
}: {
  artistId: string;
}) {
  const artistSingles = await getArtistSingles(artistId);

  if (artistSingles?.length === 0 || !artistSingles) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Singles</h1>
      <AlbumCards albums={artistSingles} />
    </div>
  );
}
