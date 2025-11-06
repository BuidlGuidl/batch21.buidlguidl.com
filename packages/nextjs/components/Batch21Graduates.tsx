import { useCallback, useEffect, useRef, useState } from "react";
import { GraduateItem } from "~~/components/GraduateItem";

export const Batch21Graduates: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [maxLoaded, setMaxLoaded] = useState(-1);
  const hasInitialized = useRef(false);

  const handleNftLoaded = useCallback((id: number) => {
    setMaxLoaded(prev => Math.max(prev, id));
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    setLoading(true);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setMaxLoaded(0);
    setLastUpdated(new Date());
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 my-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900/90 dark:text-white drop-shadow-sm">
          <span className="text-3xl md:text-4xl">🎓</span>
          <span>Hall of Fame </span>
          <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 font-semibold">
            Batch #21
          </span>
          <span className="hidden sm:inline">Graduates</span>
        </h3>

        <div>
          <button className="btn btn-sm btn-outline" onClick={handleRefresh} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>

          {lastUpdated && (
            <div className="text-[11px] mt-1 flex items-center gap-1 italic">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-sm">Scanning for minted tokens…</div>
      ) : (
        <div
          className="
            mt-4
            max-h-[60vh]
            md:max-h-[55vh]
            sm:max-h-[50vh]
            overflow-y-auto
            scroll-smooth
            pr-2
            -mr-2
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
            {Array.from({ length: maxLoaded + 2 }, (_, i) => i + 1).map(tokenId => (
              <GraduateItem
                key={`${lastUpdated?.getTime() ?? 0}-${tokenId}`}
                tokenId={tokenId}
                handleNftLoaded={handleNftLoaded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
