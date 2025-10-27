"use client";

import { normalize } from "viem/ens";
import { useEnsText } from "wagmi";

interface ProfileDescriptionProps {
  ensName: string | null | undefined;
}

export const ProfileDescription = ({ ensName }: ProfileDescriptionProps) => {
  const { data: description } = useEnsText({
    name: ensName ? normalize(ensName) : undefined,
    key: "description",
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
    },
  });

  if (!description) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl p-6 border-2 border-pink-200 dark:border-pink-700 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-3 flex items-center gap-2">
          <span>💭</span> About
        </h2>
        <p className="text-base-content leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
