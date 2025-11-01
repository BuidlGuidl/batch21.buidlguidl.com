"use client";

import { BatchTimeline } from "~~/components/BatchTimeline";
import { useTimelineEvents } from "~~/hooks";

const BATCH_REGISTRY_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;
const BATCH_GRADUATION_NFT_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;
const GITHUB_REPO_OWNER = "BuidlGuidl";
const GITHUB_REPO_NAME = "batch21.buidlguidl.com";

const TimelinePage = () => {
  const { events, isLoading, error } = useTimelineEvents({
    batchRegistryAddress: BATCH_REGISTRY_ADDRESS,
    graduationNFTAddress: BATCH_GRADUATION_NFT_ADDRESS,
    githubOwner: GITHUB_REPO_OWNER,
    githubRepo: GITHUB_REPO_NAME,
    githubToken: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p>Loading timeline events...</p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="alert alert-error m-4">
          <span>{error.message}</span>
        </div>
      )}

      {!isLoading && !error && <BatchTimeline events={events} />}
    </div>
  );
};

export default TimelinePage;
