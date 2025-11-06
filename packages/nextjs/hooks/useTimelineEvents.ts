"use client";

import { useMemo } from "react";
import { useGitHubPREvents } from "./useGitHubPREvents";
import { useCheckInEventsFromSubgraph, useGraduationNFTEventsFromSubgraph } from "./useSubgraphEvents";

// Export TimelineConfig explicitly here
export interface TimelineConfig {
  githubOwner: string;
  githubRepo: string;
  githubToken?: string;
  batchRegistryAddress?: string;
  graduationNFTAddress?: string;
}

export const useTimelineEvents = (config: TimelineConfig) => {
  const checkInResult = useCheckInEventsFromSubgraph();
  const graduationNFTResult = useGraduationNFTEventsFromSubgraph();
  const gitHubPRResult = useGitHubPREvents({
    owner: config.githubOwner,
    repo: config.githubRepo,
    token: config.githubToken,
  });

  // Compute merged and sorted events without extra state
  const data = useMemo(() => {
    return [...(checkInResult.data ?? []), ...(graduationNFTResult.data ?? []), ...(gitHubPRResult.data ?? [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [checkInResult.data, graduationNFTResult.data, gitHubPRResult.data]);

  const isLoading = checkInResult.isLoading || graduationNFTResult.isLoading || gitHubPRResult.isPending;

  const error = checkInResult.error || graduationNFTResult.error || gitHubPRResult.error || null;

  return { data, isLoading, error };
};
