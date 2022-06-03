export const INITIAL_LINK_STATE = {
  etherscan: '',
  opensea: '',
  rarible: ''
};

export const INITIAL_TRANSACTION_STATE = {
  loading: '',
  error: '',
  success: '',
  warning: ''
};

export const NFT_METADATA_ATTRIBUTES = {
  nftName: 'FilGood NFT 2022',
  description: 'NFT created for FilGood Workshop 2022 and limited to 100 personalised tokens',
  fileName: `FilGoodNFT.svg`,
  fileType: 'image/svg+xml',
  traits: {}
};

export const CHAIN_MAPPINGS = {
  rinkeby: {
    chainName: 'rinkeby',
    displayName: 'Rinkeby',
    id: 42,
    chainId: '0x4',
    rpc: process.env.REACT_APP_RINKEBY_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS
    },
    blockExplorer: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io/tx/' }, //{/tx/txHash}
    nftMarketplaceLinks: [
      { name: 'Opensea', urlBase: 'https://testnets.opensea.io/assets/', tokenIdConnector: '/' }, // {contractAddress/tokenNumber}
      {
        name: 'Rarible',
        urlBase: 'https://rinkeby.rarible.com/token/',
        tokenIdConnector: ':',
        url: 'https://rinkeby.rarible.com/token/'
      } //{contractAddress:tokenNumber}
    ]
  },
  // goerli: {
  //   displayName: 'Goerli',
  //   id: 42,
  //   rpc: process.env.REACT_APP_GOERLI_RPC_URL,
  //   contractAddress: {
  //     erc1155: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS_1155,
  //     erc721: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS
  //   },
  //   blockExplorer: '',
  //   nftMarketplaceLinks: []
  // },
  polygon_test: {
    displayName: 'Polygon Testnet',
    chainName: 'mumbai',
    id: 80001,
    chainId: '0x13881',
    rpc: process.env.REACT_APP_POLYGON_TEST_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_POLYGON_TEST_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_POLYGON_TEST_CONTRACT_ADDRESS
    },
    blockExplorer: { name: 'Polygonscan', url: 'https://mumbai.polygonscan.com/' },
    nftMarketplaceLinks: [
      {
        name: 'Opensea',
        urlBase: 'https://testnets.opensea.io/assets/mumbai/',
        tokenIdConnector: '/'
      },
      {
        name: 'Rarible',
        url: `https://rinkeby.rarible.com/collection/polygon/`, //0x617230db79462cba59fcc43f92f3b9fe5067b9e1/items
        urlBase: 'https://rinkeby.rarible.com/token/polygon/',
        tokenIdConnector: ':'
      }
    ]
  },
  bsc_test: {
    displayName: 'BSC Testnet',
    chainName: 'bsc testnet',
    id: 97,
    chainId: '0x61',
    rpc: process.env.REACT_APP_BSC_TEST_RPC_URL,
    contractAddress: {
      erc1155: process.env.REACT_APP_BSC_TEST_CONTRACT_ADDRESS_1155,
      erc721: process.env.REACT_APP_BSC_TEST_CONTRACT_ADDRESS
    },
    blockExplorer: { name: 'BSCscan', url: 'https://testnet.bscscan.com/' }, //{/tx/txHash}
    nftMarketplaceLinks: [
      {
        name: 'Opensea',
        urlBase: 'https://testnets.opensea.io/assets/bsctestnet/',
        tokenIdConnector: '/'
      }
    ]
  }
  // avax_test: {
  //   id: '',
  //   rpc: process.env.REACT_APP_AVAX_TEST_RPC_URL,
  //   contractAddress: {
  //     erc1155: process.env.REACT_APP_AVAX_TEST_CONTRACT_ADDRESS_1155,
  //     erc721: process.env.REACT_APP_AVAX_TEST_CONTRACT_ADDRESS
  //   },
  //   blockExplorer: '',
  //   nftMarketplaceLinks: []
  // }
};

export const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`;
