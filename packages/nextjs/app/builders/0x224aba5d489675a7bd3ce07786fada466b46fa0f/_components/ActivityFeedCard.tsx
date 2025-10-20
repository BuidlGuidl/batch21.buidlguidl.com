import { ActivityItem } from "../types";

interface ActivityFeedCardProps {
  activity: ActivityItem;
}

export const ActivityFeedCard = ({ activity }: ActivityFeedCardProps) => {
  return (
    <div className="p-4 bg-base-100 rounded-lg border border-base-300 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{activity.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-base-content text-sm">{activity.title}</h4>
            <span className="text-xs text-base-content/70">{activity.timestamp}</span>
          </div>
          <p className="text-sm text-base-content/80 mb-2 line-clamp-2">{activity.description}</p>
          {activity.url && (
            <a
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
            >
              View on {activity.type === "github" ? "GitHub" : "Warpcast"} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
