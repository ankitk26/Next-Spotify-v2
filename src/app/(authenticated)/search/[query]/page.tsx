import AlbumCards from "@/components/AlbumCards";
import ArtistCards from "@/components/ArtistCards";
import PlaylistCards from "@/components/PlaylistCards";
import SearchResultHeader from "@/components/SearchResultHeader";
import { getSearchItems } from "@/lib/actions";
import { Artist } from "@/types/types";
import { fmtMSS } from "@/utils/clientUtils";
import { getAuthSession } from "@/utils/serverUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: {
    query: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = params.query;
  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchResults({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const query = params.query;
  const searchResults = await getSearchItems(session, "all", query);

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col items-stretch mt-4">
        <SearchResultHeader query={query} resultType="tracks" />

        {searchResults.tracks.items.slice(0, 5).map((track: any) => (
          <div
            className="grid items-center grid-cols-12 col-span-12 my-3"
            key={track.id}
          >
            <div className="flex items-center w-full col-span-11">
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={40}
                height={40}
                className="object-contain w-10 h-10 rounded"
              />

              <div className="flex flex-col w-10/12 ml-4 text-sm font-medium truncate">
                <h4>{track.name}</h4>

                <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
                  {track.artists.map((artist: Artist, index: number) => (
                    <>
                      {index !== 0 && ", "}
                      <Link key={artist.id} href={`/artists/${artist.id}`}>
                        <span className="truncate hover:text-white hover:underline">
                          {artist.name}
                        </span>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            </div>

            <span className="flex justify-end w-full col-span-1 text-sm text-gray">
              {fmtMSS(track.duration_ms)}
            </span>
          </div>
        ))}
      </div>

      {searchResults.artists.items.length > 0 && (
        <div>
          <SearchResultHeader query={query} resultType="artists" />
          <ArtistCards artists={searchResults.artists.items.slice(0, 6)} />
        </div>
      )}

      {searchResults.albums.items.length > 0 && (
        <div>
          <SearchResultHeader query={query} resultType="albums" />
          <AlbumCards albums={searchResults.albums.items.slice(0, 6)} />
        </div>
      )}

      {searchResults.playlists.items.length > 0 && (
        <div>
          <SearchResultHeader query={query} resultType="playlists" />
          <PlaylistCards
            playlists={searchResults.playlists.items.slice(0, 6)}
          />
        </div>
      )}
    </div>
  );
}
