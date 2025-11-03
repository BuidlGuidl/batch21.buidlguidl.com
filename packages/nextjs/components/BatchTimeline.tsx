"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sorted = [...(events || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const isDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  const newestIndex = sorted.length - 1;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-transparent" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Batch 21 Timeline
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tracking the journey of builders in Batch 21
          </p>
        </div>

        {sorted.length === 0 ? (
          <div
            className={`text-center py-16 rounded-lg ${
              isDark ? "bg-gray-900/50 border border-gray-800" : "bg-gray-100 border border-gray-200"
            }`}
          >
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>Loading timeline events...</p>
          </div>
        ) : (
          <div className="relative flex flex-col pb-32 md:pb-40">
            {/* Timeline line */}
            <div
              className={`absolute top-0 h-full border-l-2 border-dashed z-0
                left-4 md:left-1/2 md:-translate-x-1/2
                ${isDark ? "border-gray-700" : "border-gray-300"}
              `}
            />

            {/* Kickoff milestone */}
            <div
              className="
                absolute z-20 -top-4 left-2.5 md:left-1/2 md:-translate-x-1/2
                flex flex-row items-center justify-start md:flex-col md:items-center
              "
            >
              <span
                className={`
                  w-4 h-4 rounded-full border-4 border-white block
                  bg-yellow-500
                  ${isDark ? "shadow-yellow-400/30" : "shadow-yellow-300/40"} shadow
                  md:mb-2 mr-2 md:mr-0
                `}
              />
              <div
                className="
                  text-xs px-3 py-1 rounded-full bg-yellow-500/90 text-white font-semibold shadow whitespace-nowrap
                "
              >
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
                          ${isDark ? "shadow-gray-950" : "shadow-white"}
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
                          ${
                            isDark
                              ? `bg-gradient-to-br ${style.cardBg} border-gray-700 hover:border-gray-600`
                              : `bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-gray-300`
                          }
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
                              className={`badge self-start whitespace-normal break-words max-w-[12rem] text-left ${
                                isDark
                                  ? `${style.badgeBg} border border-gray-600 text-white`
                                  : `${style.badgeBg} border border-gray-300 text-gray-900`
                              }`}
                            >
                              <span className="mr-1">{style.icon}</span>
                              {event.type === "on-chain-checkin" && "On-Chain Check-in"}
                              {event.type === "graduation-nft" && "Graduation NFT"}
                              {event.type === "pr-merged" && "PR Merged"}
                            </span>
                            <time
                              className={`text-xs md:text-sm md:ml-auto ${isDark ? "text-gray-400" : "text-gray-500"}`}
                            >
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
                            className={`text-lg md:text-xl font-semibold mb-2 break-words whitespace-normal ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                            title={event.title}
                            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
                          >
                            {event.title}
                          </h3>
                          <p className={`text-sm md:text-base mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {event.description}
                          </p>
                          <div
                            className={`flex flex-wrap items-center gap-3 pt-3 border-t ${
                              isDark ? "border-gray-700" : "border-gray-200"
                            }`}
                          >
                            {event.author && (
                              <span className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
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
                                className={`text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                }`}
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
                className={`
                  w-4 h-4 rounded-full border-4 border-white block
                  bg-green-500
                  ${isDark ? "shadow-green-400/30" : "shadow-green-300/40"} shadow
                  md:mb-2 mr-2 md:mr-0
                `}
              />
              <div
                className="
                  text-xs px-3 py-1 rounded-full bg-green-500/90 text-white font-semibold shadow whitespace-nowrap
                "
              >
                Wraps up: 2 Nov 2025
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
