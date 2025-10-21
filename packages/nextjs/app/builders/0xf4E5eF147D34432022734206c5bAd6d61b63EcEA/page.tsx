"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const SOCIAL_LINKS = [
  { href: "https://github.com/letmehateu", label: "GitHub", icon: "💻" },
  { href: "https://x.com/hatedetah", label: "X", icon: "𝕏" },
  { href: "https://t.me/letmehateu", label: "Telegram", icon: "✈️" },
];

const LetmehateUPage: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-base-300 via-base-200 to-base-100">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="card bg-base-100 shadow-2xl border-2 border-primary/20">
          <div className="card-body p-8 md:p-12">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src="/avatars/letmehateu-avatar.jpg"
                    alt="letmehateu avatar"
                    className="w-full h-full object-cover rounded-full"
                    onError={e => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="bg-primary text-primary-content rounded-full w-full h-full flex items-center justify-center"><span class="text-4xl font-bold">LH</span></div>';
                      }
                    }}
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                letmehateu
              </h1>
              <div className="flex justify-center mb-4">
                <Address address="0xf4E5eF147D34432022734206c5bAd6d61b63EcEA" size="sm" />
              </div>
            </div>

            {/* Bio Section */}
            <div className="text-center mb-8">
              <div className="p-6 rounded-lg bg-base-200">
                <h3 className="text-lg font-semibold mb-4 text-base-content/90">About Me</h3>
                <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
                  Passionate Web3 developer building the future of decentralized applications. Always exploring new
                  technologies and pushing the boundaries of what`s possible on-chain. Currently focused on smart
                  contracts and DeFi protocols.
                </p>
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                  <span className="badge badge-primary">Solidity</span>
                  <span className="badge badge-secondary">Web3</span>
                  <span className="badge badge-accent">DeFi</span>
                  <span className="badge badge-neutral">Blockchain</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Connect</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {SOCIAL_LINKS.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary gap-2 hover:scale-110 transition-transform"
                  >
                    <span>{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="text-center mt-8 pt-6 border-t border-base-300">
              <p className="text-sm text-base-content/60 italic">
                &quot;In code we trust, in blockchain we build&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-base-content/50 text-sm">
            Part of{" "}
            <Link href="https://buidlguidl.com" className="link link-primary" target="_blank">
              BuidlGuidl
            </Link>{" "}
            Batch 21
          </p>
        </div>
      </div>
    </div>
  );
};

export default LetmehateUPage;
