"use client";

import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth/Address/Address";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { contracts } from "~~/utils/scaffold-eth/contract";

type Graduate = {
  tokenId: number;
  owner: string;
  tokenURI?: string;
  name?: string;
  image?: string;
};

function decodeBase64Json(dataUrl: string): { name?: string; image?: string } | undefined {
  try {
    const prefix = "data:application/json;base64,";
    if (!dataUrl || !dataUrl.startsWith(prefix)) return undefined;
    const b64 = dataUrl.slice(prefix.length);
    const jsonStr = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("utf-8");
    const json = JSON.parse(jsonStr);
    return { name: json.name, image: json.image };
  } catch {
    return undefined;
  }
}

export const Batch21Graduates: React.FC = () => {
  const { targetNetwork } = useTargetNetwork();

  const nftEntry = contracts?.[targetNetwork?.id]?.BatchGraduationNFT;
  const nftAddress = nftEntry?.address as `0x${string}` | undefined;

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hasScanned = useRef(false);

  const { data: nftContract } = useScaffoldContract({
    contractName: "BatchGraduationNFT",
    chainId: targetNetwork?.id as any,
  });

  const scan = useCallback(async () => {
    if (!nftContract) return;

    setLoading(true);
    setError(null);

    const found: Graduate[] = [];

    try {
      let id = 1;
      while (true) {
        let owner;
        try {
          owner = await nftContract.read.ownerOf([BigInt(id)]);
        } catch {
          // stops when token doesn't exist
          break;
        }

        let rawTokenURI: string | undefined;
        try {
          rawTokenURI = await nftContract.read.tokenURI([BigInt(id)]);
        } catch {
          rawTokenURI = undefined;
        }

        const parsed = decodeBase64Json(rawTokenURI ?? "");
        found.push({
          tokenId: id,
          owner,
          tokenURI: rawTokenURI,
          name: parsed?.name,
          image: parsed?.image,
        });

        id++;
      }

      setGraduates(found);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }, [nftContract]);

  useEffect(() => {
    if (!nftAddress || !nftContract) return;
    if (hasScanned.current) return;
    hasScanned.current = true;
    scan();
  }, [nftAddress, nftContract, scan]);

  const handleRefresh = async () => {
    setError(null);
    await scan();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
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
          )}{" "}
        </div>
      </div>

      {!nftAddress ? (
        <div className="text-sm text-muted">NFT contract not found in runtime registry</div>
      ) : loading ? (
        <div className="text-sm">Scanning for minted tokens…</div>
      ) : error ? (
        <div className="text-red-600 text-sm">Error: {error}</div>
      ) : graduates.length === 0 ? (
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
            {graduates.map(g => {
              return (
                <Link key={g.tokenId} href={`/builders/${g.owner}`} className="block mt-4 w-full h-full">
                  <div
                    className="
                      relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl 
                      p-3 sm:p-4               /* smaller padding on xs */
                      flex flex-col items-center h-full
                      shadow-[0_0_15px_rgba(99,102,241,0.08)]
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(99,102,241,0.18)]
                      hover:-translate-y-1 hover:border-indigo-300
                    "
                  >
                    <div
                      className="
                        text-sm sm:text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200
                        group-hover:text-indigo-600 transition
                        max-w-[140px] sm:max-w-[160px] text-center
                        whitespace-nowrap overflow-hidden text-ellipsis
                      "
                    >
                      <Address address={g.owner} size="sm" disableAddressLink onlyEnsOrAddress />
                    </div>

                    <div className="mt-1 w-full text-center text-xs text-gray-500 truncate dark:text-gray-200">
                      {g.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
