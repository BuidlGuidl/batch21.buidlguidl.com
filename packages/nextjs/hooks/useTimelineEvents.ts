import { useEffect, useState } from "react";
import { TimelineEvent } from "./types";
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

interface UseTimelineEventsReturn {
  events: TimelineEvent[];
  isLoading: boolean;
  error: Error | null;
}

export const useTimelineEvents = (config: TimelineConfig): UseTimelineEventsReturn => {
  const [allEvents, setAllEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const checkInResult = useCheckInEventsFromSubgraph();
  const graduationNFTResult = useGraduationNFTEventsFromSubgraph();
  const gitHubPRResult = useGitHubPREvents(config.githubOwner, config.githubRepo, config.githubToken);

  useEffect(() => {
    const loading = checkInResult.isLoading || graduationNFTResult.isLoading || gitHubPRResult.isLoading;

    const errors = checkInResult.error || graduationNFTResult.error || gitHubPRResult.error || null;

    setIsLoading(loading);
    setError(errors);

    if (!loading) {
      const merged: TimelineEvent[] = [
        ...(checkInResult.data ?? []),
        ...(graduationNFTResult.data ?? []),
        ...(gitHubPRResult.events ?? []),
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAllEvents(merged);
    }
  }, [
    checkInResult.data,
    graduationNFTResult.data,
    gitHubPRResult.events,
    checkInResult.isLoading,
    graduationNFTResult.isLoading,
    gitHubPRResult.isLoading,
    checkInResult.error,
    graduationNFTResult.error,
    gitHubPRResult.error,
  ]);

  return { events: allEvents, isLoading, error };
};
