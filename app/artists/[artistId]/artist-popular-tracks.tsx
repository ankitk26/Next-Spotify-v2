import { getArtistTopTracks } from "@/actions/get-artist-top-tracks";
import TracksTable from "@/components/tracks-table";

export default async function ArtistTopTracks({
  artistId,
}: {
  artistId: string;
}) {
  const artistTopTracks = await getArtistTopTracks(artistId);

  if (!artistTopTracks || artistTopTracks.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h1>Popular</h1>
      <div className="-mt-8">
        <TracksTable showCover tracks={artistTopTracks} />
      </div>
    </div>
  );
}
