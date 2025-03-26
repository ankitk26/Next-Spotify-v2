import { getArtistCompilation } from "@/actions/get-artist-compilation";
import AlbumCards from "@/components/album-cards";

export default async function ArtistCompilation({
  artistId,
}: {
  artistId: string;
}) {
  const artistCompilation = await getArtistCompilation(artistId);

  if (artistCompilation?.length === 0 || !artistCompilation) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Compilation</h1>
      <AlbumCards albums={artistCompilation} />
    </div>
  );
}
