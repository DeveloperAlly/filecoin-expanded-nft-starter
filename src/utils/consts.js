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

export const CHAIN_MAPPINGS = {
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
};

export const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`;
