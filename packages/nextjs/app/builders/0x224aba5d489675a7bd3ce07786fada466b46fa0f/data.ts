import { ActivityItem, GitHubEvent, WarpcastCast } from "./types";
import { formatTimeAgo } from "./utils";

export const getGitHubActivity = async ({
  githubHandle,
  perPage = 10,
}: {
  githubHandle: string;
  perPage?: number;
}): Promise<GitHubEvent[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${githubHandle}/events?per_page=${perPage}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    return events;
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    throw error;
  }
};

export const getWarpcastActivity = async ({
  warpcastHandle,
  warpcastFid,
  neynarApiKey,
}: {
  warpcastHandle?: string;
  warpcastFid?: number;
  neynarApiKey?: string;
}): Promise<ActivityItem[]> => {
  if (!neynarApiKey) {
    console.log("Neynar API key not provided, skipping fetching Warpcast activity");
    return [];
  }

  try {
    if (!warpcastFid && warpcastHandle) {
      // First, get user info to get their FID
      const userResponse = await fetch(
        `https://api.neynar.com/v2/farcaster/user/by_username?username=${warpcastHandle}`,
        {
          headers: {
            "x-api-key": neynarApiKey,
          },
        },
      );

      if (!userResponse.ok) {
        throw new Error(`Neynar user API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const user = userData.users?.[0];

      if (!user) {
        throw new Error("User not found");
      }

      warpcastFid = user.fid;
    }

    if (!warpcastFid) {
      throw new Error("Warpcast FID not found");
    }

    // Get user's casts
    const castsResponse = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${warpcastFid}&limit=10`,
      {
        headers: {
          "x-api-key": neynarApiKey,
        },
      },
    );

    if (!castsResponse.ok) {
      throw new Error(`Neynar casts API error: ${castsResponse.status}`);
    }

    const castsData = await castsResponse.json();
    const casts: WarpcastCast[] = castsData.casts || [];

    return casts.map(
      (cast): ActivityItem => ({
        id: cast.hash,
        type: "warpcast",
        title: "Cast",
        description: cast.text.length > 100 ? `${cast.text.substring(0, 100)}...` : cast.text,
        timestamp: formatTimeAgo(cast.timestamp),
        url: `https://warpcast.com/${warpcastHandle}/${cast.hash}`,
        icon: "💬",
      }),
    );
  } catch (error) {
    console.error("Error fetching Warpcast activity:", error);
    throw error;
  }
};
