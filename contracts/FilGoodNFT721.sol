// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

//See more at OpenZeppelin:https://docs.openzeppelin.com/contracts/4.x/erc721
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol"; //alows for console.logs in a solidity contract"

contract FilGoodNFT721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxNFTs;
    uint256 public remainingMintableNFTs;

    struct myNFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
    }

    myNFT[] public nftCollection;

    /* tokenURI
    {
        "name": "Their name + Filecoin @ NFTHack 2022"
        "description": "NFT created for EthGlobal NFTHack 2022 and limited to 100 tokens"
        "image": //IPFS pinned file content CID (can be any mime type)
        "other data like version, strenth, etc....": ""
    }
    */
    event NewFilGoodNFTMinted(
        address indexed sender,
        uint256 indexed tokenId,
        string tokenURI,
        uint256 remainingMintableNFTs
    );

    //This sets our collection details. Anything minted by this contract will fall under this header
    constructor() ERC721("FilGood NFTs 2022", "Filecoin Starter NFTs") {
        console.log("This is my ERC721 NFT contract");
        maxNFTs = 100; //set a limit to number of nft's that are mintable
        remainingMintableNFTs = 100;
    }

    //bear in mind - as this has no access control ANYONE can mint ANY NFT image they like with it
    function mintMyNFT(string memory ipfsURI) public returns (uint256) {
        require(_tokenIds.current() < maxNFTs);
        uint256 newItemId = _tokenIds.current();

        myNFT memory newNFT = myNFT({
            owner: msg.sender,
            tokenURI: ipfsURI,
            tokenId: newItemId
        });

        _safeMint(msg.sender, newItemId);

        // Update your URI!!!
        _setTokenURI(newItemId, ipfsURI);

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

    /**
     * @notice helper function to display NFTs for frontends
     */
    function getNFTCollection() public view returns (myNFT[] memory) {
        return nftCollection;
    }

    function getRemainingMintableNFTs() public view returns (uint256) {
        return remainingMintableNFTs;
    }
}