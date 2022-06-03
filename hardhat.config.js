require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: process.env.REACT_APP_RINKEBY_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    goerli: {
      url: process.env.REACT_APP_GOERLI_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    polygon_testnet: {
      url: process.env.REACT_APP_POLYGON_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    bsc_testnet: {
      url: process.env.REACT_APP_BSC_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    avax_testnet: {
      url: process.env.REACT_APP_AVAX_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    },
    eth_mainnet: {
      url: process.env.REACT_APP_ETH_MAINNET_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
