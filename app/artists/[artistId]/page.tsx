import { Music } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next/types";
import { getArtistById } from "@/actions/get-artist-by-id";
import ArtistAlbums from "./artist-albums";
import ArtistAppearsOn from "./artist-appears-on";
import ArtistCompilation from "./artist-compilation";
import ArtistTopTracks from "./artist-popular-tracks";
import ArtistSingles from "./artist-singles";

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
                alt={artist.name}
                className="h-52 w-52 rounded-full object-cover"
                height={208}
                priority
                src={artist.images[0].url}
                width={208}
              />
            ) : (
              <div className="h-40 w-full">
                <Music className="h-full w-full bg-neutral-700" size={160} />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="font-bold text-5xl">{artist.name}</h2>
              <span className="text-sm">
                {artist.followers?.total.toLocaleString()} followers
              </span>
              <div className="flex items-center gap-5 text-sm">
                {artist?.genres?.map((genre: string) => (
                  <span
                    className="rounded-full bg-neutral-800 px-4 py-1 text-xs capitalize hover:bg-neutral-950"
                    key={genre}
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
