export type TimelineEvent =
  | {
      type: "on-chain-checkin";
      date: string;
      title: string;
      description: string;
      address?: string;
      link?: string;
      author?: never;
    }
  | {
      type: "graduation-nft";
      date: string;
      title: string;
      description: string;
      address?: string;
      link?: string;
      author?: never;
    }
  | {
      type: "pr-merged";
      date: string;
      title: string;
      description: string;
      author?: string;
      address?: never;
      link?: string;
    };
