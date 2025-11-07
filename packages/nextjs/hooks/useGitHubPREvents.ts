"use client";

import { TimelineEvent } from "./types";
import { useQuery } from "@tanstack/react-query";

interface UseGitHubPREventsParams {
  owner: string;
  repo: string;
}

export const useGitHubPREvents = ({ owner, repo }: UseGitHubPREventsParams) => {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["githubPRs", owner, repo],
    queryFn: async () => {
      if (!owner || !repo) {
        throw new Error("Owner and repo are required");
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100`,
        {
          cache: "no-store", // Keep this - still good for not caching at HTTP level
        },
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const prs = await response.json();

      return prs
        .filter((pr: any) => pr.merged_at && pr.merged_at !== null)
        .map((pr: any) => ({
          type: "pr-merged" as const,
          date: pr.merged_at,
          title: pr.title,
          description: `PR #${pr.number} merged`,
          author: pr.user?.login || "unknown",
          link: pr.html_url,
        }));
    },
    enabled: !!owner && !!repo,
    retry: 2,
    staleTime: 10 * 60 * 1000, // Increase to 10 minutes (more aggressive caching for rate limit)
  });
};
