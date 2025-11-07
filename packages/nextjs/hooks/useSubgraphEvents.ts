import { TimelineEvent } from "./types";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/1713980/batch-21-buidl-guidl/version/latest";

const CHECKED_IN_EVENTS_QUERY = gql`
  query CheckedInEvents {
    checkedIns(first: 1000, orderBy: blockTimestamp, orderDirection: asc) {
      id
      builder
      blockTimestamp
      transactionHash
    }
  }
`;

const GRADUATION_NFT_EVENTS_QUERY = gql`
  query GraduationNFTEvents {
    graduationNFTs(first: 1000, orderBy: blockTimestamp, orderDirection: asc) {
      id
      to
      tokenId
      blockTimestamp
      transactionHash
    }
  }
`;

type RawCheckIn = {
  id: string;
  builder: string;
  blockTimestamp: string;
  transactionHash?: string;
};

type RawGraduation = {
  id: string;
  to: string;
  tokenId: string;
  blockTimestamp: string;
  transactionHash?: string;
};

export function useCheckInEventsFromSubgraph() {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["checkedIns"],
    queryFn: async () => {
      const { checkedIns } = await request<{ checkedIns: RawCheckIn[] }>(SUBGRAPH_URL, CHECKED_IN_EVENTS_QUERY);

      // Direct mapping
      return (checkedIns ?? []).map(
        (event: RawCheckIn): TimelineEvent => ({
          type: "on-chain-checkin",
          date: event.blockTimestamp ? new Date(Number(event.blockTimestamp) * 1000).toISOString() : "",
          title: "Check-in 🎯",
          description: `Builder ${event.builder} checked in.`,
          address: event.builder,
          link: event.transactionHash ? `https://arbiscan.io/tx/${event.transactionHash}` : undefined,
        }),
      );
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 1, // Retry once on failure
  });
}

export function useGraduationNFTEventsFromSubgraph() {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["graduationNFTs"],
    queryFn: async () => {
      const { graduationNFTs } = await request<{ graduationNFTs: RawGraduation[] }>(
        SUBGRAPH_URL,
        GRADUATION_NFT_EVENTS_QUERY,
      );

      return (graduationNFTs ?? []).map(
        (event: RawGraduation): TimelineEvent => ({
          type: "graduation-nft",
          date: event.blockTimestamp ? new Date(Number(event.blockTimestamp) * 1000).toISOString() : "",
          title: event.tokenId ? `Graduation NFT #${event.tokenId} Minted` : "Graduation NFT Minted",
          description: `NFT minted to ${event.to ?? "unknown"}.`,
          address: event.to ?? undefined,
          link: event.transactionHash ? `https://arbiscan.io/tx/${event.transactionHash}` : undefined,
        }),
      );
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
}
