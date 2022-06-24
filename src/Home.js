/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/namespace */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

/* ERC71 based Solidity Contract Interface */
import { FilGoodNFT721JSON, FilGoodNFT1155JSON } from './utils/contracts';

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from 'crypto-js';

/* Javascript Lib for evm-compatible blockchain contracts */
import { ethers } from 'ethers';

/* Custom Hooks */
// import useNFTStorage from './api/useNFTStorage';
import { useMoralis, useApiContract } from 'react-moralis';

/* UI Components & Style */
// import ErrorPage from './pages/ErrorPage';
import './styles/App.css';
import {
  Layout,
  MintNFTInput,
  StatusMessage,
  ImagePreview,
  Link,
  DisplayLinks,
  ConnectWalletButton,
  NFTViewer,
  ChooseChain
} from './components';
// import InfoPage from "./pages/InfoPage";

//move to own hook
import {
  setWalletListeners,
  checkForWalletConnection,
  changeWalletChain
} from './utils/helper_functions/wallet_functions';

import {
  createImageURLsForRetrieval,
  createImageView
} from './utils/helper_functions/imageFunctions';

import {
  INITIAL_LINK_STATE,
  INITIAL_TRANSACTION_STATE,
  NFT_METADATA_ATTRIBUTES,
  CHAIN_MAPPINGS
} from './utils/consts';

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from 'nft.storage';
import { baseSVG, endSVG } from './utils/BaseSVG';

const Home = () => {
  /**
   * Hooks & Custom Hooks (these act as my state)
   */
  // this is to connect to our app and display pages even when no wallet is connected
  const { Moralis, isInitialized } = useMoralis();
  const [userWallet, setUserWallet] = useState({ accounts: [], chainId: null });
  const [name, setName] = useState('');
  const [linksObj, setLinksObj] = useState(INITIAL_LINK_STATE);
  const [imageView, setImageView] = useState(null);
  const [remainingNFTs, setRemainingNFTs] = useState('');
  const [recentlyMinted, setRecentlyMinted] = useState('');
  const [transactionState, setTransactionState] = useState(INITIAL_TRANSACTION_STATE);
  const [chainChoice, setChainChoice] = useState('rinkeby');
  const [contractOptions, setContractOptions] = useState(CHAIN_MAPPINGS.rinkeby); //inludes chain choice and contract choice
  const [contractChoice, setcontractChoice] = useState('erc1155'); //future feature

  /**
   * This hook will load data from our NFT contract without a wallet being connected
   * This is so that the page will load and display properly for any and all users
   * They will need a wallet to Mint the NFTs though.
   * Note: I'm not using all the variables that are returned from this
   * hook as I deal with errors and data returns elsewhere
   */
  //We should be returning the data from this so we can update in time.
  const { runContractFunction: fetchNFTCollection, data: nftCollectionData } = useApiContract({
    functionName: 'getNFTCollection',
    abi: contractChoice === 'erc1155' ? FilGoodNFT1155JSON.abi : FilGoodNFT721JSON.abi,
    address: contractOptions.contractAddress[contractChoice],
    chain: contractOptions.chainName
  });
  // Fetch the number of NFTs remaining
  const { runContractFunction: getRemainingMintableNFTs, data: remainingNftData } = useApiContract({
    functionName: 'getRemainingMintableNFTs',
    abi: contractChoice === 'erc1155' ? FilGoodNFT1155JSON.abi : FilGoodNFT721JSON.abi,
    address: contractOptions.contractAddress[contractChoice],
    chain: contractOptions.chainName
  });

  const { loading, error, success } = transactionState; // make it easier
  const { ethereum } = window;

  // Runs on page load
  useEffect(() => {
    console.log('Connecting to Moralis jsonRPC server...');
    // Initialise the Blockchain Node server to get data from the blockchain
    Moralis.start({
      appId: process.env.REACT_APP_MORALIS_APP_ID,
      serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL
    });
    if (ethereum) {
      console.log('Injected ethereum object found (wallet)');
      setWalletListeners(userWallet, setUserWallet);
      setContractEventListener();
      checkForWalletConnection(userWallet, setUserWallet);
    }
  }, []);

  useEffect(() => {
    console.log('Nft data updated', nftCollectionData);
  }, [nftCollectionData]);

  useEffect(() => {
    console.log('ReminainingNft data updated', remainingNftData);
  }, [remainingNftData]);

  // Runs when 'isInitialized' changes
  useEffect(() => {
    console.log('Checking if Moralis connection initialized...');
    if (isInitialized) {
      console.log('Server is initialized. Fetching display data...');
      getDisplayData();
      setContractEventListener();
      //let's also set up contract event listeners here....
    }
  }, [isInitialized]);

  useEffect(() => {
    console.log('Minting on a new chain...');
    changeWalletChain(contractOptions.chainId);
    resetState();
    setContractEventListener();
    getDisplayData();
  }, [contractOptions]);

  const connectWallet = async () => {
    console.log('Connecting to a wallet...');
    if (window.ethereum) {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Got wallet accounts', accounts);
          setUserWallet({ ...userWallet, accounts });
        })
        .catch((err) => {
          console.log('Error fetching accounts', err);
        });
    }
  };

  /* Listens for events emitted from the solidity contract, to render data accurately */
  const setContractEventListener = () => {
    console.log('Setting contract event listener...');
    try {
      const provider = new ethers.providers.JsonRpcProvider(contractOptions.rpc);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        contractOptions.contractAddress[contractChoice],
        contractChoice === 'erc1155' ? FilGoodNFT1155JSON.abi : FilGoodNFT721JSON.abi,
        signer
      );
      connectedContract.on('NewFilGoodNFTMinted', (sender, tokenId, tokenURI, remainingNFTs) => {
        console.log(
          'NewFilGoodNFTMinted event triggered, data: ',
          sender,
          tokenId,
          tokenURI,
          remainingNFTs
        );
        setLinksObj({
          ...linksObj,
          opensea: `${
            contractOptions.nftMarketplaceLinks[0].urlBase
          }${contractOptions.contractAddress[contractChoice].toLowerCase()}/${tokenId}`,
          rarible: `${
            contractOptions.nftMarketplaceLinks[1].urlBase
          }${contractOptions.contractAddress[contractChoice].toLowerCase()}:${tokenId}`
        });
        if (isInitialized) {
          getDisplayData();
        }
        setRemainingNFTs(remainingNFTs);
      });
    } catch (error) {
      console.log('Error in Contract Event listener', error);
    }
  };

  const getDisplayData = async () => {
    console.log(`Fetching NFT Collection...`); //on ${chainChoice} network
    await fetchNFTCollection()
      .then((nftCollectionData) => {
        console.log('Fetched NFT Collection', nftCollectionData);
        createImageURLsForRetrieval(5, nftCollectionData)
          .then((nfts) => {
            console.log('Created NFT Collection Image Gateways', nfts);
            setRecentlyMinted(nfts);
          })
          .catch((err) => {
            console.log(`Couldn't create image URLs: ${err}`);
            setTransactionState({
              ...transactionState,
              error: `Couldn't create Image Displays: ${err}`
            });
          });
      })
      .catch((err) => {
        console.log(`Couldn't fetch NFT Collection: ${err}`);
        setTransactionState({
          ...transactionState,
          error: `Couldn't fetch NFT Collection: ${err}`
        });
      });
    console.log('Fetching Remaining Mintable NFTs...');
    getRemainingMintableNFTs()
      .then((rmdr) => {
        console.log('Fetched remaining NFTs:', rmdr);
        setRemainingNFTs(rmdr);
      })
      .catch((err) => {
        console.log(`Couldn't fetch Number of Remaining Nfts: ${err}`);
        // setTransactionState({
        //   ...transactionState,
        //   error: `Couldn't fetch Number of Remaining Nfts: ${err}`
        // });
      });
  };

  /* Create the IPFS CID of the json data */
  const createNFTData = async () => {
    // should check the wallet chain is correct here
    console.log('Creating NFT metadata...');
    resetState();
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: 'Creating NFT data to save to NFT.Storage...'
    });
    //NB: we could generate a random set of traits using
    //a random number generator like Drand
    // We could also use chainlink VRF in our contract
    const imageData = CryptoJS.AES.encrypt(
      `${baseSVG}${name}${endSVG}`,
      process.env.REACT_APP_ENCRYPT_KEY
    );
    const nftJSON = {
      nftName: `${name}: ${NFT_METADATA_ATTRIBUTES.nftName}`,
      nftDescription: NFT_METADATA_ATTRIBUTES.description,
      nftData: imageData,
      nftDataType: NFT_METADATA_ATTRIBUTES.fileType,
      nftDataName: NFT_METADATA_ATTRIBUTES.fileName,
      attributes: {
        awesomeness: '100',
        builder: 'blockend',
        filGoodVibes: '100'
      }
    };

    saveToNFTStorage(nftJSON);
  };

  //client.store is the saveMethod.
  const saveToNFTStorage = async (params) => {
    console.log('Saving NFT metadata to NFT.storage', params);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: 'Saving NFT metadata to NFT.Storage...'
    });
    const client = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY
    });
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
        attributes: [params.attributes]
      })
      .then((nftMetadata) => {
        console.log('NFT metadata saved to NFT.Storage', nftMetadata);
        setImageView(createImageView(nftMetadata));
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          success: (
            <>
              <div>
                Saved NFT data to NFT.Storage...!! We created an IPFS CID & made Filecoin Storage
                Deals with one call!
              </div>
              File: <a>{nftMetadata.url}</a>
            </>
          )
        });
        askContractToMintNft(nftMetadata.url);
      })
      .catch((error) => {
        console.log(
          `Error saving NFT metadata to NFT.Storage - Aborted minting: \n ${error.message}`
        );
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Could not save NFT to NFT.Storage - Aborted minting: \n ${error.message}`
        });
      });
  };

  /* Mint the NFT on the rinkeby eth blockchain */
  const askContractToMintNft = async (IPFSurl) => {
    console.log('Asking contract to mint NFT...');
    // checkWalletChain(userWallet.chainId, chainChoice);
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: 'Approving & minting NFT...'
    });

    //let's remove this code so it's more generic
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      // should check a wallet is connected and it is on the correct chain here.
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        contractOptions.contractAddress[contractChoice],
        FilGoodNFT1155JSON.abi,
        signer
      );

      console.log('Opening wallet');
      // TODO: fix THIS CODE IS FAR TOO HARD TO READ
      console.log('Minting NFT....');
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        loading: `NFT Minting...`
      });
      await connectedContract
        .mintMyNFT(IPFSurl)
        .then(async (data) => {
          console.log('nftTxn data', data);
          await data
            .wait()
            .then((tx) => {
              console.log('Nft minted tx', tx);
              let tokenId = tx.events[1].args.tokenId.toString();
              console.log('tokenId args', tokenId);
              setLinksObj({
                opensea: `${
                  contractOptions.nftMarketplaceLinks[0].urlBase
                }${contractOptions.contractAddress[contractChoice].toLowerCase()}/${tokenId}`,
                rarible: `${
                  contractOptions.nftMarketplaceLinks[1].urlBase
                }${contractOptions.contractAddress[contractChoice].toLowerCase()}:${tokenId}`,
                etherscan: `${contractOptions.blockExplorer.url}${tx.transactionHash}`
              });
              setTransactionState({
                ...INITIAL_TRANSACTION_STATE,
                success: `NFT Minted! Tx: ${data.hash}`
              });
            })
            .catch((error) => {
              setTransactionState({
                ...INITIAL_TRANSACTION_STATE,
                error: `Error Minting NFT. ${error.message}`
              });
            });
        })
        .catch((err) => {
          console.log('err', err);
          setTransactionState({
            ...INITIAL_TRANSACTION_STATE,
            error: `Error Minting NFT. ${err.message}`
          });
        });
    } else {
      console.log("Ethereum object doesn't exist!");
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: `No Wallet connected`
      });
    }
  };

  /* Helper function for createNFTData */
  const resetState = () => {
    setLinksObj(INITIAL_LINK_STATE);
    setName('');
    setImageView(null);
    setTransactionState(INITIAL_TRANSACTION_STATE);
    setRecentlyMinted(null);
  };

  /* Render our page */
  return (
    // <ErrorBoundary FallbackComponent={ErrorPage}>
    <Layout connected={userWallet.accounts.length > 0} connectWallet={connectWallet}>
      <>
        <ChooseChain
          chainChoice={chainChoice}
          setChainChoice={setChainChoice}
          setContractOptions={setContractOptions}
        />
        <p className="sub-sub-text">{`Remaining NFT's: ${remainingNFTs}`}</p>
        {transactionState !== INITIAL_TRANSACTION_STATE && (
          <StatusMessage status={transactionState} />
        )}
        {imageView && !linksObj.etherscan && (
          <Link link={imageView} description="See IPFS image link" />
        )}
        {imageView && <ImagePreview imgLink={imageView} preview="true" />}
        {linksObj && <DisplayLinks linksObj={linksObj} />}
        {userWallet.accounts.length < 1 ? (
          <ConnectWalletButton connectWallet={connectWallet} connected={false} />
        ) : loading ? (
          <div />
        ) : (
          <MintNFTInput
            name={name}
            setName={setName}
            transactionState={transactionState}
            createNFTData={createNFTData}
          />
        )}
        {recentlyMinted && <NFTViewer recentlyMinted={recentlyMinted} />}
        {/* <InfoPage connected={userWallet.accounts.length > 0} connectWallet={connectWallet} /> */}
      </>
    </Layout>
    // </ErrorBoundary>
  );
};

export default Home;
