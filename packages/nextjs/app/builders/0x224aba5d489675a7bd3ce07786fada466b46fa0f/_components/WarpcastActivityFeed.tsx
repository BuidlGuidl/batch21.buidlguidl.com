"use client";

import { useEffect, useState } from "react";
import { ActivityItem } from "../types";
import { getWarpcastActivity } from "../utils";
import { ActivityFeedCard } from "./ActivityFeedCard";

interface WarpcastActivityFeedProps {
  warpcastHandle?: string;
  warpcastFid?: number;
}

export const WarpcastActivityFeed = ({ warpcastHandle, warpcastFid }: WarpcastActivityFeedProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyAvailable, setApiKeyAvailable] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Neynar API key is available
        const hasApiKey = !!process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
        setApiKeyAvailable(hasApiKey);

        if (!hasApiKey) {
          setError("Neynar API key not configured");
          return;
        }

        const data = await getWarpcastActivity({
          username: warpcastHandle,
          warpcastFid: warpcastFid,
        });
        setActivities(data);
      } catch (err) {
        setError("Failed to load Warpcast activity");
        console.error("Warpcast activity error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (warpcastHandle) {
      fetchActivities();
    }
  }, [warpcastHandle]);

  if (!apiKeyAvailable) {
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

  if (loading) {
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
          <p className="text-base-content/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-4">Warpcast Activity</h2>
      <div className="w-full h-px bg-base-300 mb-4"></div>

      {activities.length === 0 ? (
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
