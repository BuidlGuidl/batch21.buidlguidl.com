"use client";

import { normalize } from "viem/ens";
import { useEnsText } from "wagmi";

interface SocialLinksProps {
  ensName: string | null | undefined;
}

export const SocialLinks = ({ ensName }: SocialLinksProps) => {
  const { data: twitter } = useEnsText({
    name: ensName ? normalize(ensName) : undefined,
    key: "com.twitter",
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
    },
  });

  const { data: github } = useEnsText({
    name: ensName ? normalize(ensName) : undefined,
    key: "com.github",
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
    },
  });

  const { data: telegram } = useEnsText({
    name: ensName ? normalize(ensName) : undefined,
    key: "org.telegram",
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
    },
  });

  if (!twitter && !github && !telegram) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
        <span>🌟</span> Connect
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-lg border-2 border-blue-300 dark:border-blue-700"
          >
            <div className="text-2xl">🐦</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Twitter</div>
              <div className="text-sm text-blue-900 dark:text-blue-200 truncate">@{twitter}</div>
            </div>
          </a>
        )}

        {github && (
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-lg border-2 border-purple-300 dark:border-purple-700"
          >
            <div className="text-2xl">💻</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">GitHub</div>
              <div className="text-sm text-purple-900 dark:text-purple-200 truncate">{github}</div>
            </div>
          </a>
        )}

        {telegram && (
          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-lg border-2 border-pink-300 dark:border-pink-700"
          >
            <div className="text-2xl">✈️</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-pink-600 dark:text-pink-400 font-semibold">Telegram</div>
              <div className="text-sm text-pink-900 dark:text-pink-200 truncate">@{telegram}</div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};
