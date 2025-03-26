"use client";

import { formatMs } from "@/lib/format-ms";
import { cn } from "@/lib/utils";
import { Track } from "@/types/types";
import { Clock3, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="mt-8">
      {/* Table Header */}

      {showHeader && (
        <>
          <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-neutral-400">
            <div className="col-span-1 font-semibold tracking-wider text-left uppercase">
              #
            </div>

            <div
              className={cn(
                "text-sm font-semibold text-left",
                showAlbum ? "col-span-6" : "col-span-10"
              )}
            >
              Title
            </div>

            {showAlbum && (
              <div className="col-span-4 text-sm font-semibold text-left">
                Album
              </div>
            )}

            <div className="col-span-1 font-semibold text-left">
              <Clock3 size={16} />
            </div>
          </header>

          {/* Divider */}
          <div className="col-span-12 border-b border-neutral-900"></div>
        </>
      )}

      {/* Table Rows */}

      <div className="w-full col-span-12 mt-2">
        {tracks
          ?.filter((track) => track.name.trim().length > 0)
          .map((track, index) => (
            <div
              className={cn(
                "grid py-2 px-4 rounded-lg grid-cols-12",
                hoveredRow === index ? "bg-neutral-900" : "bg-transparent"
              )}
              key={track.id + index + 1}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span className="flex items-center col-span-1 text-sm text-neutral-400">
                {index + 1}
              </span>

              <div
                className={cn(
                  "flex items-center w-full",
                  showAlbum ? "col-span-6" : "col-span-10"
                )}
              >
                <div className="flex items-center w-full gap-4">
                  {showCover &&
                    (track.album.images && track.album.images.length > 0 ? (
                      <div className="flex-shrink-0 w-10 h-10">
                        <Image
                          src={track.album.images?.[0].url as string}
                          alt={track.name}
                          height={40}
                          width={40}
                          className="object-contain w-10 h-10 rounded"
                        />
                      </div>
                    ) : (
                      <Music
                        size={16}
                        className="w-10 h-10 p-2 rounded bg-neutral-900"
                      />
                    ))}

                  <div className="w-full pr-3 truncate">
                    <span className="w-10/12 text-sm font-medium truncate">
                      {track.name}
                    </span>

                    {showSubtitle && (
                      <div className="flex flex-wrap items-center w-full gap-1 pr-3 text-sm text-neutral-400">
                        <span className="truncate">
                          {track.artists.map((artist, index) => (
                            <Link
                              key={artist.id + track.id}
                              href={`/artists/${artist.id}`}
                              className="hover:text-white hover:underline"
                            >
                              {index !== 0 ? `, ${artist.name}` : artist.name}
                            </Link>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showAlbum && (
                <div className="flex items-center w-10/12 col-span-4 text-sm text-neutral-400">
                  <Link
                    href={`/albums/${track.album.id}`}
                    className="truncate hover:text-white hover:underline"
                  >
                    {track.album.name}
                  </Link>
                </div>
              )}

              <small className="flex items-center col-span-1 text-sm font-medium text-neutral-400 ">
                {formatMs(track.duration_ms)}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
