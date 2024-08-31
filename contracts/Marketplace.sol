// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface nftContract {
   function mint(address _to) external payable;   
   function getTokenURI() external returns(string memory); 
}

contract Marketplace {
   struct Item {
      string name;
      address nftAddress;
      uint256 price;
      uint256 tokenId;
      address seller;
      bool listed;
   }

   uint256 private listingFee = 0.02 ether;
   address private owner;
   uint256 private tokenId;

   modifier onlyOwner() {
        require(msg.sender == owner, "Only owner of Marketplace is authorized");
        _;
   }

   mapping(uint256 => Item) private items;

   constructor() {
      owner = msg.sender;
   }

    // NFT functions

    // Adding NFT to marketplace
   function listItem(string memory _name, address nftAddress, uint256 price) public {
      Item memory newNFT = Item(_name, nftAddress, price, tokenId + 1, msg.sender, true);
      items[tokenId + 1] = newNFT;
      tokenId += 1;
   }

    // Buying NFT
   function buyNFT(uint256 _tokenId) public payable {
      Item memory currNFT = items[_tokenId];
      require(currNFT.listed, "No NFT exists of such type");
      require(msg.value == currNFT.price + listingFee, "Please provide sufficient funds");

      uint256 nftPrice = currNFT.price;
      nftContract(items[_tokenId].nftAddress).mint{value: nftPrice}(msg.sender);
   }

    // Getting NFT details
   function getNFT(uint256 _tokenId) public view returns (Item memory) {
      return items[_tokenId];
   }

    // Removing NFT from Marketplace
   function deListNFT(uint256 _tokenId) public {
      Item memory currNFT = items[_tokenId];
      require(currNFT.seller == msg.sender, "You are not the owner of this NFT");
      items[_tokenId].listed = false;
      delete items[_tokenId];
   }

   // Get NFT metadata
   function getTokenURI(uint256 _tokenId) public returns (string memory) {
        return nftContract(items[_tokenId].nftAddress).getTokenURI();
   }

    // Get all listed NFTs
   function getListedNFTs() public view returns (Item[] memory) {
      Item[] memory listedNFTs = new Item[](tokenId);
      uint256 curr = 0;
      for (uint256 i = 1; i <= tokenId; i++) {
         if (items[i].listed) {
            listedNFTs[curr] = items[i];
            curr += 1;
         }
      }
      return listedNFTs;
   }


    //Marketplace related functions


    // Withdraw contarct funds
   function withdraw() public onlyOwner {
      payable(owner).transfer(address(this).balance);
   }

    // Balance of marketplace
   function balance() public view onlyOwner returns (uint256) {
        return address(this).balance ;
   } 
}