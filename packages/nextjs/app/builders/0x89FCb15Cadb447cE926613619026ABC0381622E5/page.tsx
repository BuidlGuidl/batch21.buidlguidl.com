"use client";

import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { BadgeSkeleton, DescriptionSkeleton, SocialLinksSkeleton } from "./LoadingSkeleton";
import { ProfileHeader } from "./ProfileHeader";
import type { NextPage } from "next";
import { useEnsName } from "wagmi";

const GraduationBadge = lazy(() => import("./GraduationBadge").then(module => ({ default: module.GraduationBadge })));
const ProfileDescription = lazy(() =>
  import("./ProfileDescription").then(module => ({ default: module.ProfileDescription })),
);
const SocialLinks = lazy(() => import("./SocialLinks").then(module => ({ default: module.SocialLinks })));

const BUILDER_ADDRESS = "0x89FCb15Cadb447cE926613619026ABC0381622E5" as `0x${string}`;

const BuilderProfile: NextPage = () => {
  const { data: ensName } = useEnsName({
    address: BUILDER_ADDRESS,
    chainId: 1,
  });

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 dark:bg-base-300/90 backdrop-blur-sm rounded-[2rem] shadow-[0_8px_32px_rgba(255,105,180,0.3)] dark:shadow-[0_8px_32px_rgba(255,105,180,0.15)] p-8 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(255,105,180,0.4)] dark:hover:shadow-[0_12px_48px_rgba(255,105,180,0.25)]">
          <div className="relative">
            <ProfileHeader address={BUILDER_ADDRESS} />

            <ErrorBoundary>
              <Suspense fallback={<BadgeSkeleton />}>
                <GraduationBadge address={BUILDER_ADDRESS} />
              </Suspense>
            </ErrorBoundary>
          </div>

          <ErrorBoundary>
            <Suspense fallback={<DescriptionSkeleton />}>
              <ProfileDescription ensName={ensName} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SocialLinksSkeleton />}>
              <SocialLinks ensName={ensName} />
            </Suspense>
          </ErrorBoundary>

          {!ensName && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4 animate-spin">💫</div>
              <p className="text-gray-600 dark:text-gray-400">
                No ENS name found for this address. Set up your ENS to display your profile!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderProfile;
