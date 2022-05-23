import React, {useState, useEffect} from "react";

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from "crypto-js";

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from "nft.storage";
import { baseSVG } from "../utils/BaseSVG";

function useNFTStorage(name) {

}