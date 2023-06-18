import { ListMusic, Mic2, Volume2 } from "lucide-react";

export default function AdditionalControllers() {
  return (
    <div className="flex items-center col-span-2 gap-3">
      {/* Icons */}
      <button>
        <Mic2 size={16} className="text-gray" />
      </button>
      <button>
        <ListMusic size={16} className="text-gray" />
      </button>
      <button>
        <Volume2 size={16} className="text-gray" />
      </button>

      {/* Volume bar */}
      <div className="w-20 mt-3">
        <div className="relative w-full pt-1">
          <div className="flex h-1 mb-4 overflow-hidden text-xs rounded bg-gray-dark">
            <div className="flex flex-col justify-center w-1/3 text-center text-white bg-white shadow-none whitespace-nowrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
