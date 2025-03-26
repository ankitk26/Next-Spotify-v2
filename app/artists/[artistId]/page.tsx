import { getArtistById } from "@/actions/get-artist-by-id";
import { Music } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next/types";
import ArtistAlbums from "./artist-albums";
import ArtistTopTracks from "./artist-popular-tracks";
import ArtistSingles from "./artist-singles";
import ArtistAppearsOn from "./artist-appears-on";
import ArtistCompilation from "./artist-compilation";

type Props = {
  params: Promise<{
    artistId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const artistId = params.artistId;
  const artist = await getArtistById(artistId);
  return {
    title: `Spotify - ${artist?.name}`,
  };
}

export default async function ArtistPage(props: Props) {
  const params = await props.params;
  const artistId = params.artistId;

  const artist = await getArtistById(artistId);

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
                priority
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-neutral-700" />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              <span className="text-sm">
                {artist.followers?.total.toLocaleString()} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist?.genres?.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-4 py-1 text-xs capitalize rounded-full bg-neutral-800 hover:bg-neutral-950"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <ArtistTopTracks artistId={artistId} />
      <ArtistAlbums artistId={artistId} />
      <ArtistSingles artistId={artistId} />
      <ArtistAppearsOn artistId={artistId} />
      <ArtistCompilation artistId={artistId} />
    </div>
  );
}
