import { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";

export type TimelineEvent = {
  type: "on-chain-checkin" | "graduation-nft" | "pr-merged";
  date: string;
  title: string;
  description: string;
  author?: string;
  address?: string;
  link?: string;
};

interface UseCheckInEventsReturn {
  events: TimelineEvent[];
  isLoading: boolean;
  error: Error | null;
}

export const useCheckInEvents = (contractAddress: `0x${string}`): UseCheckInEventsReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchCheckInEvents = async () => {
      if (!publicClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const logs = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem("event CheckedIn(bool first, address indexed builder, address checkInContract)"),
          fromBlock: 0n,
          toBlock: "latest",
        });

        const events: TimelineEvent[] = [];

        for (const log of logs) {
          try {
            const block = await publicClient.getBlock({
              blockNumber: log.blockNumber,
            });

            const builder = log.args.builder as string;
            const first = log.args.first as boolean;

            events.push({
              type: "on-chain-checkin",
              date: new Date(Number(block.timestamp) * 1000).toISOString(),
              title: first ? "First Check-in 🎯" : "Check-in",
              description: "Builder checked in on-chain",
              address: builder,
              link: `https://arbiscan.io/tx/${log.transactionHash}`,
            });
          } catch (error) {
            console.error("Error processing CheckedIn event:", error);
          }
        }

        setEvents(events);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error("Error fetching check-in events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckInEvents();
  }, [publicClient, contractAddress]);

  return { events, isLoading, error };
};
