"use client";

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface GraduationBadgeProps {
  address: `0x${string}`;
}

export const GraduationBadge = ({ address }: GraduationBadgeProps) => {
  const { data: isGraduationAllowed } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "graduationAllowList",
    args: [address],
  });

  if (isGraduationAllowed === undefined) {
    return null;
  }

  return (
    <div className="absolute -top-4 -right-4">
      <div
        className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-all duration-300 ${
          isGraduationAllowed
            ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
            : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 dark:from-gray-600 dark:to-gray-700 dark:text-gray-200"
        }`}
      >
        {isGraduationAllowed ? "✨ Graduated" : "🌱 In Progress"}
      </div>
    </div>
  );
};
