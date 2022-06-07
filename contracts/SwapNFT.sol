// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SwapNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('SwapNFT', 'SNFT'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdrawWallet address
    }

    function setIsPublicMintEnabled( bool isPublicMintEnabled_ ) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    // calldata is like a writable memory
    function setBaseTokenUri( string calldata baseTokenUri_ ) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    // to override and custom tokenURI func that was already privided by ERC721
    function tokenURI( uint256 tokenId_ ) public view override returns (string memory) {
        require(_exists(tokenId_), 'token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json" )); 
    }

    // .call -> low level function. 
    // withdraw the funds to the address we specified -> address(this)
    function withDraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quatity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quatity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quatity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quatity_ <= maxPerWallet, 'exceed max of a wallet can mint');

        for (uint256 i = 0; i < quatity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++; // note: check effects interaction pattern- do most things before interact _safeMint. to prevent reentrancy attack.
            _safeMint(msg.sender, newTokenId);
        }
    }

}