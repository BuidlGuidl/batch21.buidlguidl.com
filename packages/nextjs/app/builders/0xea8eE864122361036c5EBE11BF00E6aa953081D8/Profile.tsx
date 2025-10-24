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

const skills = [
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
];

const projects = [
  {
    name: "PrivyAge",
    href: "https://privyage-moca.vercel.app/",
    description: "Privacy-first age verification & content gatekeeping using moca chain.",
  },
  {
    name: "DLMM Backtesting Tool",
    href: "https://dlmm-backtesting-tool.vercel.app/",
    description: "Liquidity backtesting tool for Solana Saros DeFi pools.",
  },
  {
    name: "Press Analytica",
    href: "https://pressanalytica.app/",
    description: "AI-powered analytics platform for publishers.",
  },
  {
    name: "BuidlGuidl #21",
    href: "https://speedrunethereum.com/builders/0xea8eE864122361036c5EBE11BF00E6aa953081D8",
    description: "",
    typing: true,
  },
];

export const Profile = () => {
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
            </div>
          </div>
        </div>

        <section className="text-[16px] leading-relaxed mb-8">
          <p>
            I love how blockchain unlocks new ways to build and collaborate. After years of shipping products, my focus
            is now on Web3 and DeFi creating decentralized, open-source tools that empower developers and real users.
          </p>
        </section>

        <section className="mb-8 text-xl border-t border-[#0b6623]/20 dark:border-[#f7b733]/20 pt-6">
          <h2 className="font-semibold text-[#0b6623] dark:text-[#ffd369] mb-3">
            <span className="text-[#0b6623]/80 dark:text-[#f8d56f]/80">$ cd /jopoepl/projects/</span>
          </h2>

          <div className="space-y-3 text-sm">
            {projects.map((project, index) => (
              <div key={index}>
                <span className="text-[#0b6623] dark:text-[#f8d56f]">-</span>{" "}
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]"
                  >
                    {project.name}
                  </a>
                ) : (
                  <span className="underline hover:text-[#0b6623]/90 dark:hover:text-[#ffd369]">{project.name}</span>
                )}
                {project.typing && <TypingLine />}
                {project.description && <span className="opacity-80"> — {project.description}</span>}
              </div>
            ))}
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

        <footer className="mt-10 text-lg text-[#0b6623] dark:text-[#f7b733]">
          <h2 className="font-semibold text-[#0b6623] dark:text-[#ffd369] mb-3 border-t border-[#0b6623]/20 dark:border-[#f7b733]/20 pt-6 ">
            <span className="text-[#0b6623]/80 dark:text-[#f8d56f]/80 text-xl">$ cd /jopoepl/skills/</span>
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-2 py-[2px] rounded border border-[#0b6623]/30 dark:border-[#f7b733]/30 bg-[#e6f3e8] dark:bg-[#0b0a05] text-[#07360b] dark:text-[#ffd369] transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs opacity-70">
            <span className="text-[#0b6623] dark:text-[#f7b733]">$</span> Keep shipping, Keep learning
            <span className="animate-pulse text-[#0b6623] dark:text-[#f7b733]">█</span>
          </p>
        </footer>
      </div>
    </div>
  );
};
