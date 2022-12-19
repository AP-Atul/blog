## Testing the contract

We will write few unit tests for important functions, there are more tests we can write to address `reverts`, `events`
and basic functions.

All unit tests code is available [here](/ethereum-fullstack/code/contract/test/test.ts)

1. Start by creating `test.ts` file in the `test` directory.
2. We will be using `chai` and `mocha` to write these tests, along with some help from `hardhat`.
3. Paste the following code to start with.
```ts
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

});
```
The above code creates a fixture `deployFixture`(a function that will deploy the contract and keep the state but will clear the data)
We can reuse this function further in our `it` blocks. The function returns instance of the contract and bunch of accounts.

4. Write test for read functions `name` and `symbol`
```ts
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
```

5. Tests for our `mint` and `transfer` functions
```ts
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
```
