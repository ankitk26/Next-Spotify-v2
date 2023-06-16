import AlbumCards from "@/components/AlbumCards";
import { getUserLikedAlbums } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spotify - Your Library",
};

export default async function LikedAlbumsPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const albums = await getUserLikedAlbums(session);

  return (
    <>
      <h1>Albums</h1>
      <AlbumCards albums={albums} />
    </>
  );
}
