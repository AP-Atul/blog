### Solidity

Solidity is an `object-oriented`, high-level language for implementing smart contracts. Smart contracts are programs
which
govern the behaviour of accounts within the Ethereum state.

Solidity is a curly-bracket language designed to target the Ethereum Virtual Machine (EVM). It is influenced by C++,
Python and JavaScript.

Solidity is `statically typed`, supports inheritance, libraries and complex user-defined types among other features.

### Layout of Solidity file

1. SPDX License Identifier

This is added at the `top` of the solidity file as given below, it denotes that the solidity contract is defined
under which license

```solidity
// SPDX-License-Identifier: <LICENSE-TYPE>
```

Example MIT license can be defined as

``` solidity
// SPDX-License-Identifier: MIT
```

2. Pragma

The `pragma` keyword is used to enable certain compiler features and can be used to define the compiler version to run
the
code with.

```solidity
// this contract with support compiler with version 0.8.9 and greater
pragma solidity ^0.8.9;
```

3. Commands

Similar to C

```solidity
// this is single line comment
/*
this is a 
multiline comment
*/
```

### Structure of Contract

1. State Variables

This are variables whose values are permanently stored in contract storage. See [visibility](https://docs.soliditylang.org/en/v0.8.17/contracts.html#visibility-and-getters)
for more info on visibility of variables.

```solidity
contract SimpleStorage {
    uint storedData;
}
```

2. Functions

These are executable piece of code. They are usually defined inside a contract, but can also be defined outside contracts
which can be used to build libraries.

```solidity
contract SimpleFunctionExample {
    function mint() public payable {
        // some logic
    }
}

// helper function
function helper(uint x) public returns (uint) {
    return x * 2;
}
```

3. Function modifier

Function modifiers can be used to amend the semantics of functions in a declarative way. Mostly used to add restrictions
to a function, like only the owner should be able to call a function

```solidity
contract SimpleSecure {
    address public owner = "0x00023"; // owner address
    
    modifier onlyOwner () {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    function purchase() public onlyOwner {
        // some logic
    }
}
```

In the above contract we defined a modifier `onlyOwner` that is resposible to check if `msg.sender` which is the 
account of the person who initiated the transaction, to be equal to `owner`'s address. Due to the `onlyOwner` modifier
only the owner can call the function `purchase()`.

4. Events

Events provider a way to log values in EVM.

```solidity
contract SimpleEvent {
    event Mint(address owner, uint token);
    
    function mint() public payable {
        emit Mint(msg.sender, 1);
    }
}
```

In the above contract, the event `Mint` is emitted every time the function `mint` is called with values `msg.sender`
and `token` whose values are defined by the function.

5. Errors

Errors allow you to define descriptive names and data for failure situations

```solidity

error NotEnoughFunds(uint requested, uint available);

contract SimpleToken {
    mapping(address => uint) balances;
    
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount) {
            revert NotEnoughFunds(amount, balance);
        }
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // ...
    }
}
```

### Types

More in details [types](https://docs.soliditylang.org/en/v0.8.17/types.html)

```
bool b = true, false;
int, uint = int8 -> int256, uint8 -> uint256;
address 
bytes = bytes1, bytes2, ... bytes32
string
enum
    enum Action { Up, Down, Left, Right }
mapping = <key, value> pair
struct 
    struct Point { uint x, uint y };
```
