"use client";

import { useQuery } from "@tanstack/react-query";
import { Dot, Music } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import TracksTable from "@/components/tracks-table";
import { Skeleton } from "@/components/ui/skeleton";
import { playlistByIdQuery } from "@/lib/queries";
import PlaylistDescription from "./playlist-description";

export default function PlaylistPage() {
  const params = useParams();
  const playlistId = params.playlistId as string;

  const { data: playlist, isPending } = useQuery(playlistByIdQuery(playlistId));

  if (isPending) {
    return (
      <div className="flex items-end gap-6">
        <Skeleton className="h-60 w-60 rounded-sm" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-16 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images.length > 0 ? (
              <Image
                alt={playlist.name}
                className="h-60 w-60 rounded-sm object-contain"
                height={240}
                priority
                src={playlist.images[0].url}
                width={240}
              />
            ) : (
              <div className="h-40 w-full">
                <Music className="h-full w-full bg-neutral-800" size={160} />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-xs uppercase">{playlist.type}</h5>
              <h2 className="font-bold text-6xl">{playlist.name}</h2>

              {playlist.description && (
                <PlaylistDescription description={playlist.description} />
              )}

              <div className="flex items-center font-semibold text-sm">
                <span>{playlist.owner?.display_name}</span>
                {playlist.followers.total > 0 && (
                  <>
                    <Dot />
                    <span>
                      {playlist.followers.total.toLocaleString()}{" "}
                      {playlist.followers.total > 1 ? "likes" : "like"}
                    </span>
                  </>
                )}
                {playlist.tracks.length > 0 && (
                  <>
                    <Dot />
                    <span>{playlist.tracks.length.toLocaleString()} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        {playlist?.tracks && (
          <TracksTable
            showAlbum
            showCover
            showHeader
            showSubtitle
            tracks={playlist?.tracks.filter((track) => track !== null)}
          />
        )}
      </div>
    </>
  );
}
