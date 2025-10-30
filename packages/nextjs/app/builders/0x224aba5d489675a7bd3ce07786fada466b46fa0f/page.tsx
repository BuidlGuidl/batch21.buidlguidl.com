import { BatchCard } from "./_components/BatchCard";
import { BuilderBio } from "./_components/BuilderBio";
import { BuilderHeader } from "./_components/BuilderHeader";
import { GitHubActivityFeed } from "./_components/GitHubActivityFeed";
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
          {/* GitHub Activity Feed */}
          <GitHubActivityFeed githubHandle={BUILDER_CONFIG.handleToSocials.github} />
        </div>
      </div>
    </div>
  );
};

export default SantiagoProfilePage;
