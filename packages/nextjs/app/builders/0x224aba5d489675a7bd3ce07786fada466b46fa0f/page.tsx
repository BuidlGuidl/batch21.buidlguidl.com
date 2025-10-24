import { BatchCard } from "./_components/BatchCard";
import { BuilderBio } from "./_components/BuilderBio";
import { BuilderHeader } from "./_components/BuilderHeader";
import { GitHubActivityFeed } from "./_components/GitHubActivityFeed";
import { WarpcastActivityFeed } from "./_components/WarpcastActivityFeed";
import { BUILDER_CONFIG } from "./builder.config";
import { NextPage } from "next";

const SantiagoProfilePage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Builder Header - 30% on desktop, sticky */}
        <div className="w-full md:w-[30%] md:sticky md:top-24">
          <div className="flex flex-col gap-6">
            <BuilderHeader builderConfig={BUILDER_CONFIG} />
            <BatchCard builderConfig={BUILDER_CONFIG} />
          </div>
        </div>

        {/* Right: Bio + Feeds - 70% on desktop */}
        <div className="w-full md:w-[70%] flex flex-col gap-6">
          {/* Bio Section */}
          <BuilderBio bio={BUILDER_CONFIG.bio} />

          {/* Activity Feeds - 2-column grid on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GitHubActivityFeed githubHandle={BUILDER_CONFIG.handleToSocials.github} />
            <WarpcastActivityFeed
              warpcastHandle={BUILDER_CONFIG.handleToSocials.warpcast}
              warpcastFid={BUILDER_CONFIG.handleToSocials.warpcastFid}
              neynarApiKey={process.env.NEXT_PUBLIC_NEYNAR_API_KEY || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SantiagoProfilePage;
