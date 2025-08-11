import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { setSearchInput, useGlobalStore } from "@/stores/global-store";

export default function SearchInput() {
  const router = useRouter();
  const searchInput = useGlobalStore((store) => store.searchInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput !== "") {
      router.push(`/search/${searchInput}`);
    }
  };

  return (
    <form
      className="flex w-1/2 items-center justify-between gap-3 rounded-full bg-white px-3 py-1.5"
      onSubmit={handleSubmit}
    >
      <Search className="text-neutral-800" />

      <input
        className="w-full flex-grow bg-transparent font-semibold text-neutral-900 text-sm focus:outline-none"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Artists, Songs, Playlists"
        spellCheck={false}
        value={searchInput}
      />

      <button
        className={`flex items-center focus:outline-none ${
          searchInput ? "visible" : "invisible"
        }`}
        onClick={() => setSearchInput("")}
        type="button"
      >
        <X className="text-neutral-800 hover:text-neutral-600" size={20} />
      </button>
    </form>
  );
}
