require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};


require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {

    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    polygon_testnet: {
      url: process.env.POLYGON_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    bsc_testnet: {
      url: process.env.BSC_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    avax_testnet: {
      url: process.env.AVAX_TEST_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    eth_mainnet: {
      url: process.env.ETH_MAINNET_RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
