// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DMCToken {
    // a mapping to store balances of all accounts
    mapping(address => uint) public balances;

    // address of the owner of the contract
    address public owner;

    // variable to store the no of tokens to mint at once
    uint public mintAmount;

    event Transfer(address from, address to, uint amount);

    modifier onlyOwner () {
        // check if current caller is the owner
        require(msg.sender == owner, "only owner can call function");
        _;
    }

    constructor () {
        // setting owner to the person who deployed this contract
        owner = msg.sender;

        // only 1 token be minted for mint function
        mintAmount = 1;
    }

    function name() public pure returns (string memory) {
        return "DMC Token";
    }

    function symbol() public pure returns (string memory) {
        return "DMC";
    }

    function mint() public {
        // update balance of msg.sender (caller) of the contract
        balances[msg.sender] += mintAmount;
        emit Transfer(address(0), msg.sender, mintAmount);
    }

    function transfer(address to, uint amount) public {
        require(to != address(0), "transfer to zero address");

        // get balance of the sender
        uint senderBalance = balances[msg.sender];
        require(senderBalance >= amount, "transfer amount exceeds balance");

        // update balances
        balances[msg.sender] = senderBalance - amount;
        balances[to] += amount;

        // emitting the transfer event
        emit Transfer(msg.sender, to, amount);
    }

    function updateMintAmount(uint amount) onlyOwner public {
        require(amount > 0, "mint amount is zero");
        mintAmount = amount;
    }
}
