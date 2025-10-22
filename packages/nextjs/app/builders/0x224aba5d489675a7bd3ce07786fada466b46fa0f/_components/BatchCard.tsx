"use client";

import { BuilderConfig } from "../types";
import { AcademicCapIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface BatchCardProps {
  builderConfig: BuilderConfig;
}

export const BatchCard = ({ builderConfig }: BatchCardProps) => {
  const { data: activeBatch, isPending: isActiveBatchPending } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "isOpen",
  });

  const { data: batchNumber, isPending: isBatchNumberPending } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "BATCH_NUMBER",
  });

  const { data: allowedList, isPending: isAllowedListPending } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [builderConfig.ethAddress],
  });

  const { data: graduated, isPending: isGraduatedPending } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "graduationAllowList",
    args: [builderConfig.ethAddress],
  });

  const { data: checkInContract, isPending: isCheckInContractPending } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [builderConfig.ethAddress],
  });

  const isLoading =
    isActiveBatchPending ||
    isBatchNumberPending ||
    isAllowedListPending ||
    isGraduatedPending ||
    isCheckInContractPending;

  if (isLoading) {
    return (
      <div className="bg-base-100 rounded-3xl shadow-md p-6 w-full">
        {/* Skeleton for title */}
        <div className="h-6 bg-base-300 rounded-lg animate-pulse mb-2 w-48"></div>

        {/* Skeleton for address and status */}
        <div className="flex flex-col justify-center mb-4">
          <div className="h-4 bg-base-300 rounded animate-pulse mb-2 w-32"></div>
          <div className="h-4 bg-base-300 rounded animate-pulse w-24"></div>
        </div>

        <div className="w-full h-px bg-base-300 mb-4"></div>

        {/* Skeleton for status indicators */}
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 bg-base-300 rounded animate-pulse"></div>
            <div className="h-4 bg-base-300 rounded animate-pulse w-20"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 bg-base-300 rounded animate-pulse"></div>
            <div className="h-4 bg-base-300 rounded animate-pulse w-20"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 bg-base-300 rounded animate-pulse w-24"></div>
            <div className="h-3 bg-base-300 rounded animate-pulse w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6 w-full">
      <h2 className="text-xl font-bold text-base-content mb-2">{`BuildGuild Batch #${batchNumber}`}</h2>
      <div className="flex flex-col justify-center mb-4">
        <Address address={builderConfig.batchContractAddress} size="sm" />
        <span>{activeBatch ? "🟢 In-progress" : "🔴 Finished"}</span>
      </div>
      <div className="w-full h-px bg-base-300 mb-4"></div>
      <div className="flex flex-row items-center gap-2"></div>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col items-center gap-2">
          <a title="Enrolled">
            <PencilSquareIcon className="h-5 w-5" />
          </a>
          <span>Enrolled: {allowedList ? "✅" : "❌"}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <a title="Graduated">
            <AcademicCapIcon className="h-5 w-5" />
          </a>
          <span>Graduated: {graduated ? "✅" : "❌"}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          {checkInContract ? (
            <>
              <span>Check in contract:</span>
              <Address address={checkInContract} size="xs" />
            </>
          ) : (
            <span>Have not checked in yet</span>
          )}
        </div>
      </div>
    </div>
  );
};
