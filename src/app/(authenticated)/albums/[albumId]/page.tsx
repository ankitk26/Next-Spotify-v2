import TracksTable from "@/components/TracksTable";
import { getAlbumById } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { Music } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    albumId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading album data",
    };
  }
  const albumId = params.albumId;
  const album = await getAlbumById(session, albumId);
  return {
    title: `Spotify - ${album.name}`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  const albumId = params.albumId;
  const album = await getAlbumById(session, albumId);

  return (
    <>
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images && album.images.length > 0 ? (
              <Image
                src={album.images[0].url as string}
                alt={album.name}
                height={208}
                width={208}
                className="object-contain rounded-sm w-52 h-52"
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type}
              </h5>
              <h2 className="text-5xl font-bold">{album.name}</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{album.artists[0].name}</span>
                <span>{album.release_date}</span>
                {album.tracks && album.tracks.items.length > 0 && (
                  <span className="text-gray">{album.tracks.total} songs</span>
                )}{" "}
              </div>
            </div>
          </>
        )}
      </div>

      <TracksTable tracks={album.tracks.items} noAlbum />
    </>
  );
}
