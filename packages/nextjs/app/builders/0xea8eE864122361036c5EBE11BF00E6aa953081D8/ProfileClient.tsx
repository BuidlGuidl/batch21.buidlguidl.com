"use client";

import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import { ProfileAvatar } from "./ProfileAvatar";
import { TypingLine } from "./TypingLine";
import { GlobeAltIcon, PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const ADDRESS = "0xea8eE864122361036c5EBE11BF00E6aa953081D8";

// Terminus font is local only (~150 KB) for terminal design aesthetics, its not globally imported
const terminus = localFont({
  src: "./Terminus.ttf",
  display: "swap",
});

const socials = [
  { name: "GitHub", href: "https://github.com/jopoepl", icon: <UserIcon className="w-4 h-4" /> },
  {
    name: "Twitter",
    href: "https://x.com/jocodesio",
    icon: <span className="text-xs font-bold tracking-tight">𝕏</span>,
  },
  {
    name: "Telegram",
    href: "https://t.me/jopoepl",
    icon: <PaperAirplaneIcon className="w-4 h-4 text-[#f8d56f] rotate-[-15deg]" />,
  },
  { name: "Website", href: "https://www.jopoepl.com/", icon: <GlobeAltIcon className="w-4 h-4" /> },
];

export default function ProfileClient() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
    } catch {
      window.prompt("Copy address:", ADDRESS);
    }
  };

  return (
    <div
      className={`${terminus.className} min-h-screen flex items-center justify-center p-6 bg-[#e9f7ec] dark:bg-[#1a1a1a] text-[#07360b] dark:text-[#f7b733]`}
    >
      <div className="w-full max-w-4xl border border-[#0b6623]/30 dark:border-[#f7b733]/30 rounded-md p-6 bg-[#d7f0d9] dark:bg-[#0e0d06] shadow-[0_0_20px_rgba(247,183,51,0.1)]">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="ml-3 text-xs opacity-70">/builders/jopoepl</div>
        </div>

        <div className="flex items-center gap-5 mb-8">
          <ProfileAvatar src="https://avatars.githubusercontent.com/u/13268802?v=4" alt="jopoepl avatar" size={80} />
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1 text-[#0b6623] dark:text-[#f8d56f]">jopoepl</h1>
            <p className="text-lg opacity-80 mb-2">Full-stack & Web3 Builder | Open Source | DeFi</p>
            <div className="flex items-center gap-3">
              <Address address={ADDRESS} format="short" size="sm" onlyEnsOrAddress />
              <button
                onClick={copyAddress}
                className="text-xs border border-[#0b6623]/30 dark:border-[#f7b733]/30 px-2 py-1 rounded hover:bg-[#0b6623]/10 dark:hover:bg-[#f7b733]/10 transition"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <section className="text-[16px] leading-relaxed mb-8">
          <p>
            I love how blockchain unlocks new ways to build and collaborate. After years of shipping products, my focus
            is now on Web3 and DeFi creating decentralized, open-source tools that empower developers and real users.
          </p>
        </section>

        {/* Projects Section */}
        <section className="mb-8 text-xl border-t border-[#0b6623]/20 dark:border-[#f7b733]/20 pt-6">
          <h2 className="font-semibold text-[#0b6623] dark:text-[#ffd369] mb-3">
            <span className="text-[#0b6623]/80 dark:text-[#f8d56f]/80">$ cd /jopoepl/projects/</span>
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-[#0b6623] dark:text-[#f8d56f]">-</span>{" "}
              <a
                href="https://privyage-moca.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]"
              >
                PrivyAge
              </a>
              <span className="opacity-80">
                {" "}
                — Privacy-first age verification & content gatekeeping using moca chain.
              </span>
            </div>
            <div>
              <span className="text-[#0b6623] dark:text-[#f8d56f]">-</span>{" "}
              <a
                href="https://dlmm-backtesting-tool.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]"
              >
                DLMM Backtesting Tool
              </a>
              <span className="opacity-80"> — Liquidity backtesting tool for Solana Saros DeFi pools.</span>
            </div>
            <div>
              <span className="text-[#0b6623] dark:text-[#f8d56f]">-</span>{" "}
              <a
                href="https://pressanalytica.app/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]"
              >
                Press Analytica
              </a>
              <span className="opacity-80"> — AI-powered analytics platform for publishers.</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#0b6623] dark:text-[#f8d56f]">-</span>
                <span className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]">BuidlGuidl #21</span>
                <TypingLine />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-[#0b6623] dark:text-[#ffd369] mb-3 border-t border-[#0b6623]/20 dark:border-[#f7b733]/20 pt-6 ">
            <span className="text-[#0b6623]/80 dark:text-[#f8d56f]/80 text-xl">$ cd /jopoepl/socials/</span>
          </h2>
          <div className="flex flex-wrap text-sm gap-4 items-center">
            {socials.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]"
              >
                <span>{icon}</span>
                <span className="underline">{name}</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-lg text-[#0b6623] dark:text-[#f8d56f]">
          <h2 className="font-semibold text-[#0b6623] dark:text-[#ffd369] mb-3 border-t border-[#0b6623]/20 dark:border-[#f7b733]/20 pt-6 ">
            <span className="text-[#0b6623]/80 dark:text-[#f8d56f]/80 text-xl">$ cd /jopoepl/skills/</span>
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Next.js",
              "React",
              "Node.js",
              "MongoDB",
              "Supabase",
              "AI",
              "Zustand",
              "Solidity",
              "DeFi",
              "Open Source",
            ].map(skill => (
              <span
                key={skill}
                className="px-2 py-[2px] rounded border border-[#0b6623]/30 dark:border-[#f7b733]/30 bg-[#e6f3e8] dark:bg-[#0b0a05] text-[#07360b] dark:text-[#ffd369] hover:text-[#0b0a05] dark:hover:text-[#0b0a05] hover:bg-[#0b6623] dark:hover:bg-[#ffd369] transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs opacity-70">
            <span className="text-[#0b6623] dark:text-[#f8d56f]">$</span> Keep shipping, Keep learning
            <span className="animate-pulse text-[#0b6623] dark:text-[#f8d56f]">█</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
