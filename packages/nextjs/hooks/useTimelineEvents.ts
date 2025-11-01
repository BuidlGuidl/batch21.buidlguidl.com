import { useEffect, useState } from "react";
import { TimelineEvent, useCheckInEvents } from "./useCheckInEvents";
import { useGitHubPREvents } from "./useGitHubPREvents";
import { useGraduationNFTEvents } from "./useGraduationNFTEvents";

export interface TimelineConfig {
  batchRegistryAddress: `0x${string}`;
  graduationNFTAddress: `0x${string}`;
  githubOwner: string;
  githubRepo: string;
  githubToken?: string;
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

  const checkInResult = useCheckInEvents(config.batchRegistryAddress);
  const graduationNFTResult = useGraduationNFTEvents(config.graduationNFTAddress);
  const gitHubPRResult = useGitHubPREvents(config.githubOwner, config.githubRepo, config.githubToken);

  useEffect(() => {
    const isAnyLoading = checkInResult.isLoading || graduationNFTResult.isLoading || gitHubPRResult.isLoading;

    const collectedError = checkInResult.error || graduationNFTResult.error || gitHubPRResult.error || null;

    setIsLoading(isAnyLoading);
    setError(collectedError);

    const mergedEvents: TimelineEvent[] = [
      ...checkInResult.events,
      ...graduationNFTResult.events,
      ...gitHubPRResult.events,
    ];

    mergedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setAllEvents(mergedEvents);
  }, [
    checkInResult.events,
    graduationNFTResult.events,
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
