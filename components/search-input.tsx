import { setSearchInput, useGlobalStore } from "@/stores/global-store";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchInput = useGlobalStore((store) => store.searchInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput != "") {
      router.push(`/search/${searchInput}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between w-1/2 gap-3 px-3 py-1.5 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <Search className="text-neutral-800" />

      <input
        className="flex-grow w-full text-sm font-semibold bg-transparent text-neutral-900 focus:outline-none"
        placeholder="Artists, Songs, Playlists"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        spellCheck={false}
      />

      <button
        type="button"
        className={`flex items-center focus:outline-none ${
          searchInput ? "visible" : "invisible"
        }`}
        onClick={() => setSearchInput("")}
      >
        <X size={20} className="text-neutral-800 hover:text-neutral-600" />
      </button>
    </form>
  );
}
