import { GitHubEvent } from "./types";

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
