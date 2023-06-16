"use client";

import { useStore } from "@/providers/zustand";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  const { searchQuery, setSearchQuery } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <form
      className="flex items-center justify-between w-full gap-3 px-3 py-1.5 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <Search className="text-paper-600" />

      <input
        className="flex-grow w-full text-sm font-semibold bg-transparent text-paper-700 focus:outline-none"
        placeholder="Artists, Songs, Playlists"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        spellCheck={false}
      />

      <button
        type="button"
        className={`flex items-center focus:outline-none ${
          searchQuery ? "visible" : "invisible"
        }`}
        onClick={() => setSearchQuery("")}
      >
        <X size={20} className="text-paper-600 hover:text-paper-400" />
      </button>
    </form>
  );
}
