import { useEffect, useState } from "react";
import { TimelineEvent } from "./types";

interface UseGitHubPREventsReturn {
  events: TimelineEvent[];
  isLoading: boolean;
  error: Error | null;
}

export const useGitHubPREvents = (owner: string, repo: string, token?: string): UseGitHubPREventsReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGitHubPRs = async () => {
      if (!owner || !repo) {
        setIsLoading(false);
        return;
      }

      if (!token) {
        console.warn("GITHUB_TOKEN not set - skipping GitHub PR fetch");
        setEvents([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

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
          console.error("GitHub API error:", response.statusText);
          setEvents([]);
          setIsLoading(false);
          return;
        }

        const prs = await response.json();

        const prEvents = prs
          .filter((pr: any) => pr.merged_at && pr.merged_at !== null)
          .map((pr: any) => ({
            type: "pr-merged" as const,
            date: pr.merged_at,
            title: pr.title,
            description: `PR #${pr.number} merged`,
            author: pr.user?.login || "unknown",
            link: pr.html_url,
          }));

        setEvents(prEvents);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error("Error fetching GitHub PRs:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubPRs();
  }, [owner, repo, token]);

  return { events, isLoading, error };
};
