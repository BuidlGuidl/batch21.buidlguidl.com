"use client";

import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useCopyToClipboard } from "~~/hooks/scaffold-eth";

interface ProfileHeaderProps {
  address: `0x${string}`;
}

export const ProfileHeader = ({ address }: ProfileHeaderProps) => {
  const { copyToClipboard, isCopiedToClipboard } = useCopyToClipboard();

  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
    },
  });

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-6">
        <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-pink-300 dark:ring-pink-600 ring-offset-4 ring-offset-white dark:ring-offset-base-300 shadow-lg">
          {ensAvatar ? (
            <img src={ensAvatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 dark:from-pink-600 dark:to-purple-600 flex items-center justify-center text-6xl">
              0x
            </div>
          )}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        {ensName || "Builder"}
      </h1>
      <button
        onClick={() => copyToClipboard(address)}
        className="group flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-sm font-mono text-pink-700 dark:text-pink-300 transition-all duration-300 hover:scale-105 hover:bg-pink-200 dark:hover:bg-pink-800/40 cursor-pointer"
        title="Click to copy address"
      >
        <span>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        {isCopiedToClipboard ? (
          <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
        ) : (
          <DocumentDuplicateIcon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  );
};
