"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: checkedInCounter, isLoading } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
      {/* Welcome Section with Glowing Effect */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 dark:bg-clip-text dark:text-transparent drop-shadow-lg [text-shadow:0_0_45px_rgba(37,99,235,0.9),0_0_90px_rgba(59,130,246,0.7)] dark:[text-shadow:0_0_30px_rgba(59,130,246,0.5),0_0_60px_rgba(37,99,235,0.3)]">
          Batch 21
        </h1>
        <p className="text-xl md:text-2xl text-white dark:text-gray-300 mb-2 [text-shadow:0_0_24px_rgba(148,163,184,0.95)] dark:[text-shadow:none]">
          Welcome to BuidlGuidl
        </p>
        <p className="text-base md:text-lg text-white dark:text-gray-400 mb-6 [text-shadow:0_0_20px_rgba(148,163,184,0.9)] dark:[text-shadow:none]">
          Get started by exploring the tools below or check out your batch GitHub repository.
        </p>

        {/* Builders Counter */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/45 dark:bg-white/5 backdrop-blur-sm border border-slate-900/50 dark:border-white/10 mb-8">
          <span className="text-sm font-semibold text-white dark:text-gray-300 [text-shadow:0_0_14px_rgba(148,163,184,0.8)] dark:[text-shadow:none]">
            Builders checked in:
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            {isLoading ? "..." : checkedInCounter}
          </span>
        </div>
      </div>

      {/* Floating Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-8">
        <Link href="/debug" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-slate-900/50 dark:border-white/10 bg-slate-800/45 dark:bg-white/5 hover:bg-slate-800/65 dark:hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <BugAntIcon className="h-12 w-12 text-white dark:text-blue-400 group-hover:text-white dark:group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white dark:text-white mb-2 [text-shadow:0_0_16px_rgba(148,163,184,0.8)] dark:[text-shadow:none]">
                Debug Contracts
              </h3>
              <p className="text-sm text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-300 transition-colors [text-shadow:0_0_12px_rgba(148,163,184,0.75)] dark:[text-shadow:none]">
                Tinker with your smart contracts and test functions
              </p>
            </div>
          </div>
        </Link>

        <Link href="/blockexplorer" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-slate-900/50 dark:border-white/10 bg-slate-800/45 dark:bg-white/5 hover:bg-slate-800/65 dark:hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <MagnifyingGlassIcon className="h-12 w-12 text-white dark:text-blue-400 group-hover:text-white dark:group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white dark:text-white mb-2 [text-shadow:0_0_16px_rgba(148,163,184,0.8)] dark:[text-shadow:none]">
                Block Explorer
              </h3>
              <p className="text-sm text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-300 transition-colors [text-shadow:0_0_12px_rgba(148,163,184,0.75)] dark:[text-shadow:none]">
                Explore your local blockchain transactions
              </p>
            </div>
          </div>
        </Link>

        <Link href="/builders" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-slate-900/50 dark:border-white/10 bg-slate-800/45 dark:bg-white/5 hover:bg-slate-800/65 dark:hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <UserGroupIcon className="h-12 w-12 text-white dark:text-blue-400 group-hover:text-white dark:group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white dark:text-white mb-2 [text-shadow:0_0_16px_rgba(148,163,184,0.8)] dark:[text-shadow:none]">
                Builders
              </h3>
              <p className="text-sm text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-300 transition-colors [text-shadow:0_0_12px_rgba(148,163,184,0.75)] dark:[text-shadow:none]">
                Meet our wonderful builders!
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
