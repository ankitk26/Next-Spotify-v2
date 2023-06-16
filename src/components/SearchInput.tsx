"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form
      className="flex items-center justify-between w-full gap-3 px-3 py-1.5 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <Search className="text-2xl text-[#121212]" />

      <input
        className="flex-grow w-full text-sm font-semibold bg-transparent text-paper focus:outline-none"
        placeholder="Artists, Songs, Playlists"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
      />

      {query && (
        <button
          type="button"
          className="flex items-center focus:outline-none"
          onClick={() => setQuery("")}
        >
          <X
            size={20}
            className="text-2xl text-[#121212] hover:text-paper-secondary"
          />
        </button>
      )}
    </form>
  );
}
