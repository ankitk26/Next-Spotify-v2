import AlbumCards from "@/components/AlbumCards";
import ArtistCards from "@/components/ArtistCards";
import TracksTable from "@/components/TracksTable";
import { getArtistById, getArtistDiscography } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { Music } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

interface Props {
  params: {
    artistId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading artist data",
    };
  }
  const artistId = params.artistId;
  const artist = await getArtistById(session, artistId);
  return {
    title: `Spotify - ${artist.name}`,
  };
}

export default async function ArtistPage({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  const artistId = params.artistId;

  const [
    artist,
    artistTopTracks,
    artistAlbums,
    artistSingles,
    artistAppearsOn,
    artistCompilation,
    relatedArtists,
  ] = await getArtistDiscography(session, artistId);

  return (
    <div>
      <div className="flex items-end gap-6">
        {artist && (
          <>
            {artist.images.length > 0 ? (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                height={208}
                width={208}
                className="object-cover rounded-full w-52 h-52"
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              <span className="text-sm">
                {artist.followers.total.toLocaleString()} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist.genres.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-4 py-1 text-xs capitalize rounded-full bg-paper-secondary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h1>Popular</h1>
        <div className="-mt-8">
          <TracksTable tracks={artistTopTracks.tracks} noAlbum noArtist />
        </div>
      </div>

      {artistAlbums?.items.length > 0 && (
        <div className="mt-12">
          <h1>Albums</h1>
          <AlbumCards albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items.length > 0 && (
        <div className="mt-12">
          <h1>Singles</h1>
          <AlbumCards albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items.length > 0 && (
        <div className="mt-12">
          <h1>Appears on</h1>
          <AlbumCards albums={artistAppearsOn.items} />
        </div>
      )}

      {artistCompilation?.items.length > 0 && (
        <div className="mt-12">
          <h1>Compilation</h1>
          <AlbumCards albums={artistCompilation.items} />
        </div>
      )}

      {relatedArtists?.artists.length > 0 && (
        <div className="mt-12">
          <h1>Fans also like</h1>
          <ArtistCards artists={relatedArtists.artists} />
        </div>
      )}
    </div>
  );
}
