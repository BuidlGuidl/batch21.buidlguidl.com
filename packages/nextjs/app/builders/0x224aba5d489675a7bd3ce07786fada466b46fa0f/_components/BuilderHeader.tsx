"use client";

import { BuilderConfig } from "../types";
import { SocialLinks } from "./SocialLinks";
import { getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { AddressCopyIcon } from "~~/components/scaffold-eth/Address/AddressCopyIcon";
import { AddressLinkWrapper } from "~~/components/scaffold-eth/Address/AddressLinkWrapper";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

interface BuilderHeaderProps {
  builderConfig: BuilderConfig;
}

export const BuilderHeader = ({ builderConfig }: BuilderHeaderProps) => {
  const checkSumAddress = (
    builderConfig.ethAddress ? getAddress(builderConfig.ethAddress) : undefined
  ) as `0x${string}`;

  const { targetNetwork } = useTargetNetwork();

  const { data: ens, isLoading: isEnsNameLoading } = useEnsName({
    address: checkSumAddress,
    chainId: 1,
    query: {
      enabled: isAddress(checkSumAddress ?? ""),
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ens ? normalize(ens) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ens),
      gcTime: 30_000,
    },
  });

  const shortAddress = checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4);
  const blockExplorerAddressLink = getBlockExplorerAddressLink(targetNetwork, checkSumAddress);

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6 w-full">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-base-300 flex items-center justify-center">
          <BlockieAvatar address={checkSumAddress} ensImage={ensAvatar} size={(40 * 24) / 8} />
        </div>

        {/* Name/ENS and Address */}
        <div className="flex flex-col">
          {isEnsNameLoading ? (
            <div className={`ml-1.5 skeleton rounded-lg font-bold text-sm`}>
              <span className="invisible">{shortAddress}</span>
            </div>
          ) : (
            <span className={`ml-1.5 text-sm font-bold`}>
              <AddressLinkWrapper
                disableAddressLink={true}
                blockExplorerAddressLink={ens ? blockExplorerAddressLink : ""}
              >
                {ens || builderConfig.handleToSocials.github}
              </AddressLinkWrapper>
            </span>
          )}
          <div className="flex">
            <span className={`ml-1.5 text-[11px] font-normal`}>
              <AddressLinkWrapper blockExplorerAddressLink={blockExplorerAddressLink}>
                {shortAddress}
              </AddressLinkWrapper>
            </span>
            <AddressCopyIcon className={`ml-1.5 h-4 w-4 cursor-pointer`} address={checkSumAddress} />
          </div>
        </div>

        {/* Social Links */}
        <div className="w-full">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};
