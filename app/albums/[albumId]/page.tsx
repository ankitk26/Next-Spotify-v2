"use client";

import { Dot, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import TracksTable from "@/components/tracks-table";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/react";

export default function AlbumPage() {
  const params = useParams();
  const albumId = params.albumId as string;

  const { data: album, isPending } =
    trpc.spotify.album.byId.useQuery({ albumId });

  if (isPending) {
    return (
      <div className="flex items-end gap-6">
        <Skeleton className="aspect-square h-52 w-52 rounded-sm" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

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
