import { BatchCard } from "./_components/BatchCard";
import { BuilderBio } from "./_components/BuilderBio";
import { BuilderHeader } from "./_components/BuilderHeader";
import { GitHubActivityFeed } from "./_components/GitHubActivityFeed";
import { WarpcastActivityFeed } from "./_components/WarpcastActivityFeed";
import builderData from "./builder.json";
import { BuilderData } from "./types";

export default function BuilderProfilePage() {
  // Use imported builder data directly
  const data = builderData as BuilderData;

  const BATCH_CONTRACT_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B" as `0x${string}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Builder Header - 30% on desktop, sticky */}
        <div className="w-full md:w-[30%] md:sticky md:top-24">
          <div className="flex flex-col gap-6">
            <BuilderHeader builderData={data} />
            <BatchCard builderData={data} contractAddress={BATCH_CONTRACT_ADDRESS} />
          </div>
        </div>

        {/* Right: Bio + Feeds - 70% on desktop */}
        <div className="w-full md:w-[70%] flex flex-col gap-6">
          {/* Bio Section */}
          <BuilderBio bio={data.bio} />

          {/* Activity Feeds - 2-column grid on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GitHubActivityFeed githubHandle={data.githubHandle} />
            <WarpcastActivityFeed warpcastHandle={data.handleToSocials.warpcast || ""} warpcastFid={data.warpcastFid} />
          </div>
        </div>
      </div>
    </div>
  );
}
