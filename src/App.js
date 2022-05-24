import React, { useState, useEffect } from "react";

/* ERC71 based Solidity Contract Interface */
//import filecoinNFTHack from "./utils/FilecoinNFTHack.json";
import filgoodNFT1155 from "./utils/FilGoodNFT721.json";
import filgoodNFT721 from "./utils/FilGoodNFT721.json";

/* NFT.Storage import for creating an IPFS CID & storing with Filecoin */
import { NFTStorage, File } from "nft.storage";
import { baseSVG } from "./utils/BaseSVG";

/* Encryption package to ensure SVG data is not changed in the front-end before minting */
import CryptoJS from "crypto-js";

/* Javascript Lib for evm-compatible blockchain contracts */
import { ethers, providers } from "ethers";

/* UI Components & Style*/
import "./styles/App.css";
import Layout from "./components/Layout";
import MintNFTInput from "./components/MintNFTInput";
import StatusMessage from "./components/StatusMessage";
import ImagePreview from "./components/ImagePreview";
import Link from "./components/Link";
import DisplayLinks from "./components/DisplayLinks";
import ConnectWalletButton from "./components/ConnectWalletButton";
import NFTViewer from "./components/NFTViewer";
//import SaveToNFTStorage from "./components/SaveToNFTStorage";
// import InfoPage from "./pages/InfoPage";

const INITIAL_LINK_STATE = {
  etherscan: "",
  opensea: "",
  rarible: "",
};

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const CHAIN_MAPPINGS = {
  rinkeby: {
    id: 42,
    rpc: process.env.REACT_APP_RINKEBY_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS
    }
  },
  polygon_test: {
    id: 80001,
    rpc: process.env.POLYGON_TEST_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_POYGON_TEST_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_POYGON_TEST_CONTRACT_ADDRESS
    }
  }
}

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [linksObj, setLinksObj] = useState(INITIAL_LINK_STATE);
  const [imageView, setImageView] = useState(null);
  const [remainingNFTs, setRemainingNFTs] = useState("");
  const [nftCollectionData, setNftCollectionData] = useState("");
  const [recentlyMinted, setRecentlyMinted] = useState("");
  // const [contractChoice, setcontractChoice] = useState("ERC721");
  // const [chainChoice, setChainChoice] = useState("rinkeby");
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  const { loading, error, success } = transactionState; //make it easier

  /* runs on page load - checks wallet is connected 
   Really want to run this on any changes to a wallet too
   So we can add address, chain and network checking
  */
  useEffect(() => {
    checkIfWalletIsConnected();
    if (window.ethereum) {
      // window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  /* If a wallet is connected, do some setup and continue listening for wallet changes */
  useEffect(() => {
    setUpEventListener();
    fetchNFTCollection();
    chainChanged();
  }, [currentAccount]);

  /* Create the IPFS gateway URL's when the nft collection state changes */
  useEffect(() => {
    createImageURLsForRetrieval(nftCollectionData);
  }, [nftCollectionData]);


  /* Check for a wallet */
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
      // checkChain();
      setUpEventListener();
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }

    //TODO: make sure on right network or change programatically
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      changeWalletChain();
      // alert("You are not connected to the Rinkeby Test Network!");
    }
  };

  /* Connect a wallet */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const chainChanged = async () => {
    let chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      changeWalletChain();
      // alert("You are not connected to the Rinkeby Test Network!");
    }
    else return;
  };

  const changeWalletChain = async () => {
    const provider = window.ethereum;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }]
      });
    } catch (error) {
      alert(error.message);
    }
  }

  /* Listens for events emitted from the solidity contract, to render data accurately */
  const setUpEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS,
          filgoodNFT1155.abi,
          signer
        );
        console.log("CONNECTED", connectedContract)

        connectedContract.on(
          "NewFilGoodNFTMinted",
          (sender, tokenId, tokenURI, remainingNFTs) => {
            console.log("event - new minted NFT");
            fetchNFTCollection();
            setRemainingNFTs(remainingNFTs)
          }
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Helper function for createNFTData */
  const resetState = () => {
    setLinksObj(INITIAL_LINK_STATE);
    setName("");
    setImageView(null);
  }

  /* Helper function for createNFTData */
  const createImageView = (metadata) => {
    let imgViewArray = metadata.data.image.pathname.split("/");
    let imgViewString = `https://${imgViewArray[2]}.ipfs.nftstorage.link/${imgViewArray[3]}`;
    setImageView(
      imgViewString
    );
    console.log(
      "image view set",
      `https://${imgViewArray[2]}.ipfs.nftstorage.link/${imgViewArray[3]}`
    );
  } 

  /* Create the IPFS CID of the json data */
  const createNFTData = async () => {
    console.log("saving to NFT storage");
    resetState();
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Saving NFT data to NFT.Storage...",
    });

    // install it
    // Set Up the NFT.Storage Client
    const client = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });
    console.log("got client", client)

    // The Advanced Encryption Standard (AES) is a U.S. Federal Information Processing Standard (FIPS). 
    // It was selected after a 5-year process where 15 competing designs were evaluated.
    // This is step one in preventing front end injection into the NFT we're trying to save and mint
    const data = CryptoJS.AES.encrypt(`${baseSVG}${name}</tspan></text></g></svg>`, process.env.REACT_APP_ENCRYPT_KEY);

    //lets load up this token with some metadata and our image and save it to NFT.storage
    //image contains any File or Blob you want to save
    // name, image, description, other traits.
    // useBlob to save one item to IPFS
    // use File to save all the json metadata needed - much like any object storage you're familiar with!
    try {
      await client
        .store({
          name: `${name}: FilGood NFT 2022`,
          description:
            "NFT created for FilGood Workshop 2022 and limited to 100 personalised tokens",
          image: new File(
            [
              CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8)
            ],
            `FilGoodNFT.svg`,
            {
              type: "image/svg+xml",
            }
          ),
          traits: {
            awesomeness: "100", //probs should use 0-1 for solidity
          },
        })
        .then((metadata) => {
          setTransactionState({
            ...transactionState,
            success: "Saved NFT data to NFT.Storage...!! We created an IPFS CID & made a Filecoin Storage Deal with one call!",
            loading: "",
          });
          console.log("metadata saved", metadata);

          // To view the data we just saved in the browser we need to use an IPFS http bridge
          // Or Brave Browser / Opera which have IPFS integration built into them
          // Or run a local IPFS node (there's a desktop app)
          // I'll use a gateway, so
          // This means manipulating the returned CID to configure it for a gateway...
          // Check gateways & their functionality here: https://ipfs.github.io/public-gateway-checker/
          createImageView(metadata);
          
          // we can also check the status of our data (such as storage deals made) using this
          // const status = await client.status(metadata.ipnft);
          // console.log("status", status);

          // Now that we have a CID and our data is stored on Filecoin, 
          // - we'll mint the NFT with the token data (and IPFS CID)
          askContractToMintNft(metadata.url);
        });
    } catch (error) {
      console.log("Could not save NFT to NFT.Storage - Aborted minting");
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: "Could not save NFT to NFT.Storage - Aborted minting",
      });
    }
  };

  /* Mint the NFT on the eth blockchain */
  const askContractToMintNft = async (IPFSurl) => {
    //should check the wallet chain is correct here
    setTransactionState({
      ...INITIAL_TRANSACTION_STATE,
      loading: "Approving & minting NFT...",
    });

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS,
          filgoodNFT1155.abi,
          signer
        );

        //should check user is on correct chain here before proceeding (rushed spaghetti code soz)
        // let chainId = await window.ethereum.request({ method: 'eth_chainId' });
        // const rinkebyChainId = "0x4";
        // if (chainId !== rinkebyChainId) {
        //   changeWalletChain();
        //   // alert("You are not connected to the Rinkeby Test Network!");
        // }

        console.log("Opening wallet");
        let nftTxn = await connectedContract.mintMyNFT(IPFSurl);

        connectedContract.on(
          "NewFilGoodNFTMinted",
          (from, tokenId, tokenURI) => {
            console.log("event listener", from, tokenId.toNumber(), tokenURI);
            setLinksObj({
              ...linksObj,
              opensea: `https://testnets.opensea.io/assets/${process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS}/${tokenId.toNumber()}`,
              rarible: `https://rinkeby.rarible.com/token/${process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS}:${tokenId.toNumber()}`,
              etherscan: `https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
            });
          }
        );

        //SHOULD UPDATE IMAGELINK to returned value
        await nftTxn.wait();
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          success: "NFT Minted!",
        });
      } else {
        console.log("Ethereum object doesn't exist!");
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `No Wallet connected`,
        });
      }
    } catch (error) {
      setTransactionState({
        ...INITIAL_TRANSACTION_STATE,
        error: `Error Minting NFT. ${error.message}`,
      });
    }
  };

  /* Helper function - manipulating the returned CID into a http link using IPFS gateway */
  const createIPFSgatewayLink = (el) => {
    let link = el[1].split("/");
    let fetchURL = `https://${link[2]}.ipfs.nftstorage.link/${link[3]}`;
    return fetchURL;
  }

  /* 
    Helper function for fetching the Filecoin data through IPFS gateways 
    to display the images in the UI 
  */
  const createImageURLsForRetrieval = async (collection) => {
    if (collection.length < 1) return;
    //only return the 5 most recent NFT images
    // this collection is fetched on webpage load
    let dataCollection = collection
    .slice()
    .reverse()
    .slice(0, 5)
    .map((el) => {
      return el;
    });

    let imgURLs = await Promise.all(
      dataCollection.map(async (el) => {
        const ipfsGatewayLink = createIPFSgatewayLink(el);
        console.log("fetchURL", ipfsGatewayLink);
        const response = await fetch(ipfsGatewayLink);
        const json = await response.json();
        return json;
      })
    );

    console.log("imgURLs2", imgURLs);
    setRecentlyMinted(imgURLs);
  }

 /* Function to get our collection Data from
    1. The blockchain
    2. Filecoin via IPFS addressing & http gateways
 */
  const fetchNFTCollection = async () => {
    console.log("fetching nft collection");
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RINKEBY_RPC_URL);
    await provider.getBlockNumber().then((result) => {
      console.log("Current block number: " + result);
  });
    // provider is read-only get a signer for on-chain transactions
    // const signer = provider.getSigner();
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS,
      filgoodNFT1155.abi,
      provider
    );

    await connectedContract.remainingMintableNFTs().then(remainingNFTs => {
      console.log("resp", remainingNFTs)
      setRemainingNFTs(remainingNFTs.toNumber()); //update state
    }).catch(err => console.log("error getting remaining nfts", err));

    await connectedContract.getNFTCollection().then(collection => {
      console.log("collection", collection);
      setNftCollectionData(collection); //update state
    }).catch(err => console.log("error fetching nft collection data", err));

    // //do this in an effect when collection changes
    // await createImageURLsForRetrieval(nftCollectionData);
  };


  /* Render our page */
  return (
    <Layout connected={currentAccount === ""} connectWallet={connectWallet}>
      <>
        <p className="sub-sub-text">{`Remaining NFT's: ${remainingNFTs}`}</p>
        {transactionState !== INITIAL_TRANSACTION_STATE && <StatusMessage status={transactionState}/>}
        {imageView &&
          !linksObj.etherscan && <Link link={imageView} description="See IPFS image link"/>}
        {imageView && <ImagePreview imgLink ={imageView}/>}
        {linksObj.etherscan && <DisplayLinks linksObj={linksObj} />}
        {currentAccount === "" ? (
          <ConnectWalletButton connectWallet={connectWallet}/>
        ) : transactionState.loading ? (
          <div />
        ) : (
          <MintNFTInput name={name} setName={setName} transactionState={transactionState} createNFTData={createNFTData}/>
        )}
        {recentlyMinted && <NFTViewer recentlyMinted={recentlyMinted}/>}
        {/* <InfoPage connected={currentAccount === ""} connectWallet={connectWallet} /> */}
      </>
    </Layout>
  );
};

export default App;
