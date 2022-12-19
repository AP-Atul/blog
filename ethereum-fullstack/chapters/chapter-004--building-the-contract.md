## Getting Started with Hardhat

Hardhat is a development environment for Ethereum software. It consists of different components for editing, compiling,
debugging and deploying your smart contracts and dApps.

``CAUTION: This contract is only for demo purpose and not a valid ERC20 compliant contract.``

### Installation

```
npm init -y
npm install --save-dev hardhat
```

Quick start

```
npx hardhat
> answer the questions as per you choice
```

Directory structure

```
contracts -> dir which holds .sol contract files
scripts -> scripts to deploy, run contracts
test -> unit tests 
hardhat.config.ts -> config file for hardhat
```

Try out compiling and testing the sample contract

```
npx hardhat compile
npx hardhat test
```

### Let's build our contract

Our contract will be named as `DMCToken`, set a name as you like. It will have the following functions

`Tokens and Coins will be used interchangebly that both represents the crypto coin named DMC`

```solidity
// function that returns the name of the token 
function name() public view returns(string);

// function that returns the symbol of the token
function symbol() public view returns(string);

// function to create new tokens for a user
function mint(uint) public;

// function to transfer the coin from user account
function transfer(address, uint) public;

// function to update the mint amount
function updateMintAmount(uint) public;
```

and the following storage variables

```solidity
// a mapping to store balances of all accounts
mapping(address => uint) public balances;

// address of the owner of the contract
address public owner;

// variable to store the no of tokens to mint at once
uint public mintAmount;
```

1. Create a file named `DMCToken.sol` in `contracts` directory of your project. You can delete the other generated
   files.
2. Start by defining the compiler version

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
```

3. Write the contract structure and define our storage variables

```solidity
contract DMCToken {
    // a mapping to store balances of all accounts
    mapping(address => uint) public balances;

    // address of the owner of the contract
    address public owner;

    // variable to store the no of tokens to mint at once
    uint public mintAmount;
}
```

4. Let's write our `name` and `symbol` function that will return `DMC Token` and `DMC` which is what we want to name the
   tokens.

```solidity
function name() public pure returns (string memory) {
    return "DMC Token";
}

function symbol() public pure returns (string memory) {
    return "DMC";
}
```

5. The variable `owner` should store the address of the owner, the way we can initialize its
   value is by setting it to `msg.sender` during call of `constructor`

Constructor is called only once in the lifetime of a contract.

```solidity
constructor () {
owner = msg.sender;
mintAmount = 1;
}
```

6. Let's write the `mint` function now which will allow any user to create new token for themselves.
   When any user calls this function the function with add `mintAmount` of tokens to the user's balance
   and update our mapping `balances`.
   We will also emit an event `Transfer` that will log the required values.

```solidity
// log that denote the transfer of `amount` token from `from address` to `to address`
event Transfer(address from, address to, uint amount);

function mint() public {
    // update balance of msg.sender (caller) of the contract
    balances[msg.sender] += mintAmount;
    emit Transfer(address(0), msg.sender, mintAmount);
}
```

7. Now we will write our most important function `transfer` this will help us transfer tokens to other
   users. The logic is simple when a user want to transfer a token, the contract will update balances of both
   the users with updated values.

```solidity
function transfer(address to, uint amount) public {
    // check if `to` is valid user
    require(to != address(0), "transfer to zero address");

    // get balance of the sender
    uint senderBalance = balances[msg.sender];
    
    // check if sender has sufficient balance
    require(senderBalance >= amount, "transfer amount exceeds balance");

    // update balances
    balances[msg.sender] = senderBalance - amount;
    balances[to] += amount;
    
    // emitting the transfer event
    emit Transfer(msg.sender, to, amount);
}
```

8. Let's write the function to update the value of `mintAmount`. This function is updating some critical value of the
   contract, we want this function to be only callable by the `owner` so we will also create modifier `onlyOwner`.

```solidity
modifier onlyOwner () {
    // check if current caller is the owner
    require(msg.sender == owner, "only owner can call function");
    _;
}

function updateMintAmount(uint amount) onlyOwner public {
    require(amount > 0, "mint amount is zero");
    mintAmount = amount;
}
```

### Compiling the contract

```
npx hardhat compile
```

### Next we will write tests for this contract
