"use client";

import { getGitHubActivity } from "../data";
import { ActivityItem, GitHubEvent } from "../types";
import { formatTimeAgo } from "../utils";
import { ActivityFeedCard } from "./ActivityFeedCard";
import { useQuery } from "@tanstack/react-query";

interface GitHubActivityFeedProps {
  githubHandle: string;
}

const hydrateGitHubActivities = (events: GitHubEvent[]): ActivityItem[] => {
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
        title = `Created a ${event.payload?.ref_type === "branch" ? "branch" : "repository"}`;
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
};

export const GitHubActivityFeed = ({ githubHandle }: GitHubActivityFeedProps) => {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["github-activity", githubHandle],
    queryFn: () => getGitHubActivity({ githubHandle }).then(hydrateGitHubActivities),
    enabled: !!githubHandle,
  });

  if (isLoading) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
        <div className="w-full h-px bg-base-300 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 bg-base-200 rounded-lg animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-base-300 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
        <div className="w-full h-px bg-base-300 mb-4"></div>
        <div className="text-center py-8">
          <p className="text-base-content/60">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
      <div className="w-full h-px bg-base-300 mb-4"></div>

      {!activities || activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/60">No recent activity found</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map(activity => (
            <ActivityFeedCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};
