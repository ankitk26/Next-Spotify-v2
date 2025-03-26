import { getSearchItems } from "@/actions/get-search-items";
import AlbumCards from "@/components/album-cards";
import ArtistCards from "@/components/artist-cards";
import PlaylistCards from "@/components/playlist-cards";
import SearchFilters from "@/components/search-filters";
import TracksTable from "@/components/tracks-table";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const query = decodeURIComponent(params.query);

  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchResults(props: Props) {
  const params = await props.params;
  const query = decodeURI(params.query);

  const searchResults = await getSearchItems("all", query);

  if (!searchResults) {
    return <div className="flex flex-col items-stretch gap-8">No results</div>;
  }

  return (
    <div className="flex flex-col items-stretch gap-8">
      <SearchFilters />

      {searchResults.tracks && searchResults.tracks.length > 0 && (
        <div className="flex flex-col items-stretch -mt-8">
          <h1 className="-mb-4">Tracks</h1>
          <TracksTable
            tracks={searchResults.tracks}
            showAlbum
            showCover
            showSubtitle
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
