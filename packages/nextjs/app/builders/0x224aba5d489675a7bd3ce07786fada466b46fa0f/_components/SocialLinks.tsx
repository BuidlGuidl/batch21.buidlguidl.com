"use client";

import { SocialHandles } from "../types";
import { CodeBracketIcon, NewspaperIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SocialLinksProps {
  socialHandles: SocialHandles;
  className?: string;
}

export const SocialLinks = ({ socialHandles, className = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "GitHub",
      handle: socialHandles.github,
      icon: CodeBracketIcon,
      url: (handle: string) => `https://github.com/${handle}`,
      color: "hover:text-gray-600",
    },
    {
      name: "X (Twitter)",
      handle: socialHandles.x,
      icon: XMarkIcon,
      url: (handle: string) => `https://x.com/${handle}`,
      color: "hover:text-blue-400",
    },
    {
      name: "Telegram",
      handle: socialHandles.telegram,
      icon: PaperAirplaneIcon,
      url: (handle: string) => `https://t.me/${handle}`,
      color: "hover:text-blue-500",
    },
    {
      name: "Warpcast",
      handle: socialHandles.warpcast,
      icon: NewspaperIcon,
      url: (handle: string) => `https://warpcast.com/${handle}`,
      color: "hover:text-purple-500",
    },
  ];

  const availableLinks = socialLinks.filter(link => link.handle);

  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {availableLinks.map(({ name, handle, icon: Icon, url, color }) => (
        <a
          key={name}
          href={url(handle!)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors ${color}`}
          title={`Visit ${name} profile`}
        >
          <Icon className="h-5 w-5" />
          {/* <span className="text-sm font-medium">{name}</span> */}
        </a>
      ))}
    </div>
  );
};
