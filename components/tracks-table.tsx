/** biome-ignore-all lint/suspicious/noArrayIndexKey: ignore this rule */
"use client";

import { Clock3, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatMs } from "@/lib/format-ms";
import { cn } from "@/lib/utils";
import type { Track } from "@/types/types";

interface Props {
  tracks: Track[];
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showSubtitle?: boolean;
}

export default function TracksTable({
  tracks,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showAlbum = false,
}: Props) {
  return (
    <div className="mt-8">
      {/* Table Header */}

      {showHeader && (
        <>
          <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-neutral-400">
            <div className="col-span-1 text-left font-semibold uppercase tracking-wider">
              #
            </div>

            <div
              className={cn(
                "text-left font-semibold text-sm",
                showAlbum ? "col-span-6" : "col-span-10"
              )}
            >
              Title
            </div>

            {showAlbum && (
              <div className="col-span-4 text-left font-semibold text-sm">
                Album
              </div>
            )}

            <div className="col-span-1 text-left font-semibold">
              <Clock3 size={16} />
            </div>
          </header>

          {/* Divider */}
          <div className="col-span-12 border-neutral-900 border-b" />
        </>
      )}

      {/* Table Rows */}
      <div className="col-span-12 mt-2 w-full">
        {tracks
          ?.filter((track) => track.name.trim().length > 0)
          .map((track, index) => (
            <div
              className="grid grid-cols-12 rounded-lg bg-transparent px-4 py-2 hover:bg-neutral-800"
              key={track.id + String(index)}
            >
              <span className="col-span-1 flex items-center text-neutral-400 text-sm">
                {index + 1}
              </span>

              <div
                className={cn(
                  "flex w-full items-center",
                  showAlbum ? "col-span-6" : "col-span-10"
                )}
              >
                <div className="flex w-full items-center gap-4">
                  {showCover &&
                    (track.album.images && track.album.images.length > 0 ? (
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          alt={track.name}
                          className="h-10 w-10 rounded object-contain"
                          height={40}
                          src={track.album.images?.[0].url as string}
                          width={40}
                        />
                      </div>
                    ) : (
                      <Music
                        className="h-10 w-10 rounded bg-neutral-900 p-2"
                        size={16}
                      />
                    ))}

                  <div className="w-full truncate pr-3">
                    <span className="w-10/12 truncate font-medium text-sm">
                      {track.name}
                    </span>

                    {showSubtitle && (
                      <div className="flex w-full flex-wrap items-center gap-1 pr-3 text-neutral-400 text-sm">
                        <span className="truncate">
                          {track.artists.map((artist, artistIndex) => (
                            <Link
                              className="hover:text-white hover:underline"
                              href={`/artists/${artist.id}`}
                              key={artist.id + track.id}
                            >
                              {artistIndex !== 0
                                ? `, ${artist.name}`
                                : artist.name}
                            </Link>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showAlbum && (
                <div className="col-span-4 flex w-10/12 items-center text-neutral-400 text-sm">
                  <Link
                    className="truncate hover:text-white hover:underline"
                    href={`/albums/${track.album.id}`}
                  >
                    {track.album.name}
                  </Link>
                </div>
              )}

              <small className="col-span-1 flex items-center font-medium text-neutral-400 text-sm ">
                {formatMs(track.duration_ms)}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
