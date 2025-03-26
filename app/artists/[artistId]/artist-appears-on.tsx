import { getArtistAppearsOnAlbums } from "@/actions/get-artist-appears-on-albums";
import AlbumCards from "@/components/album-cards";

export default async function ArtistAppearsOn({
  artistId,
}: {
  artistId: string;
}) {
  const artistAppearsOnAlbums = await getArtistAppearsOnAlbums(artistId);

  if (artistAppearsOnAlbums?.length === 0 || !artistAppearsOnAlbums) {
    return null;
  }

  return (
    <div className="mt-12">
      <h1>Appears On</h1>
      <AlbumCards albums={artistAppearsOnAlbums} />
    </div>
  );
}
