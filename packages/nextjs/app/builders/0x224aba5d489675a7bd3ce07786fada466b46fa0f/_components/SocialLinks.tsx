"use client";

import { SocialLink } from "../types";
import { CodeBracketIcon, NewspaperIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SocialLinksProps {
  socialLinks: SocialLink[];
  className?: string;
}

const iconMap = {
  github: CodeBracketIcon,
  x: XMarkIcon,
  telegram: PaperAirplaneIcon,
  warpcast: NewspaperIcon,
};

export const SocialLinks = ({ socialLinks, className = "" }: SocialLinksProps) => {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map(({ name, icon, url, color }) => {
        const IconComponent = iconMap[icon as keyof typeof iconMap];
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors ${color}`}
            title={`Visit ${name} profile`}
          >
            <IconComponent className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
};
