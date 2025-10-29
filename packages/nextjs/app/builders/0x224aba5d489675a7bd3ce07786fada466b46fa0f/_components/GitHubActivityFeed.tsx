"use client";

import { getGitHubActivity } from "../data";
import { GitHubEvent } from "../types";
import { formatTimeAgo } from "../utils";
import { useQuery } from "@tanstack/react-query";

interface GitHubActivityFeedProps {
  githubHandle: string;
}

export const GitHubActivityFeed = ({ githubHandle }: GitHubActivityFeedProps) => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["github-activity", githubHandle],
    queryFn: () => getGitHubActivity({ githubHandle }),
    enabled: !!githubHandle,
  });

  const getEventIcon = (event: GitHubEvent): string => {
    switch (event.type) {
      case "PushEvent":
        return "🔹";
      case "WatchEvent":
        return "⭐";
      case "PullRequestEvent":
        return "🔀";
      case "IssuesEvent":
        return "📝";
      case "CreateEvent":
        return "🆕";
      default:
        return "📋";
    }
  };

  const getEventTitle = (event: GitHubEvent): string => {
    switch (event.type) {
      case "PushEvent":
        return "Pushed to repository";
      case "WatchEvent":
        return "Starred repository";
      case "PullRequestEvent":
        return `Pull Request ${event.payload?.action || "opened"}`;
      case "IssuesEvent":
        return `Issue ${event.payload?.action || "opened"}`;
      case "CreateEvent":
        return `Created a ${event.payload?.ref_type === "branch" ? "branch" : "repository"}`;
      default:
        return event.type;
    }
  };

  const getEventDescription = (event: GitHubEvent): string => {
    if (event.type === "PullRequestEvent" && event.payload?.pull_request?.title) {
      return event.payload.pull_request.title;
    }
    return event.repo.name;
  };

  const getEventUrl = (event: GitHubEvent): string => {
    return `https://github.com/${event.repo.name}`;
  };

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

      {!events || events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/60">No recent activity found</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map(event => (
            <div
              key={event.id}
              className="p-4 bg-base-100 rounded-lg border border-base-300 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{getEventIcon(event)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-base-content text-sm">{getEventTitle(event)}</h4>
                    <span className="text-xs text-base-content/70">{formatTimeAgo(event.created_at)}</span>
                  </div>
                  <p className="text-sm text-base-content/80 mb-2 line-clamp-2">{getEventDescription(event)}</p>
                  <a
                    href={getEventUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
