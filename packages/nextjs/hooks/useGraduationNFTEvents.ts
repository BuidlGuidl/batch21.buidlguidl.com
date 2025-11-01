import { useEffect, useState } from "react";
import { TimelineEvent } from "./useCheckInEvents";
import { parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";

interface UseGraduationNFTEventsReturn {
  events: TimelineEvent[];
  isLoading: boolean;
  error: Error | null;
}

export const useGraduationNFTEvents = (contractAddress: `0x${string}`): UseGraduationNFTEventsReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchGraduationNFTs = async () => {
      if (!publicClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const logs = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"),
          fromBlock: 0n,
          toBlock: "latest",
        });

        const events: TimelineEvent[] = [];
        const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

        for (const log of logs) {
          try {
            const from = log.args.from as string;
            const to = log.args.to as string;

            if (from?.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
              const block = await publicClient.getBlock({
                blockNumber: log.blockNumber,
              });

              events.push({
                type: "graduation-nft",
                date: new Date(Number(block.timestamp) * 1000).toISOString(),
                title: "Graduation NFT Minted 🎓",
                description: "Builder minted graduation NFT",
                address: to,
                link: `https://arbiscan.io/tx/${log.transactionHash}`,
              });
            }
          } catch (error) {
            console.error("Error processing Transfer event:", error);
          }
        }

        setEvents(events);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error("Error fetching graduation NFTs:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraduationNFTs();
  }, [publicClient, contractAddress]);

  return { events, isLoading, error };
};
