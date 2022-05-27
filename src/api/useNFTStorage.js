import React, { useState, useEffect } from 'react';

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from 'crypto-js';

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from 'nft.storage';

// import PropTypes from 'prop-types';

const INITIAL_STATUS = {
  data: null,
  error: null,
  isLoading: false,
  isFetching: false
};

//TODO: Make this function more generic to expand on
//      NFT.Storage hooks & create a package for it
/**
 *
 * @param {*} functionName : string
 * @param {*} params : object
 * @returns {data, error, isLoading, isFetching}
 * params: NFT.Storage API key, encrypt key, metadata {name, description, image}
 *
 */
const useNFTStorage = (params) => {
  const [status, setStatus] = useState(INITIAL_STATUS);

  const client = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORAGE_API_KEY
  });

  const saveToNFTStorage = async (params) => {
    console.log('posting to NFT.storage', params, status);
    setStatus({ ...status, isLoading: true, isFetching: true });
    //TODO: move out of hard coding - should be passed params
    //client.store is the saveMethod.
    // we'd need to do some type checking of params for a useful hook
    await client
      .store({
        name: params.nftName,
        description: params.nftDescription,
        image: new File(
          [
            CryptoJS.AES.decrypt(params.nftData, process.env.REACT_APP_ENCRYPT_KEY).toString(
              CryptoJS.enc.Utf8
            )
          ],
          params.nftDataName,
          {
            type: params.nftDataType
          }
        ),
        ...params.traits
      })
      .then((metadata) => {
        setStatus({ ...INITIAL_STATUS, data: metadata });
      })
      .catch((error) => {
        setStatus({ ...INITIAL_STATUS, error });
      });
  };
  console.log('savtNFTSTOREstatus', status);
  return { ...status, saveToNFTStorage };
};

// useNFTStorage.propTypes = {
//   params: PropTypes.shape.isRequired {
//     nftName: PropTypes.string.isRequired,
//     nftDescription: PropTypes.string.isRequired,

//   }
// };

export default useNFTStorage;
