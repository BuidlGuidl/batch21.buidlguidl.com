import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// Update with your Batch number
const BATCH_NUMBER = "21";

// BatchRegistry address on Arbitrum (already deployed)
const ARBITRUM_BATCH_REGISTRY_ADDRESS = "0x23E4943145668C06B55Bbc7cDEEEc6353687305B";

/**
 * Deploys a contract named "deployYourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const chainId = await hre.getChainId();

  let batchRegistryAddress = ARBITRUM_BATCH_REGISTRY_ADDRESS;

  // Deploy BatchRegistry only on local networks (hardhat, localhost)
  if (chainId === "31337") {
    console.log("\n🔨 Deploying BatchRegistry locally...");
    await deploy("BatchRegistry", {
      from: deployer,
      // Contract constructor arguments
      args: [deployer, BATCH_NUMBER],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });

    // Get the deployed contract to interact with it after deploying.
    const batchRegistry = await hre.ethers.getContract<Contract>("BatchRegistry", deployer);
    batchRegistryAddress = await batchRegistry.getAddress();
    console.log("BatchRegistry deployed to:", batchRegistryAddress);
    console.log("Remember to update the allow list!\n");

    // The GraduationNFT contract is deployed on the BatchRegistry constructor.
    const batchGraduationNFTAddress = await batchRegistry.batchGraduationNFT();
    console.log("BatchGraduation NFT deployed to:", batchGraduationNFTAddress);

    // Update allow list locally to include deployer
    console.log("\n🔑 Adding deployer to allow list...");
    const tx = await batchRegistry.updateAllowList([deployer], [true]);
    await tx.wait();
    console.log("✅ Deployer added to allow list!\n");
  } else {
    console.log("\n📝 Using existing BatchRegistry on Arbitrum:", ARBITRUM_BATCH_REGISTRY_ADDRESS);
  }

  // Deploy CheckIn contract
  console.log("\n🔨 Deploying CheckIn contract...");
  await deploy("CheckIn", {
    from: deployer,
    // Contract constructor arguments - BatchRegistry address
    args: [batchRegistryAddress],
    log: true,
    autoMine: true,
  });

  // Get the deployed CheckIn contract
  const checkIn = await hre.ethers.getContract<Contract>("CheckIn", deployer);
  console.log("CheckIn contract deployed to:", await checkIn.getAddress());
  console.log("✅ Deployment complete!\n");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["BatchRegistry", "CheckIn"];
