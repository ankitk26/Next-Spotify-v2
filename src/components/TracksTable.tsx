"use client";

import { usePlayer } from "@/providers/TrackPlayerProvider";
import { Track } from "@/types/types";
import { fmtMSS } from "@/utils/clientUtils";
import { Clock, Music, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  tracks: Track[];
  noAlbum?: boolean;
  noArtist?: boolean;
}

export default function TracksTable({
  tracks,
  noAlbum = false,
  noArtist = false,
}: Props) {
  const { setCurrentTrack } = usePlayer();

  const playTrack = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 p-1 mt-8">
      {!noArtist && (
        <>
          <div className="col-span-1 font-semibold tracking-wider text-left text-white uppercase">
            #
          </div>

          <div
            className={`${
              noAlbum ? "col-span-10" : "col-span-6"
            } text-sm font-medium tracking-wider text-left uppercase text-gray`}
          >
            Title
          </div>

          {!noAlbum && (
            <div className="col-span-4 text-sm font-medium tracking-wider text-left uppercase text-gray">
              Album
            </div>
          )}

          <div className="col-span-1 text-sm font-medium tracking-wider text-left uppercase text-gray">
            <Clock size={16} className="text-xl" />
          </div>

          <div className="col-span-12 my-3 border-b border-gray"></div>
        </>
      )}

      <div className="w-full col-span-12">
        {tracks?.map((track, index) => (
          <div className="grid grid-cols-12" key={track.id + index + 1}>
            <button
              className="flex items-center col-span-1 my-3 text-sm text-gray"
              onClick={() => playTrack(track)}
            >
              <Play size={16} />
            </button>

            <div
              className={`${
                noAlbum ? "col-span-10" : "col-span-6"
              } flex items-center w-full  my-3`}
            >
              <div className="flex items-center w-full gap-4">
                {(!noAlbum || noArtist) &&
                track.album.images &&
                track.album.images.length > 0 ? (
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
                    className="w-10 h-10 p-2 rounded bg-paper-secondary"
                  />
                )}

                <div className="w-full">
                  <Link
                    href={`/tracks/${track.id}`}
                    className={`w-10/12 text-sm font-medium truncate ${
                      track.preview_url
                        ? "cursor-pointer hover:underline"
                        : "cursor-default opacity-50"
                    }`}
                  >
                    {track.name}
                  </Link>

                  {!noArtist && (
                    <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm text-gray">
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

            {!noAlbum && (
              <div className="flex items-center w-10/12 col-span-4 my-3 text-sm text-gray">
                <Link
                  href={`/albums/${track.album.id}`}
                  className="truncate hover:text-white hover:underline"
                >
                  {track.album.name}
                </Link>
              </div>
            )}

            <small className="flex items-center col-span-1 my-3 text-sm text-gray ">
              {fmtMSS(track.duration_ms)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
