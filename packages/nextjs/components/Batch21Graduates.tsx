"use client";

import { useEffect, useRef, useState } from "react";
import { GraduateItem } from "~~/components/GraduateItem";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { contracts } from "~~/utils/scaffold-eth/contract";

export const Batch21Graduates: React.FC = () => {
  const { targetNetwork } = useTargetNetwork();
  const nftEntry = contracts?.[targetNetwork?.id]?.BatchGraduationNFT;
  const nftAddress = nftEntry?.address as `0x${string}` | undefined;

  const { data: nftContract } = useScaffoldContract({
    contractName: "BatchGraduationNFT",
    chainId: targetNetwork?.id as any,
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [maxId, setMaxId] = useState(0);
  const hasInitialized = useRef(false);

  async function findMaxMinted(contract: any): Promise<number> {
    let id = 1;
    while (true) {
      try {
        await contract.read.ownerOf([BigInt(id)]);
        id++;
      } catch {
        break;
      }
    }
    return id - 1;
  }

  useEffect(() => {
    if (!nftAddress || !nftContract) return;
    if (hasInitialized.current) return;

    hasInitialized.current = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const max = await findMaxMinted(nftContract);
        setMaxId(max);
        setLastUpdated(new Date());
      } catch (e: any) {
        setError(String(e?.message ?? e));
      } finally {
        setLoading(false);
      }
    })();
  }, [nftAddress, nftContract]);

  const handleRefresh = async () => {
    if (!nftContract) return;
    try {
      setLoading(true);
      setError(null);
      const max = await findMaxMinted(nftContract);
      setMaxId(max);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
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

      {!nftAddress ? (
        <div className="text-sm text-muted">NFT contract not found in runtime registry</div>
      ) : loading ? (
        <div className="text-sm">Scanning for minted tokens…</div>
      ) : error ? (
        <div className="text-red-600 text-sm">Error: {error}</div>
      ) : maxId === 0 ? (
        <div className="text-sm">No graduates found yet.</div>
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
            {Array.from({ length: maxId }).map((_, i) => (
              <GraduateItem key={i + 1} tokenId={i + 1} chainId={targetNetwork?.id as number} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
