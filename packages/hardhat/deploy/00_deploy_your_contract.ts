import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const BATCH_NUMBER = "21";
const BUILDER_EOA = "0xE9CdfADE5Da8bAFf05C6a8ceD2eE14eEB77111E6"; // your wallet
const ARBITRUM_BATCH_REGISTRY = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B"; // official Arbitrum address (or localhost if testing)

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const isLocal = network.name === "hardhat" || network.name === "localhost";

  let batchRegistryAddress: string;

  if (isLocal) {
    const batch = await deploy("BatchRegistry", {
      from: deployer,
      args: [deployer, BATCH_NUMBER],
      log: true,
      autoMine: true,
    });

    batchRegistryAddress = batch.address;
    log(`✅ Local BatchRegistry => ${batchRegistryAddress}`);

    const registry = await ethers.getContractAt("BatchRegistry", batchRegistryAddress);
    await (await registry.updateAllowList([BUILDER_EOA], [true])).wait();
    log(`✅ Added ${BUILDER_EOA} to local allowList`);
  } else {
    batchRegistryAddress = ARBITRUM_BATCH_REGISTRY;
    log(`✅ Using Arbitrum BatchRegistry => ${batchRegistryAddress}`);
  }

  // === Deploy CheckIn with you as the owner ===
  const checkIn = await deploy("CheckIn", {
    from: deployer,
    args: [batchRegistryAddress, BUILDER_EOA], // registry + your wallet
    log: true,
    autoMine: true,
  });

  log(`✅ CheckIn deployed at => ${checkIn.address}`);
  log(`👑 Owner set to => ${BUILDER_EOA}`);
};

export default func;
func.tags = ["CheckIn"];
