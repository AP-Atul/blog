import { ethers } from "hardhat";

async function main() {
  const DMCToken = await ethers.getContractFactory("DMCToken");
  const token = await DMCToken.deploy();
  await token.deployed();
  console.log(`DMCToken deployed to ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
