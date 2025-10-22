export interface SocialHandles {
  github: string;
  x?: string;
  telegram?: string;
  warpcast?: string;
  warpcastFid?: number;
}

export interface SocialLink {
  name: string;
  handle?: string;
  icon: string;
  url: string;
  color: string;
}

export interface BuilderConfig {
  ethAddress: `0x${string}`;
  handleToSocials: SocialHandles;
  bio: string;
  batchContractAddress: `0x${string}`;
  socialLinks: SocialLink[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  payload?: {
    action?: string;
    pull_request?: {
      title: string;
      number: number;
    };
    ref_type?: string;
  };
  created_at: string;
}

export interface WarpcastCast {
  hash: string;
  text: string;
  author: {
    username: string;
    display_name: string;
    pfp_url: string;
  };
  timestamp: string;
  replies?: {
    count: number;
  };
  reactions?: {
    count: number;
  };
}

export interface ActivityItem {
  id: string;
  type: "github" | "warpcast";
  title: string;
  description: string;
  timestamp: string;
  url?: string;
  icon: string;
}
