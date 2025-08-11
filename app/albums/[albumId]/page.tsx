import { Dot, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next/types";
import { getAlbumById } from "@/actions/get-album-by-id";
import TracksTable from "@/components/tracks-table";

type Props = {
  params: Promise<{
    albumId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const albumId = params.albumId;
  const album = await getAlbumById(albumId);
  return {
    title: `Spotify - ${album?.name}`,
  };
}

export default async function AlbumPage(props: Props) {
  const params = await props.params;
  const albumId = params.albumId;
  const album = await getAlbumById(albumId);

  return (
    <>
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images && album.images.length > 0 ? (
              <Image
                alt={album.name}
                className="aspect-square h-52 w-52 rounded-sm object-cover"
                height={208}
                priority
                src={album.images[0].url as string}
                width={208}
              />
            ) : (
              <div className="h-40 w-full">
                <Music className="h-full w-full" size={160} />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-xs uppercase">
                {album.album_type}
              </h5>
              <h2 className="font-bold text-5xl">{album.name}</h2>

              <div className="flex items-center font-semibold text-sm">
                <Link
                  className="hover:underline"
                  href={`/artists/${album.artists[0].id}`}
                >
                  {album.artists[0].name}
                </Link>
                <Dot />
                <span>{new Date(album.release_date).getFullYear()}</span>
                {album.tracks && album.tracks.items.length > 0 && (
                  <>
                    <Dot />
                    <span>{album.tracks.total} songs</span>
                  </>
                )}{" "}
              </div>
            </div>
          </>
        )}
      </div>

      <TracksTable
        showHeader
        showSubtitle
        tracks={album ? album.tracks.items : []}
      />
    </>
  );
}
