import { useState, useEffect } from 'react';

/* Javascript Lib for evm-compatible blockchain contracts */
import { ethers } from 'ethers';

/* ERC71 based Solidity Contract Interface */
import { FilecoinNFTHackJSON } from '../utils/contracts';

// destructure further to just take the function name in the contract. Rest is the same
//{contractAddress, contractABI, methodName, rpcURL, ...props}
export function useContractFetch() {
  //need a server connection / provider
  //need a function to fetch them

  const [status, setStatus] = useState({ data: null, loading: false, error: null });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setStatus({ loading: true, ...status });
    //ethers providers docs: https://docs.ethers.io/v5/api/providers/
    //should use default provider opt: https://docs.ethers.io/v5/api-keys/#api-keys--getDefaultProvider
    // this provider is read only - we cannot write with it
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_RINKEBY_URL
    );
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      FilecoinNFTHackJSON.abi,
      provider
    );

    connectedContract
      .getNFTCollection()
      .then((collection) => {
        console.log('collection', collection);
        setStatus({ loading: false, data: collection, ...status });
        // setNftCollectionData(collection); //update state
      })
      .catch((err) => {
        console.log('error fetching nft collection data', err);
        setStatus({ ...status, loading: false, error: err });
      });

    // connectedContract.remainingMintableNFTs().then(remainingNFTs => {
    //     console.log("resp", remainingNFTs)
    //     // setRemainingNFTs(remainingNFTs.toNumber()); //update state
    //   }).catch(err => console.log("error getting remaining nfts", err));
  }

  return { ...status, fetchData };
}

/* Function to get our collection Data from
    1. The blockchain
    2. Filecoin via IPFS addressing & http gateways
 */
/*
  const fetchNFTCollection = async () => {
    console.log("fetching nft collection");
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_RINKEBY_URL);
    // provider is read-only get a signer for on-chain transactions
    // const signer = provider.getSigner();
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      filecoinNFTHack.abi,
      provider
    );

    await connectedContract.remainingMintableNFTs().then(remainingNFTs => {
      console.log("resp", remainingNFTs)
      setRemainingNFTs(remainingNFTs.toNumber()); //update state
    }).catch(err => console.log("error getting remaining nfts", err));

    // await connectedContract.getNFTCollection().then(collection => {
    //   console.log("collection", collection);
    //   setNftCollectionData(collection); //update state
    // }).catch(err => console.log("error fetching nft collection data", err));

    // //do this in an effect when collection changes
    // await createImageURLsForRetrieval(nftCollectionData);
  };
  */
