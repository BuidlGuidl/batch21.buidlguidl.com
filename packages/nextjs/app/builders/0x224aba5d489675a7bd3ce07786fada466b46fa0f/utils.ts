import { ActivityItem, GitHubEvent, WarpcastCast } from "./types";

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
};

export const getGitHubActivity = async (username: string): Promise<ActivityItem[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    return events.map((event): ActivityItem => {
      let title = "";
      let description = "";
      let icon = "";

      switch (event.type) {
        case "PushEvent":
          title = "Pushed to repository";
          description = event.repo.name;
          icon = "🔹";
          break;
        case "WatchEvent":
          title = "Starred repository";
          description = event.repo.name;
          icon = "⭐";
          break;
        case "PullRequestEvent":
          title = `Pull Request ${event.payload?.action || "opened"}`;
          description = event.payload?.pull_request?.title || event.repo.name;
          icon = "🔀";
          break;
        case "IssuesEvent":
          title = `Issue ${event.payload?.action || "opened"}`;
          description = event.repo.name;
          icon = "📝";
          break;
        case "CreateEvent":
          title = "Created repository";
          description = event.repo.name;
          icon = "🆕";
          break;
        default:
          title = event.type;
          description = event.repo.name;
          icon = "📋";
      }

      return {
        id: event.id,
        type: "github",
        title,
        description,
        timestamp: formatTimeAgo(event.created_at),
        url: `https://github.com/${event.repo.name}`,
        icon,
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return [];
  }
};

export const getWarpcastActivity = async ({
  username,
  warpcastFid,
}: {
  username?: string;
  warpcastFid?: number;
}): Promise<ActivityItem[]> => {
  const neynarApiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

  if (!neynarApiKey) {
    console.log("Neynar API key not provided, skipping Warpcast activity");
    return [];
  }

  try {
    if (!warpcastFid && username) {
      // First, get user info to get their FID
      const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/by_username?username=${username}`, {
        headers: {
          "x-api-key": neynarApiKey,
        },
      });

      if (!userResponse.ok) {
        throw new Error(`Neynar user API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      console.log("userData", userData);
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
        url: `https://warpcast.com/${username}/${cast.hash}`,
        icon: "💬",
      }),
    );
  } catch (error) {
    console.error("Error fetching Warpcast activity:", error);
    return [];
  }
};
