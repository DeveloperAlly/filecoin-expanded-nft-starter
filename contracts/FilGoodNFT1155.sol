//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

//Extend the ERC1155 contract functionality with 'is' statement
contract FilGoodNFT1155 is ERC1155 {
    // Inititalise the Util Lib Counters function
    using Counters for Counters.Counter;
    // Set a tokenID variable for our NFT collection
    Counters.Counter private _tokenIds;

    //this maps our tokenURI
    mapping(uint256 => string) private _tokenURIs;

    //I'm capping my collection to a certain number of NFTs
    //which I want to be variable each time I use this contract
    //Hence, I'm creating a maxNFTs variable. I also want to know
    //how many I have left and I'm going to do this using contract events
    //to save on computation costs
    uint256 public maxNFTs;
    uint256 public remainingMintableNFTs;
    string public name = "FilGood NFTs 2022";

    struct NFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
    }

    NFT[] public nftCollection;

    /* tokenURI Specification
    {
        "name": "Their name + Filecoin @ NFTHack 2022"
        "description": "NFT created for EthGlobal NFTHack 2022 and limited to 100 tokens"
        "image": //IPFS pinned file content CID (can be any mime type)
        "other data like version, strenth, etc....": ""
    }
    */

    //This event lets the blockchain know every time a new NFT is minted & how many are left
    event NewFilGoodNFTMinted(
        address indexed sender,
        uint256 indexed tokenId,
        string tokenURI,
        uint256 remainingMintableNFTs
    );

    //This sets our collection details. Anything minted by this contract will fall under this header
    constructor() ERC1155("Fil-Good NFT") {
        console.log("This is my NFT contract");
        maxNFTs = 100; //set a limit to number of nft's that are mintable
        remainingMintableNFTs = 100;
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return (_tokenURIs[_tokenId]);
    }

    function _setTokenUri(uint256 tokenId, string memory tokenURI) private {
        _tokenURIs[tokenId] = tokenURI;
    }

    //bear in mind - as this has no access control ANYONE can mint ANY NFT image they like with it
    function mintMyNFT(string memory ipfsURI) public returns (uint256) {
        require(_tokenIds.current() < maxNFTs);
        uint256 newItemId = _tokenIds.current();

        NFT memory newNFT = NFT({
            owner: msg.sender,
            tokenURI: ipfsURI,
            tokenId: newItemId
        });

        //_mint(to, id, amount, data)
        /*
        _mint(address to, uint256 id, uint256 amount, bytes data)
            internal
            Creates amount tokens of token type id, and assigns them to to.
            Emits a TransferSingle event.
            Requirements:
            to cannot be the zero address.
            If to refers to a smart contract, it must implement IERC1155Receiver.onERC1155Received and return the acceptance magic value.
        */
        bytes memory data = bytes(ipfsURI);
        _mint(msg.sender, newItemId, 1, "maybe name here?");

        // Update your URI!!!
        _setTokenUri(newItemId, ipfsURI);

        _tokenIds.increment();

        remainingMintableNFTs = maxNFTs - _tokenIds.current();

        nftCollection.push(newNFT);

        emit NewFilGoodNFTMinted(
            msg.sender,
            newItemId,
            ipfsURI,
            remainingMintableNFTs
        );

        return newItemId;
    }

    function getNFTCollection() public view returns (NFT[] memory) {
        return nftCollection;
    }

    function getRemainingMintableNFTs() public view returns (uint256) {
        return remainingMintableNFTs;
    }
}