import { Dot, Music } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next/types";
import { getPlaylistById } from "@/actions/get-playlist-by-id";
import TracksTable from "@/components/tracks-table";
import PlaylistDescription from "./playlist-description";

type Props = {
  params: Promise<{
    playlistId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const playlistId = params.playlistId;
  const playlist = await getPlaylistById(playlistId);
  return {
    title: `Spotify - ${playlist?.name}`,
  };
}

export default async function PlaylistPage(props: Props) {
  const params = await props.params;
  const playlistId = params.playlistId;
  const playlist = await getPlaylistById(playlistId);

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
