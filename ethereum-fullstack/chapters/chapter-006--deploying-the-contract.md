## Deploying the contract

We will now deploy the contracts on the local node as well as on the polygon testnet.

### Deploy to local node

1. Run the local node
```
npx hardhat node
```
This will give you info about the node and bunch of wallet addresses which we will be using soon.

2. First we will need an account to deploy with, let get it from the node we just started. Create a `.env` file and
paste the values.
```
// .env
PRIVATE_KEY=<PASTE_PRIVATE_KEY> 
ACCOUNT_ADDRESS=<PASTE_ACCOUNT_ADDR>
```

3. Install `dotenv`, it will help us to read the `.env` file
```
npm install --save-dev dotenv
```

4. Update the main function in `deploy.ts` code to following
```ts
async function main() {
  const DMCToken = await ethers.getContractFactory("DMCToken");
  const token = await DMCToken.deploy();
  await token.deployed();
  console.log(`DMCToken deployed to ${token.address}`);
}
```
To make sure we deploy the contract from specific address we need to update `hardhat.config.ts` file to
```ts
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",  // address of local node
      accounts: [process.env.PRIVATE_KEY], // our private key from `.env` file
    }
  }
};
```

5. Deploy the contract by starting the local node and running the script

```
# terminal 1
npx hardhat node

# terminal 2
npx hardhat run scripts/deploy.ts --network localhost

# it will output the address like so
DMCToken deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Congratulations you have successfully deployed to localhost.

### Deploy the polygon testnet

1. Update the `.env` with one of your real accounts from metamask. 
2. Add `TESTNET_RPC` to `.env` with the url from Alchemy dashboard.
3. Update the `hardhat.config.ts` file with the testnet values
```ts
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [process.env.PRIVATE_KEY],
    },
    testnet: {
      url: process.env.TESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
```
4. Deploy the contract running the deployment script

```
npx hardhat run scripts/deploy.ts --network testnet

# it will output the address like so
DMCToken deployed to 0x841Aaf3Bbac6bFEcD6Ed7eDC7006b86dDD57E7F3

```
