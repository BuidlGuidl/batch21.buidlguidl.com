"use client";

import { useEffect, useState } from "react";
import { ActivityItem } from "../types";
import { getGitHubActivity } from "../utils";
import { ActivityFeedCard } from "./ActivityFeedCard";

interface GitHubActivityFeedProps {
  githubHandle: string;
}

export const GitHubActivityFeed = ({ githubHandle }: GitHubActivityFeedProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGitHubActivity(githubHandle);
        setActivities(data);
      } catch (err) {
        setError("Failed to load GitHub activity");
        console.error("GitHub activity error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (githubHandle) {
      fetchActivities();
    }
  }, [githubHandle]);

  if (loading) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
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
        <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
        <div className="w-full h-px bg-base-300 mb-4"></div>
        <div className="text-center py-8">
          <p className="text-base-content/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-4">GitHub Activity</h2>
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
