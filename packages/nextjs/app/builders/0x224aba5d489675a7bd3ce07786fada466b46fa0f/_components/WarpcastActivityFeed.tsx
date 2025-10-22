"use client";

import { getWarpcastActivity } from "../data";
import { ActivityFeedCard } from "./ActivityFeedCard";
import { useQuery } from "@tanstack/react-query";

interface WarpcastActivityFeedProps {
  warpcastHandle?: string;
  warpcastFid?: number;
  neynarApiKey?: string;
}

export const WarpcastActivityFeed = ({ warpcastHandle, warpcastFid, neynarApiKey }: WarpcastActivityFeedProps) => {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["warpcast-activity", warpcastHandle, warpcastFid],
    queryFn: () => getWarpcastActivity({ warpcastHandle, warpcastFid, neynarApiKey }),
    enabled: !!neynarApiKey && (!!warpcastHandle || !!warpcastFid),
  });

  if (!neynarApiKey) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-base-content mb-4">Warpcast Activity</h2>
        <div className="w-full h-px bg-base-300 mb-4"></div>
        <div className="text-center py-8">
          <p className="text-base-content/60">Warpcast activity requires Neynar API key</p>
          <p className="text-sm text-base-content/40 mt-2">
            Add NEXT_PUBLIC_NEYNAR_API_KEY to your environment variables
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-base-content mb-4">Warpcast Activity</h2>
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
        <h2 className="text-xl font-bold text-base-content mb-4">Warpcast Activity</h2>
        <div className="w-full h-px bg-base-300 mb-4"></div>
        <div className="text-center py-8">
          <p className="text-base-content/60">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-4">Warpcast Activity</h2>
      <div className="w-full h-px bg-base-300 mb-4"></div>

      {!activities || activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/60">No recent activity found</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map(activity => (
            <ActivityFeedCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};
