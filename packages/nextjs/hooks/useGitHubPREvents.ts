"use client";

import { TimelineEvent } from "./types";
import { useQuery } from "@tanstack/react-query";

interface UseGitHubPREventsParams {
  owner: string;
  repo: string;
  token?: string;
}

export const useGitHubPREvents = ({ owner, repo, token }: UseGitHubPREventsParams) => {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["githubPRs", owner, repo, token],
    queryFn: async () => {
      if (!owner || !repo) {
        throw new Error("Owner and repo are required");
      }

      if (!token) {
        console.warn("GITHUB_TOKEN not set - skipping GitHub PR fetch");
        return [];
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
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
    enabled: !!owner && !!repo && !!token,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
