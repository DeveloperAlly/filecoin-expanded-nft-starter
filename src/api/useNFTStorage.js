import React, { useState, useEffect } from 'react';

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from 'crypto-js';

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from 'nft.storage';
import { baseSVG } from '../utils/BaseSVG';

import PropTypes from 'prop-types';

//get method: defined here, params is 'name'
const useNFTStorage = ({ name, ...props }) => {
  const [status, setStatus] = useState({
    metadata: null,
    error: null,
    loading: true
  });

  const client = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORAGE_API_KEY
  });

  // The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS).
  // It was selected after a 5-year process where 15 competing designs were evaluated.
  // This is step one in preventing front end injection into the NFT we're trying to save and mint
  const data = CryptoJS.AES.encrypt(
    `${baseSVG}${name}</tspan></text></g></svg>`,
    process.env.REACT_APP_ENCRYPT_KEY
  );

  useEffect(() => {
    postToNFTStorage();
  }, [name]);

  //do i need async await?
  const postToNFTStorage = async () => {
    console.log('posting to NFT.storage', status);
    setStatus(...{ loading: true });
    console.log('status', status);
    await client
      .store({
        name: `${name}: FilGood NFT 2022`,
        description: 'NFT created for FilGood Workshop 2022 and limited to 100 personalised tokens',
        image: new File(
          [
            CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(
              CryptoJS.enc.Utf8
            )
          ],
          `FilGoodNFT.svg`,
          {
            type: 'image/svg+xml'
          }
        ),
        traits: {
          awesomeness: '100'
        }
      })
      .then((metadata) => {
        setStatus(...{ loading: false, metadata });
      })
      .catch((error) => {
        setStatus(...{ loading: false, error });
      });
  };

  return status;
};

useNFTStorage.propTypes = {
  name: PropTypes.string.isRequired
};

export default useNFTStorage;
