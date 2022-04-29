const main = async () => {

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const RoboPunksNFTFactory = await hre.ethers.getContractFactory("RoboPunksNFT");
  const RoboPunksNFT = await RoboPunksNFTFactory.deploy();

  await RoboPunksNFT.deployed();

  console.log("Contract deployed to:", RoboPunksNFT.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
