"use client";

import { Address } from "~~/components/scaffold-eth";
import { TimelineEvent } from "~~/hooks";

interface BatchTimelineProps {
  events: TimelineEvent[];
}

const typeStyles: Record<
  TimelineEvent["type"],
  {
    dot: string;
    badge: string;
    icon: string;
    cardBg: string;
    badgeBg: string;
  }
> = {
  "on-chain-checkin": {
    dot: "bg-blue-500",
    badge: "badge badge-info",
    icon: "⛓️",
    cardBg: "from-blue-500/10 to-blue-600/5",
    badgeBg: "bg-blue-500/20",
  },
  "graduation-nft": {
    dot: "bg-purple-500",
    badge: "badge badge-primary",
    icon: "🎓",
    cardBg: "from-purple-500/10 to-purple-600/5",
    badgeBg: "bg-purple-500/20",
  },
  "pr-merged": {
    dot: "bg-green-500",
    badge: "badge badge-success",
    icon: "✨",
    cardBg: "from-green-500/10 to-green-600/5",
    badgeBg: "bg-green-500/20",
  },
};

export const BatchTimeline = ({ events }: BatchTimelineProps) => {
  // const sorted = [...(events || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // not needed anymore as events are pre-sorted
  const sorted = events || [];
  const newestIndex = sorted.length - 1;

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Batch 21 Timeline</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Tracking the journey of builders in Batch 21
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <p className="text-lg text-gray-600 dark:text-gray-400">Cooking Timeline!...</p>
          </div>
        ) : (
          <div className="relative flex flex-col pb-32 md:pb-40">
            {/* Timeline line */}
            <div
              className="absolute top-0 h-full border-l-2 border-dashed border-gray-100 dark:border-gray-700 z-0
                left-4 md:left-1/2 md:-translate-x-1/2"
            />

            {/* Kickoff milestone */}
            <div
              className="
                absolute z-20 -top-4 left-2.5 md:left-1/2 md:-translate-x-1/2
                flex flex-row items-center justify-start md:flex-col md:items-center
              "
            >
              <span
                className="
                  w-4 h-4 rounded-full border-4 border-white block
                  bg-yellow-500 shadow
                  shadow-yellow-300/40 dark:shadow-yellow-400/30
                  md:mb-2 mr-2 md:mr-0
                "
              />
              <div className="text-xs px-3 py-1 rounded-full bg-yellow-500/90 text-white font-semibold shadow whitespace-nowrap">
                Kickoff: 15 Oct 2025
              </div>
            </div>

            <ul className="space-y-16 md:space-y-24 mt-16">
              {sorted.map((event, index) => {
                const style = typeStyles[event.type];
                const isLeft = index % 2 !== 0;
                const isNewest = index === newestIndex;
                return (
                  <li
                    key={`${event.type}-${event.date}-${index}`}
                    className="relative flex md:grid md:grid-cols-2 md:items-center z-10"
                  >
                    {/* Dot */}
                    <div className="absolute top-8 z-20 left-2.5 md:left-1/2 md:-translate-x-1/2">
                      <span
                        className={`w-4 h-4 rounded-full border-4 border-white block
                          ${style.dot}
                          ${isNewest ? "animate-pulse shadow-lg shadow-current" : ""}
                          shadow-white dark:shadow-gray-950
                        `}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`
                        mt-2 w-full md:w-[90%] ml-10 md:ml-0 md:mr-0
                        ${
                          isLeft
                            ? "md:col-start-1 md:justify-self-end md:pr-12"
                            : "md:col-start-2 md:justify-self-start md:pl-12"
                        }
                        flex flex-col items-start
                      `}
                    >
                      <div
                        className={`rounded-lg border shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105
                          bg-gradient-to-br ${style.cardBg}
                          border-gray-200 dark:border-gray-700
                          hover:border-gray-300 dark:hover:border-gray-600
                          from-white/30 to-white/20 dark:from-gray-800/30 dark:to-gray-900/20
                          backdrop-blur-md
                          w-full max-w-full overflow-hidden
                        `}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <div className="p-5 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                            <span
                              className={`badge self-start whitespace-normal break-words break-anywhere max-w-[12rem] text-left
                                ${style.badgeBg}
                                border border-gray-300 dark:border-gray-600
                                text-gray-900 dark:text-white
                              `}
                            >
                              <span className="mr-1">{style.icon}</span>
                              {event.type === "on-chain-checkin" && "On-Chain Check-in"}
                              {event.type === "graduation-nft" && "Graduation NFT"}
                              {event.type === "pr-merged" && "PR Merged"}
                            </span>
                            <time className="text-xs md:text-sm md:ml-auto text-gray-500 dark:text-gray-400">
                              {new Date(event.date).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </time>
                          </div>
                          <h3
                            className="text-lg md:text-xl font-semibold mb-2 break-words whitespace-normal text-gray-900 dark:text-white"
                            title={event.title}
                            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
                          >
                            {event.title}
                          </h3>
                          <p className="text-sm md:text-base mb-4 text-gray-700 dark:text-gray-300">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            {event.author && (
                              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                @{event.author}
                              </span>
                            )}
                            {event.address && (
                              <div className="flex-1 min-w-0 font-mono text-xs break-words">
                                <span className="font-semibold">Wallet:</span>{" "}
                                <Address address={event.address} disableAddressLink={false} />
                              </div>
                            )}
                            {event.link && (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs md:text-sm font-medium transition-colors whitespace-nowrap text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              >
                                View →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </li>
                );
              })}
            </ul>

            {/* Wrap up milestone */}
            <div
              className="
                absolute z-20 -bottom-6 left-2.5 md:left-1/2 md:-translate-x-1/2
                flex flex-row items-center md:flex-col md:items-center
              "
            >
              <span
                className="
                  w-4 h-4 rounded-full border-4 border-white block
                  bg-green-500 shadow
                  shadow-green-300/40 dark:shadow-green-400/30
                  md:mb-2 mr-2 md:mr-0
                "
              />
              <div className="text-xs px-3 py-1 rounded-full bg-green-500/90 text-white font-semibold shadow whitespace-nowrap">
                Wraps up: 2 Nov 2025
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
