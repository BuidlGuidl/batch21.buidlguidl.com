"use client";

import Link from "next/link";
import { Address } from "~~/components/scaffold-eth/Address/Address";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

type Props = {
  tokenId: number;
  chainId: any;
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

export const GraduateItem = ({ tokenId, chainId }: Props) => {
  const { data: owner } = useScaffoldReadContract({
    contractName: "BatchGraduationNFT",
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
    chainId,
  });

  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "BatchGraduationNFT",
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
    chainId,
  });

  if (!owner) return null;

  const parsed = decodeBase64Json(tokenURI ?? "");
  const name = parsed?.name;

  return (
    <Link href={`/builders/${owner}`} className="block w-full h-full min-w-0 py-2">
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center shadow transition hover:-translate-y-1 hover:shadow-xl hover:border-indigo-300 min-w-0">
        <div className="w-full overflow-hidden truncate">
          <Address address={owner as `0x${string}`} size="sm" disableAddressLink onlyEnsOrAddress />
        </div>

        <div className="mt-1 w-full text-center text-xs text-gray-500 dark:text-gray-300 truncate">{name}</div>
      </div>
    </Link>
  );
};
