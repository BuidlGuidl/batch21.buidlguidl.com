type BaseTimelineEvent = {
  date: string;
  title: string;
  description: string;
  link?: string;
};

type VariantTimelineEvent =
  | {
      type: "on-chain-checkin";
      address?: string;
      author?: never;
    }
  | {
      type: "graduation-nft";
      address?: string;
      author?: never;
    }
  | {
      type: "pr-merged";
      author?: string;
      address?: never;
    };

export type TimelineEvent = VariantTimelineEvent & BaseTimelineEvent;
