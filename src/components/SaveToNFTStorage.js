import React from "react";

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from "crypto-js";

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from "nft.storage";
import { baseSVG } from "../utils/BaseSVG";

const SaveToNFTStorage = ({name, ...props}) => {
    // Set Up the NFT.Storage Client
    const client = new NFTStorage({
            token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
          });
    //create the NFT data and encrypt it
    const data = CryptoJS.AES.encrypt(`${baseSVG}${name}</text></svg>`, process.env.REACT_APP_ENCRYPT_KEY);
    
}

export default SaveToNFTStorage;