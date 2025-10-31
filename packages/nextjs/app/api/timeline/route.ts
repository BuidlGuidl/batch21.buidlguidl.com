import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, parseAbiItem } from "viem";
import { arbitrum } from "viem/chains";

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

const BATCH_REGISTRY_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;
const BATCH_GRADUATION_NFT_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as const;
const GITHUB_REPO_OWNER = "BuidlGuidl";
const GITHUB_REPO_NAME = "batch21.buidlguidl.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export type TimelineEvent = {
  type: "on-chain-checkin" | "graduation-nft" | "pr-merged";
  date: string;
  title: string;
  description: string;
  author?: string;
  address?: string;
  link?: string;
};

async function fetchGitHubPRs(): Promise<TimelineEvent[]> {
  if (!GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set - skipping GitHub PR fetch");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls?state=closed&base=main&per_page=100`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.statusText);
      return [];
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
  } catch (error) {
    console.error("Error fetching GitHub PRs:", error);
    return [];
  }
}

async function fetchOnChainCheckIns(): Promise<TimelineEvent[]> {
  try {
    const logs = await publicClient.getLogs({
      address: BATCH_REGISTRY_ADDRESS,
      event: parseAbiItem("event CheckedIn(bool first, address indexed builder, address checkInContract)"),
      fromBlock: 0n,
      toBlock: "latest",
    });

    const events: TimelineEvent[] = [];

    for (const log of logs) {
      try {
        const block = await publicClient.getBlock({
          blockNumber: log.blockNumber,
        });

        const builder = log.args.builder as string;
        const first = log.args.first as boolean;

        events.push({
          type: "on-chain-checkin",
          date: new Date(Number(block.timestamp) * 1000).toISOString(),
          title: first ? "First Check-in 🎯" : "Check-in",
          description: "Builder checked in on-chain",
          address: builder,
          link: `https://arbiscan.io/tx/${log.transactionHash}`,
        });
      } catch (error) {
        console.error("Error processing CheckedIn event:", error);
      }
    }

    return events;
  } catch (error) {
    console.error("Error fetching on-chain check-ins:", error);
    return [];
  }
}

async function fetchGraduationNFTs(): Promise<TimelineEvent[]> {
  try {
    const logs = await publicClient.getLogs({
      address: BATCH_GRADUATION_NFT_ADDRESS,
      event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"),
      fromBlock: 0n,
      toBlock: "latest",
    });

    const events: TimelineEvent[] = [];
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    for (const log of logs) {
      try {
        const from = log.args.from as string;
        const to = log.args.to as string;

        if (from?.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
          const block = await publicClient.getBlock({
            blockNumber: log.blockNumber,
          });

          events.push({
            type: "graduation-nft",
            date: new Date(Number(block.timestamp) * 1000).toISOString(),
            title: "Graduation NFT Minted 🎓",
            description: "Builder minted graduation NFT",
            address: to,
            link: `https://arbiscan.io/tx/${log.transactionHash}`,
          });
        }
      } catch (error) {
        console.error("Error processing Transfer event:", error);
      }
    }

    return events;
  } catch (error) {
    console.error("Error fetching graduation NFTs:", error);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const [prEvents, checkInEvents, nftEvents] = await Promise.all([
      fetchGitHubPRs(),
      fetchOnChainCheckIns(),
      fetchGraduationNFTs(),
    ]);

    const allEvents = [...prEvents, ...checkInEvents, ...nftEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return NextResponse.json(allEvents);
  } catch (error) {
    console.error("Timeline API error:", error);
    return NextResponse.json({ error: "Failed to fetch timeline events" }, { status: 500 });
  }
}
