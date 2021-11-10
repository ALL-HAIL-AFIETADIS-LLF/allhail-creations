// SPDX-License-Identifier: GPL-3.0

// Amended by @MyReceipt
/**
    !Disclaimer!
    #selitekk... These contracts were created for the purpose to deploy The King's NFT: B2C1 - Anthropophobia Viruses smart contracts on the blockchain. #isokngonoyoo?!?
    
    The King's NFT: B2C1 - Anthropophobia Viruses is an NFT project by @MyMyReceipt. The 1st collection from the 2nd batch (B2/C1), also the 1st programmatically generated NFT collection of twelve thousand (12k) unique Abstract Scribbles of the Anthropophobia Viruses, each one verified unique. All abstract scribble layers are made by @MyReceipt's son. #mengeruikhans!!!
    
    The complete story can be read here: https://github.com/the-aha-llf/the-kings-nft/wiki/The-Project

    @MyReceipt - AMK - AHA. LLF.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "#selitekk... This function is restricted to the contract's owner. #isokngonoyoo?!?!"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
