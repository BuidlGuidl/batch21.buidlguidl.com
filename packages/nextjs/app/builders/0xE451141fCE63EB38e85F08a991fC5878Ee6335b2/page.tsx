import Image from "next/image";
import Link from "next/link";
import { ProjectsComponent, SkillsComponent, externalLinks } from "./Components";
import type { Metadata, NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

export const metadata: Metadata = {
  title: "Parizval — Batch #21",
  description: "Builder page for Batch #21",
};

const ADDRESS = "0xE451141fCE63EB38e85F08a991fC5878Ee6335b2";

const ParizvalPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-300 font-mono p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <section className="md:col-span-1 space-y-6">
          <div className="rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 p-6 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://avatars.githubusercontent.com/u/48042530?v=4"
                alt="avatar"
                width={120}
                height={120}
                className="w-32 h-32 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
              />
              <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-300 mt-4">Parizval</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Batch #21 — Builder</p>
              <div className="mt-2">
                <Address address={ADDRESS} />
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">DeFi Wizard</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Learning Core Protocol Development and Pushing Ethereum Towards Interoperability.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-sm uppercase tracking-wider text-cyan-500 dark:text-cyan-400 text-center">
                Tech stack
              </h2>
              <SkillsComponent />
            </div>

            <div className="mt-6 border-t border-cyan-500/20 pt-4">
              <h3 className="font-medium text-cyan-600 dark:text-cyan-300 text-center">Links</h3>
              <ul className="mt-2 space-y-2 text-sm text-center">
                <li>
                  <a
                    className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-200 hover:underline"
                    href={externalLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub Profile
                  </a>
                </li>
                <li>
                  <a
                    className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-200 hover:underline"
                    href={externalLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    X/Twitter
                  </a>
                </li>
                <li>
                  <Link
                    className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-200 hover:underline"
                    href="/"
                  >
                    Batch Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-200 hover:underline"
                    href="/debug"
                  >
                    Debug Tools
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <section className="md:col-span-2">
          <div className="rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 p-6 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-300 mb-4">Web3 Projects Portfolio</h2>
            <ProjectsComponent />
          </div>
          <div className="rounded-2xl mt-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 p-6 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-300 mb-4">BuidlGuidl CTF</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-cyan-500/20 p-4 bg-white dark:bg-gray-800/40">
                <h3 className="font-semibold text-cyan-500 dark:text-cyan-400">
                  🚩 Capture 10 Flags by solving 10 Solidity puzzles
                </h3>
                <a
                  href={externalLinks.ctfProfile}
                  className="text-xs text-cyan-600 dark:text-cyan-500 hover:underline mt-2 inline-block"
                  target="_blank"
                  rel="noreferrer"
                >
                  View my CTF profile
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl mt-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 p-6 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-300 mb-4">Education</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-cyan-500/20 p-4 bg-white dark:bg-gray-800/40">
                <h3 className="font-semibold text-cyan-500 dark:text-cyan-400">
                  🎓 Completed Polkadot Blockchain Academy Course at NUS,Singapore
                </h3>
                <a
                  href={externalLinks.polkadotDegree}
                  className="text-xs text-cyan-600 dark:text-cyan-500 hover:underline mt-2 inline-block"
                  target="_blank"
                  rel="noreferrer"
                >
                  View my Digital Degree
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ParizvalPage;
