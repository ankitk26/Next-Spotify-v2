import AlbumCards from "@/components/AlbumCards";
import ArtistCards from "@/components/ArtistCards";
import PlaylistCards from "@/components/PlaylistCards";
import SearchFilters from "@/components/SearchFilters";
import TracksTable from "@/components/TracksTable";
import { getSearchItems } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: {
    query: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = params.query;
  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchResults({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const query = decodeURI(params.query);

  const searchResults = await getSearchItems(session, "all", query);

  return (
    <div className="flex flex-col items-stretch gap-8">
      <SearchFilters />

      <div className="flex flex-col items-stretch -mt-8">
        <h1 className="-mb-4">Tracks</h1>
        <TracksTable
          tracks={searchResults.tracks.items}
          showAlbum
          showCover
          showSubtitle
        />
      </div>

      {searchResults.artists.items.length > 0 && (
        <div>
          <h1>Artists</h1>
          <ArtistCards artists={searchResults.artists.items} />
        </div>
      )}

      {searchResults.albums.items.length > 0 && (
        <div>
          <h1>Albums</h1>
          <AlbumCards albums={searchResults.albums.items} />
        </div>
      )}

      {searchResults.playlists.items.length > 0 && (
        <div>
          <h1>Playlists</h1>
          <PlaylistCards playlists={searchResults.playlists.items} />
        </div>
      )}
    </div>
  );
}
