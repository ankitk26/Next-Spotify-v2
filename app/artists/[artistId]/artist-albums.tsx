import { getArtistAlbums } from "@/actions/get-artist-albums";
import AlbumCards from "@/components/album-cards";

export default async function ArtistAlbums({ artistId }: { artistId: string }) {
  const artistAlbums = await getArtistAlbums(artistId);

  if (artistAlbums?.length === 0 || !artistAlbums) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Albums</h1>
      <AlbumCards albums={artistAlbums} />
    </div>
  );
}
