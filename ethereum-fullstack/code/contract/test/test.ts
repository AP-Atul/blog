import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {BigNumber} from "ethers";

describe("DMCToken", () => {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  const deployFixture = async () => {
    const [owner, otherAccount] = await ethers.getSigners();
    const DMCToken = await ethers.getContractFactory("DMCToken");
    const dmcToken = await DMCToken.connect(owner).deploy(); // connecting owner to contract
    return { dmcToken, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("should deploy the contract with right owner", async () => {
      const { dmcToken, owner } = await loadFixture(deployFixture);
      expect(await dmcToken.owner()).to.eql(owner.address);
    });

    it("should set the mint amount value set to 1", async () => {
      const { dmcToken } = await loadFixture(deployFixture);
      expect(await dmcToken.mintAmount()).to.eql(BigNumber.from(1));
    });
  });

  describe("Read functions", () => {
    it("should return the name of the token", async () => {
      const {dmcToken} = await loadFixture(deployFixture);
      expect(await dmcToken.name()).to.eql("DMC Token");
    });

    it("should return the symbol of the token", async () => {
      const {dmcToken} = await loadFixture(deployFixture);
      expect(await dmcToken.symbol()).to.eql("DMC");
    });
  });

  describe("Mint and Transfer", () => {
    it("should mint one token to an account", async () => {
      const { dmcToken, owner, otherAccount } = await loadFixture(deployFixture);
      const tx = await dmcToken.connect(otherAccount).mint();
      await tx.wait();
      expect(await dmcToken.balances(otherAccount.address)).to.eql(BigNumber.from(1));
      expect(await dmcToken.balances(owner.address)).to.eql(BigNumber.from(0));
    });

    it("should transfer a token to other account", async () => {
      const { dmcToken, owner, otherAccount } = await loadFixture(deployFixture);
      let tx = await  dmcToken.connect(owner).mint();
      await tx.wait();
      expect(await dmcToken.balances(owner.address)).to.eql(BigNumber.from(1));

      tx = await dmcToken.connect(owner).transfer(otherAccount.address, 1);
      await tx.wait();
      expect(await dmcToken.balances(owner.address)).to.eql(BigNumber.from(0));
      expect(await dmcToken.balances(otherAccount.address)).to.eql(BigNumber.from(1));
    });
  });

  describe("Update mint amount", () => {
    it("should allow the owner to update the mint amount", async () => {
      const { dmcToken, owner } = await loadFixture(deployFixture);
      expect(await dmcToken.mintAmount()).to.eql(BigNumber.from(1));
      const tx = await dmcToken.connect(owner).updateMintAmount(10);
      await tx.wait();
      expect(await dmcToken.mintAmount()).to.eql(BigNumber.from(10));
    });
  })

  describe("Reverts", () => {
    it("should fail to transfer due to zero to address", async () => {
      const { dmcToken, owner } = await loadFixture(deployFixture);
      await expect(
          dmcToken.connect(owner).transfer(ZERO_ADDRESS, 1)
      ).to.revertedWith("transfer to zero address");
    });
    it("should fail to transfer when the balance is not sufficient", async () => {
      const { dmcToken, owner, otherAccount } = await loadFixture(deployFixture);
      await expect(
          dmcToken.connect(owner).transfer(otherAccount.address, 1)
      ).to.revertedWith("transfer amount exceeds balance");
    });
    it("should fail when a non owner account calls, update function", async () => {
      const { dmcToken, otherAccount } = await loadFixture(deployFixture);
      await expect(
          dmcToken.connect(otherAccount).updateMintAmount(10)
      ).to.revertedWith("only owner can call function");
    });
  });

  describe("Events", () => {
    it("should emit transfer event on mint", async () => {
      const { dmcToken, owner } = await loadFixture(deployFixture);
      await expect(
          dmcToken.connect(owner).mint()
      ).to.emit(dmcToken, "Transfer").withArgs(
          ZERO_ADDRESS, owner.address, 1
      );
    });
    it("should emit transfer event on transfer function call", async () => {
      const { dmcToken, owner, otherAccount } = await loadFixture(deployFixture);
      const tx = await dmcToken.connect(owner).mint();
      await tx.wait();
      await expect(
          dmcToken.connect(owner).transfer(otherAccount.address, 1)
      ).to.emit(dmcToken, "Transfer").withArgs(
          owner.address, otherAccount.address, 1
      );
    });
  });
});
