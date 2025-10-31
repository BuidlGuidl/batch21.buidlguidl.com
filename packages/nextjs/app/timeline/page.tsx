"use client";

import { useEffect, useState } from "react";
import { BatchTimeline, type TimelineEvent } from "~~/components/BatchTimeline";

const TimelinePage = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/timeline", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch timeline");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching timeline:", err);
        setError(err instanceof Error ? err.message : "Failed to load timeline");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p>Loading timeline events...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-error m-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && <BatchTimeline events={events} />}
    </div>
  );
};

export default TimelinePage;
