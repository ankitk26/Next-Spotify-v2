import { getPlaylistById } from "@/actions/get-playlist-by-id";
import TracksTable from "@/components/tracks-table";
import { Dot, Music } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next/types";
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
                src={playlist.images[0].url}
                alt={playlist.name}
                height={240}
                width={240}
                className="object-contain rounded-sm w-60 h-60"
                priority
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-neutral-800" />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-6xl font-bold">{playlist.name}</h2>

              {playlist.description && (
                <PlaylistDescription description={playlist.description} />
              )}

              <div className="flex items-center text-sm font-semibold">
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
            tracks={playlist?.tracks.filter((track) => track !== null)}
            showAlbum
            showCover
            showHeader
            showSubtitle
          />
        )}
      </div>
    </>
  );
}
