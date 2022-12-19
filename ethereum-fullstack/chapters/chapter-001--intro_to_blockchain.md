### What is Blockchain

A blockchain is a public database that is updated and shared across many computers in a network.
"Block" refers to data and state being stored.

Every computer in the network must agree upon each new block and the chain as a whole. These computers are known as "
nodes".
Nodes ensure everyone interacting with the blockchain has the same data. To accomplish this distributed agreement,
blockchains need a consensus mechanism.

Ethereum currently uses a proof-of-work consensus mechanism. This means that anyone who wants to add new blocks to the
chain must solve a difficult puzzle that requires a lot of computing power.

### What is Ethereum

In the Ethereum universe, there is a single, canonical computer (called the Ethereum Virtual Machine, or EVM) whose
state
everyone on the Ethereum network agrees on. Everyone who participates in the Ethereum network (every Ethereum node)
keeps
a copy of the state of this computer.

When a request for state change is broadcast, other participants on the network verify, validate, and carry out ("
execute")
the computation. This execution causes a state change in the EVM, which is committed and propagated throughout the
entire network.

Requests for computation are called transaction requests; the record of all transactions and the EVM's present state
gets
stored on the blockchain, which in turn is stored and agreed upon by all nodes.

![evm](https://ethereum.org/static/e8aca8381c7b3b40c44bf8882d4ab930/302a4/evm.png)

### Consensus Mechanism

- In proof-of-work, miners prove they have capital at risk by expending energy.
- In proof-of-stake, validators explicitly stake capital in the form of ether into a smart contract on Ethereum.
  This staked ether then acts as collateral that can be destroyed if the validator behaves dishonestly or lazily.

### What is ETH?

Ether (ETH) is the cryptocurrency on the Ethereum network. Fundamentally, it is the only acceptable form of payment for
transaction fees.
Ethereum allows developers to create decentralized applications (dapps), where ETH is the primary currency used for
interactions.

#### Minting

Ether is minted when a miner creates a block on the Ethereum blockchain. As an incentive to miners, the protocol grants
a reward in each block, incrementing the balance of an address set by the block's miner. The block reward has changed
over time, and today it is 2 ETH per block.

#### Burning

As well as creating ether through block rewards, ether can get destroyed by a process called 'burning'. When ether gets
burned, it gets removed from circulation permanently.
Ether burn occurs in every transaction on Ethereum. When users pay for their transactions, a base gas fee, set by the
network according to transactional demand, gets destroyed.

### What are smart contracts?

A "smart contract" is simply a program that runs on the Ethereum blockchain. It's a collection of code (its functions)
and data (its state) that resides at a specific address on the Ethereum blockchain.
Smart contracts are immutable, which means that once they are deployed on the blockchain they cannot be changed.
To overcome this, there are other solutions for upgradability like proxy contracts.
Openzeppelin provides basic implementations and set of abstract contracts which can be used/extended to develop dapps.

### Account

An Ethereum account is an entity with an ether (ETH) balance that can send transactions on Ethereum. Accounts can be
user-controlled or deployed as smart contracts. An account is not a wallet. An account is the key pair for a user-owned
Ethereum account. A wallet is an interface or application that lets you interact with your Ethereum account.

MetaMask is the trailblazing tool enabling user interactions and experience on Web3. It is currently available as a
browser extension and as a mobile app on both Android and iOS devices.
MetaMask allows users to manage accounts and their keys in a variety of ways, including hardware wallets, while
isolating
them from the site context. This is a great security improvement over storing the user keys on a single central server,
or even in local storage, which can allow for mass account thefts

### Transaction

Transactions are cryptographically signed instructions from accounts. An account will initiate a transaction to update
the state of the Ethereum network. The simplest transaction is transferring ETH from one account to another.

- Transaction changes the state of the EVM.
- Transactions need to be broadcast to the whole network. Any node can broadcast a request for a transaction to be
  executed on the EVM; after this happens, a miner will execute the transaction and propagate the resulting state
  change to the rest of the network.
- Transactions require a fee and must be mined to become valid.

### WEB2 VS WEB3

- Web3 is decentralized: instead of large wrappers of the internet controlled and owned by centralized entities,
  ownership gets distributed amongst its builders and users.
- Web3 is permissionless: everyone has equal access to participate in Web3, and no one gets excluded.
- Web3 has native payments: it uses cryptocurrency for spending and sending money online instead of relying on the
  outdated infrastructure of banks and payment processors.
- Web3 is trustless: it operates using incentives and economic mechanisms instead of relying on trusted third-parties.

### Layer 2 (L2)

Layer 2 (L2) is a collective term to describe a specific set of Ethereum scaling solutions. A layer 2 is a separate
blockchain that extends Ethereum and inherits the security guarantees of Ethereum.
Transaction speed suffers when the network is busy, making the user experience poor for certain types of dapps. And as
the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using
Ethereum very expensive.

#### Rollups

Rollups perform transaction execution outside layer 1 and then the data is posted to layer 1 where consensus is reached.
As transaction data is included in layer 1 blocks, this allows rollups to be secured by native Ethereum security.

### Web 3 Stack

<img width="100%" src="https://edgeandnode.com/images/web3-stack.jpg" alt="web3 stack">
