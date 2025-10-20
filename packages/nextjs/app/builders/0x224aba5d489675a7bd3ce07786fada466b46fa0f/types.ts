export interface SocialHandles {
  github?: string;
  x?: string;
  telegram?: string;
  warpcast?: string;
}

export interface BuilderData {
  ethAddress: string;
  githubHandle: string;
  handleToSocials: SocialHandles;
  bio: string;
  warpcastFid?: number;
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
