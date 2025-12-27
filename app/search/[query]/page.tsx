"use client";

import { useParams } from "next/navigation";
import AlbumCards from "@/components/album-cards";
import ArtistCards from "@/components/artist-cards";
import PlaylistCards from "@/components/playlist-cards";
import SearchFilters from "@/components/search-filters";
import TracksTable from "@/components/tracks-table";
import { trpc } from "@/lib/trpc/react";

export default function SearchResults() {
  const params = useParams();
  const query = decodeURIComponent(params.query as string);

  const { data: searchResults, isPending } =
    trpc.spotify.search.items.useQuery({ type: "all", query, limit: 5 });

  if (isPending) {
    return (
      <div className="flex flex-col items-stretch gap-8">
        <SearchFilters />
        <div>Loading...</div>
      </div>
    );
  }

  if (!searchResults) {
    return <div className="flex flex-col items-stretch gap-8">No results</div>;
  }

  return (
    <div className="flex flex-col items-stretch gap-8">
      <SearchFilters />

      {searchResults.tracks && searchResults.tracks.length > 0 && (
        <div className="-mt-8 flex flex-col items-stretch">
          <h1 className="-mb-4">Tracks</h1>
          <TracksTable
            showAlbum
            showCover
            showSubtitle
            tracks={searchResults.tracks}
          />
        </div>
      )}

      {searchResults.artists && searchResults.artists.length > 0 && (
        <div>
          <h1>Artists</h1>
          <ArtistCards artists={searchResults.artists} />
        </div>
      )}

      {searchResults.albums && searchResults.albums.length > 0 && (
        <div>
          <h1>Albums</h1>
          <AlbumCards albums={searchResults.albums} />
        </div>
      )}

      {searchResults.playlists && searchResults.playlists.length > 0 && (
        <div>
          <h1>Playlists</h1>
          <PlaylistCards
            playlists={searchResults.playlists.filter(
              (playlist) => playlist !== null
            )}
          />
        </div>
      )}
    </div>
  );
}
