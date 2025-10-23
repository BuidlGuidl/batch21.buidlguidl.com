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
        <h1
          className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
          style={{
            textShadow: "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(37, 99, 235, 0.3)",
          }}
        >
          Batch 21
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">Welcome to BuidlGuidl</p>
        <p className="text-base md:text-lg text-gray-400 mb-6">
          Get started by exploring the tools below or check out your batch GitHub repository.
        </p>

        {/* Builders Counter */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
          <span className="text-sm font-semibold text-gray-300">Builders checked in:</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {isLoading ? "..." : checkedInCounter}
          </span>
        </div>
      </div>

      {/* Floating Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-8">
        <Link href="/debug" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <BugAntIcon className="h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Debug Contracts</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Tinker with your smart contracts and test functions
              </p>
            </div>
          </div>
        </Link>

        <Link href="/blockexplorer" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <MagnifyingGlassIcon className="h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Block Explorer</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Explore your local blockchain transactions
              </p>
            </div>
          </div>
        </Link>

        <Link href="/builders" passHref>
          <div className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 cursor-pointer h-full flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <UserGroupIcon className="h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Builders</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
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
