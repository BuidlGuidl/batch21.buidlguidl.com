"use client";

import { BuilderData } from "../types";
import { AcademicCapIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface BatchCardProps {
  contractAddress: `0x${string}`;
  builderData: BuilderData;
}

export const BatchCard = ({ builderData, contractAddress }: BatchCardProps) => {
  const { data: activeBatch } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "isOpen",
  });

  const { data: batchNumber } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "BATCH_NUMBER",
  });

  const { data: allowedList } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [builderData.ethAddress as `0x${string}`],
  });

  const { data: graduated } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "graduationAllowList",
    args: [builderData.ethAddress as `0x${string}`],
  });

  const { data: checkInContract } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [builderData.ethAddress as `0x${string}`],
  });

  // const { data: checkInEvents } = useScaffoldEventHistory({
  //   contractName: "BatchRegistry",
  //   eventName: "CheckedIn",
  //   fromBlock: BigInt(390605585),
  //   filters: { builder: builderData.ethAddress } as EventFilters<"BatchRegistry", "CheckedIn">,
  //   // transactionData: true,
  //   // receiptData: true,
  //   // watch: true,
  // });

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6 w-full">
      <h2 className="text-xl font-bold text-base-content mb-2">{`BuildGuild Batch #${batchNumber}`}</h2>
      <div className="flex flex-col justify-center mb-4">
        <Address address={contractAddress} size="sm" />
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
              <Address address={checkInContract as `0x${string}`} size="xs" />
            </>
          ) : (
            <span>Have not checked in yet</span>
          )}
        </div>
      </div>
    </div>
  );
};
