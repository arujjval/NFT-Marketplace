// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TEA1 is ERC721 {
    address public owner;
    string public tokenURI = "ipfs://QmT9fASkfW4vs786bvuZM5Rmia2mYMWXAVkSPXCjQ2Qvmw/metadata.json";
    uint256 tokenMinted = 0;

    constructor() ERC721("NF-Tea 1", "TEA1"){
        owner = msg.sender;
    }

    function mint() public payable {
        tokenMinted += 1;

        _mint(msg.sender, tokenMinted);
    } 

    function mint(address _to) public payable {
        tokenMinted += 1;

        _mint(_to, tokenMinted);
    } 

    function getTokenURI() public view returns (string memory){
        return tokenURI;
    }
}
