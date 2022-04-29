// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksNFT is ERC721, Ownable {

  uint256 public mintPrice; // Price on miniting
  uint256 public totalSupply; // Supply in circulation
  uint256 public maxSupply; // Maximum possible supply
  uint256 public maxPerWallet; // Maximum mints per wallet
  bool public isPublicMintEnabled; // Is minting available for everyone
  string internal baseTokenURI; // Token description
  address payable public withdrawWallet; // Which wallet can withdraw money made from minting
  mapping(address => uint256) public walletMints; // Keeping track of mints per each wallet

  constructor() payable ERC721('RoboPunksNFT', 'RP') {

    // We set values to our variables in contructor for cost reduction

    mintPrice = 0.001 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    // set withdrawWallet address
  }

  // Only the address that deployed this contract can change if mint is enables or not

  function setIfPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  // Setting token description (image)

  function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  // There is already a tokenURI function in ERC721, but since we need to define out baseTokenURI, we also need to override the existing function to call correct variable

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "Token does exists");

    // We are returning URI, putting it's ID in front of it and making it .json
    // This allows OpenSea to grab every single URL of images

    return string(abi.encodePacked(baseTokenURI, Strings.toString(_tokenId), ".json"));
  }

  function withdraw() external onlyOwner {

    // Successful result will take the balance of this contract and withdraw (call) it to withdrawWallet

    (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
    require(success, "Withdraw failed");
  }

  // Mint function is the most valuable part of smart contract, so all types of checks should be in place

  function mint(uint256 _quantity) public payable {
    require(isPublicMintEnabled, "Mint is not enabled"); // Making sure that minting is enabled
    require(msg.value == _quantity * mintPrice, "Incorrect mint value"); // Making sure user is inputting correct amount of ether
    require(totalSupply + _quantity <= maxSupply, "Sold out"); // Making sure that we don't mint over max supply
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, "Exceeded mints per wallet"); // Making sure that no one address could mint more than 3 NFTs

    for (uint256 i = 0; i < _quantity; i++) {

      // We need to make checks before the actual mint (check interaction pattern) to avoid reentrance attacks

      uint256 newTokenId = totalSupply + 1;
      totalSupply++;
      _safeMint(msg.sender, newTokenId); // _safeMint is a function in ERC721
    }
  }
}
