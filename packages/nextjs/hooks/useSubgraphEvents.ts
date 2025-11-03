import { TimelineEvent } from "./types";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/1713980/batch-21-buidl-guidl/version/latest";

const CHECKED_IN_EVENTS_QUERY = gql`
  query CheckedInEvents {
    checkedIns {
      id
      builder
      first
      blockTimestamp
      checkInContract
      transactionHash
    }
  }
`;

const GRADUATION_NFT_EVENTS_QUERY = gql`
  query GraduationNFTEvents {
    graduationNFTs {
      id
      to
      tokenId
      blockTimestamp
      transactionHash
      blockNumber
      logIndex
    }
  }
`;

type RawCheckIn = {
  builder: string;
  first: boolean;
  blockTimestamp: string;
  transactionHash?: string;
  checkInContract?: string;
  id: string;
};

type RawGraduation = {
  id: string;
  to: string;
  tokenId: string;
  blockTimestamp: string;
  transactionHash?: string;
  blockNumber?: string;
  logIndex?: string;
};

export function useCheckInEventsFromSubgraph() {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["checkedIns"],
    queryFn: async () => {
      const { checkedIns } = await request<{ checkedIns: RawCheckIn[] }>(SUBGRAPH_URL, CHECKED_IN_EVENTS_QUERY);

      // Group events by normalized (lowercase) builder address
      const eventsByBuilder: Record<string, TimelineEvent[]> = {};

      const allEvents: TimelineEvent[] = (checkedIns ?? []).map(
        (event: RawCheckIn): TimelineEvent => ({
          type: "on-chain-checkin",
          date: event.blockTimestamp ? new Date(Number(event.blockTimestamp) * 1000).toISOString() : "",
          title: "", // Set below
          description: `Builder ${event.builder} checked in.`,
          address: event.builder,
          link: event.transactionHash ? `https://arbiscan.io/tx/${event.transactionHash}` : undefined,
        }),
      );

      allEvents.forEach(event => {
        const normalizedAddress = event.address ? event.address.toLowerCase() : "";
        if (!normalizedAddress) return;
        if (!eventsByBuilder[normalizedAddress]) {
          eventsByBuilder[normalizedAddress] = [];
        }
        eventsByBuilder[normalizedAddress].push(event);
      });

      // Assign titles per builder: only first event is "First Check-in"
      const correctedEvents: TimelineEvent[] = [];
      Object.values(eventsByBuilder).forEach(builderEvents => {
        builderEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        builderEvents.forEach((ev, i) => {
          ev.title = i === 0 ? "Check-in 🎯" : "Check-in";
          correctedEvents.push(ev);
        });
      });

      return correctedEvents;
    },
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
  });
}
