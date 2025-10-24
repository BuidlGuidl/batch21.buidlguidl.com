import { ErrorBoundary } from "./ErrorBoundary";
import { ProfileAvatar } from "./ProfileAvatar";
import { socialLinks } from "./SocialIcons";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const DiegoBianquiPageContent: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="group relative w-full max-w-3xl rounded-2xl border border-slate-900/50 dark:border-white/10 bg-slate-800/45 dark:bg-white/5 hover:bg-slate-800/65 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 px-6 py-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex flex-col items-center text-center gap-8 text-white">
          {/* Profile */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border border-slate-900/40 dark:border-white/20 bg-slate-800/45 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ProfileAvatar address="0x8D2d6d1A115702FDbFd5704D8b626014E3028C23" size={128} />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-semibold text-white dark:text-white [text-shadow:0_0_16px_rgba(148,163,184,0.85)] dark:[text-shadow:none]">
                Diego
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800/45 dark:bg-white/10 border border-slate-900/50 dark:border-white/10 font-mono text-xs text-white dark:text-blue-200 [text-shadow:0_0_14px_rgba(148,163,184,0.8)] dark:[text-shadow:none]">
                <Address
                  address="0x8D2d6d1A115702FDbFd5704D8b626014E3028C23"
                  format="short"
                  size="xs"
                  onlyEnsOrAddress
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full text-left space-y-3">
            <h2 className="text-xl font-semibold text-white dark:text-white [text-shadow:0_0_16px_rgba(148,163,184,0.85)] dark:[text-shadow:none]">
              About
            </h2>
            <p className="text-white dark:text-gray-300 leading-relaxed [text-shadow:0_0_12px_rgba(148,163,184,0.75)] dark:[text-shadow:none]">
              Former Software Engineering Manager at Accenture, now specializing in Web3/blockchain software
              development. With over a decade of experience delivering IT consulting services across diverse industries,
              I have led teams in web development, cloud architecture, and Python solutions.
            </p>
          </div>

          {/* Social Links */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-wide text-white dark:text-gray-400 [text-shadow:0_0_14px_rgba(148,163,184,0.75)] dark:[text-shadow:none]">
              <span className="h-px w-10 bg-slate-100/40 dark:bg-white/10" />
              Connect
              <span className="h-px w-10 bg-slate-100/40 dark:bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/icon relative h-12 w-12 flex items-center justify-center rounded-full border border-slate-900/50 dark:border-white/10 bg-slate-800/45 dark:bg-white/5 hover:bg-slate-800/65 dark:hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 text-white dark:text-blue-300 hover:text-white dark:hover:text-blue-200 [filter:drop-shadow(0_0_14px_rgba(148,163,184,0.75))] dark:[filter:none]"
                    title={social.title}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiegoBianquiPage: NextPage = () => {
  return (
    <ErrorBoundary>
      <DiegoBianquiPageContent />
    </ErrorBoundary>
  );
};

export default DiegoBianquiPage;
