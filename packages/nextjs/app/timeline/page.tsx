"use client";

import { useEffect, useState } from "react";
import { BatchTimeline } from "~~/components/BatchTimeline";
import { useTimelineEvents } from "~~/hooks";

// Smart contract addresses on Arbitrum
const BATCH_REGISTRY_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;
const BATCH_GRADUATION_NFT_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;

// GitHub repository info
const GITHUB_REPO_OWNER = "BuidlGuidl";
const GITHUB_REPO_NAME = "batch21.buidlguidl.com";

// Loading messages that rotate
const LOADING_MESSAGES = [
  "⛓️ Reading on-chain check-ins from Arbitrum",
  "🎓 Fetching graduation NFT mints",
  "✨ Loading merged PRs from GitHub",
];

const TimelinePage = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Fetch events from blockchain (check-ins + NFTs) and GitHub (PRs)
  const { events, isLoading, error } = useTimelineEvents({
    batchRegistryAddress: BATCH_REGISTRY_ADDRESS,
    graduationNFTAddress: BATCH_GRADUATION_NFT_ADDRESS,
    githubOwner: GITHUB_REPO_OWNER,
    githubRepo: GITHUB_REPO_NAME,
    githubToken: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  // Rotate through loading messages every 2 seconds
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div>
      {/* Loading state with animated Ethereum logos */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen overflow-hidden bg-base-100">
          <div className="text-center relative">
            {/* Background floating Ethereum logos */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2].map(i => (
                <svg
                  key={i}
                  className="absolute opacity-10"
                  style={{
                    width: `${80 + i * 40}px`,
                    height: `${80 + i * 40}px`,
                    left: `${Math.sin(i * 2) * 120}px`,
                    top: `${Math.cos(i * 2) * 100}px`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                  viewBox="0 0 256 417"
                  fill="currentColor"
                >
                  {/* Ethereum logo SVG paths */}
                  <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#343434" />
                  <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#8C8C8C" />
                  <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" fill="#3C3C3B" />
                  <path d="M127.962 416.905v-104.72L0 236.585z" fill="#8C8C8C" />
                  <path d="M127.961 287.958l127.96-75.637-127.96-58.162z" fill="#141414" />
                  <path d="M0 212.32l127.96 75.638v-133.8z" fill="#393939" />
                </svg>
              ))}
            </div>

            {/* Loading spinner and text */}
            <div className="relative z-10">
              <div className="loading loading-spinner loading-lg mb-6 text-primary"></div>
              <p className="text-2xl font-bold mb-3 text-base-content">Syncing Batch 21 Timeline ⚡</p>
              {/* Rotating loading message with fade transition */}
              <p key={messageIndex} className="text-base text-base-content/70 animate-fade-in">
                {LOADING_MESSAGES[messageIndex]}
              </p>
            </div>
          </div>

          {/* Animations */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.08;
              }
              50% {
                transform: translateY(-30px) rotate(12deg);
                opacity: 0.15;
              }
            }

            @keyframes fade-in {
              0% {
                opacity: 0;
                transform: translateY(10px);
              }
              100% {
                opacity: 0.7;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fade-in 0.5s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="alert alert-error shadow-lg max-w-md">
            <div>
              {/* Error icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">Failed to load timeline</h3>
                <div className="text-sm">{error.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success - show timeline with all events */}
      {!isLoading && !error && <BatchTimeline events={events} />}
    </div>
  );
};

export default TimelinePage;
