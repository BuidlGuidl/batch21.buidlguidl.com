const skillsArray = ["Solidity", "Rust", "TypeScript", "Python"];
export const externalLinks = {
  github: "https://github.com/Parizval",
  twitter: "https://x.com/Parizval_Wizard",
  ctfProfile: "https://ctf.buidlguidl.com/profile/0x7487F73c7D146c26a89415568D9f34D622780e1C",
  polkadotDegree: "https://kodadot.xyz/ahp/gallery/171-27",
};

const personalProjects = [
  {
    heading: "Stylish Lending Hook",
    description: "🪝 A CowSwap Hook which deposits the output Tokens into Lending Protocols.",
    link: "https://ethglobal.com/showcase/stylish-lending-hook-t1c3u",
  },
  {
    heading: "Shadow Protector",
    description: "⏳ Executing Correct DeFi Transaction at the Correct Block.",
    link: "https://github.com/shadow-protector/",
  },
];

export function SkillsComponent() {
  return (
    <div className="mt-2 flex flex-wrap gap-2 justify-center">
      {skillsArray.map((item, index) => (
        <span
          key={index}
          className="text-xs px-2 py-1 rounded-full border border-green-500/50 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProjectsComponent() {
  return (
    <div className="space-y-4">
      {personalProjects.map((data, index) => (
        <div className="rounded-lg border border-cyan-500/20 p-4 bg-white dark:bg-gray-800/40" key={index}>
          <h3 className="font-semibold text-cyan-500 dark:text-cyan-400">{data.heading}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{data.description}</p>
          <a
            href={data.link}
            className="text-xs text-cyan-600 dark:text-cyan-500 hover:underline mt-2 inline-block"
            target="_blank"
            rel="noreferrer"
          >
            View Repo
          </a>
        </div>
      ))}
    </div>
  );
}
