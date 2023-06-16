import Link from "next/link";

interface Props {
  query: string;
  resultType: "tracks" | "artists" | "albums" | "playlists";
}

export default function SearchResultHeader({ query, resultType }: Props) {
  return (
    <div className="grid items-center grid-cols-12">
      <h1 className="col-span-11 capitalize">{resultType}</h1>
      <Link href={`/search/${query}/${resultType}`}>
        <button className="flex justify-end w-full col-span-1 text-sm hover:underline">
          View All
        </button>
      </Link>
    </div>
  );
}
