## Overview

This project mints an NFT using solidity, NFT.Storage (which provides an immutable IPFS CID and then persistently stores to Filecoin) and React.
There are 2 contracts which perform the same function of minting an NFT - an ERC721 and an ERC1155 contract.
You can deploy these contracts to _any_ EVM-compatible chain including Polygon, AVAX, BSC or of course Ethereum

## Archtitecture Overview & Diagram

Client: React
JS-client for web3: Ethers
Backend: Solidity with OpenZeppelin Clients
Blockchain Dev Environment: Hardhat
Node Provider: Moralis

## Dependencies

- Metamask Wallet (NB: ALWAYS use a NEW Wallet for testing - NEVER use wallets with real assets in them)
- Node

## QuickStart

- clone the repo
- change directory to the repo
- run `npm install`
- create a .env file `touch .env` (.env.example has needed variables)
- Get moralis endpoints (sign up for an account and use speedy nodes) - add the network you wish to deploy on to .env file (you can add multiple networks)
- Get an NFT.Storage API - add this to .env file
- Add your metamask (or wallet) private key to .env file
- Build the contracts on the network of your choosing `npx hardhat run --network NETWORK scripts/deploy.js` (you may need to install hardhat globally if this doesn't work `npm i -g hardhat`)
- Add the built contract addresses from the terminal log to the .env file
- Run the client `npm start` (yeah yeah I haven't moved to yarn - old habits and all that)

## Making this project from scratch

** Dependencies **

- [Node](https://nodejs.org/en/download/) Installed (use LTS)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed

1. Install & Make (this also names your directory)
   a. A [NextJs](https://nextjs.org/docs/api-reference/create-next-app) app
   OR
   b. A [React](https://reactjs.org/docs/create-a-new-react-app.html) app

- `npx create-next-app@latest` OR `npx create-react-app [projectName]`
- `npx create-react-app [projectName]`

2. Navigate to your app

- `cd [projectName]`
- rename the README.md file (ex. README_React.md)

2. Install & Make a [Hardhat](https://hardhat.org/tutorial/creating-a-new-hardhat-project.html) project.
   #let's add some detail about what hardhat is and other options available here

- `npm install --save-dev hardhat`
- `npx hardhat`
- choose create a basic sample project and say yes to all others
- rename the README.md file (ex. README_Hardhat.md)

3. Install dotenv & create .env file (config/need varies depending on next or react project. There are also better ways to store API keys than this - but for simplicity I'm using .env here)

- `npm install dotenv`
- `touch .env`

4. Create a server for our contracts. I'm going to use [Moralis](https://moralis.io/) so we can deploy to multiple EVM-compatible chains & also because I can then use their react hooks. Other options are chainstack, alchemy, infura and quicknode.

- Create a server as per the Moralis docs
- Add your .env variables as per .env.example (we'll add the deployed contract ones later so you can leave these blank)

5. Create our [hardhat.config](https://hardhat.org/tutorial/creating-a-new-hardhat-project.html) file

6. Let's make our contract & test on remix

- install some dependencies
  npm install @openzeppelin/contracts @nomiclabs/hardhat-etherscan

- We don't need to do this from scratch. What's great is that for EVM-compatible chains we can use a template library provided by [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/erc1155), which is security audited and community tested.
  The original standard template for NFT's was defined in the Ethereum Improvement Proposal [EIP721](https://eips.ethereum.org/EIPS/eip-721). FYI - [EIPs](https://eips.ethereum.org/) describe the standards for the Ethereum platform like core protocol specs, client APIs and contract standards. Many chains also have their own versions of Improvement Proposals (like FIP - Filecoin Improvement Proposal). An improvement proposal is "proposed" by the community - this could be core dev's, members of the ecosystem or anyone in the world. The community then discusses this proposal and it then goes through a process of approval which generally includes an auditing review also.
  ERC's on the other hand are Ethereum Request for Comment's. It's a weird name leftover from an original developer draft proposal, that basically means it's related to a specifc category of EIPs that work on the application level (ie. it means that it's not a core function of the chains code and doesn't need to be adopted by all participants).
  ERC721 is perfectly fine for creating a basic NFT and when I first created this demo - it was the only one available. However, there's recently been a new proposal that is a multi token standard called [EIP1155](https://eips.ethereum.org/EIPS/eip-1155). This standard proposes the ability to create NFTs and fungible tokens in one contract and adds some cool new features like batch minting to NFTs. While I don't need either of these new features for this demo, I'm choosing to use [OpenZeppelin's ERC1155](https://docs.openzeppelin.com/contracts/4.x/erc1155) template because of the gas optimisations it provides due to it's more efficient method for data storage (see this great write up on [Eth StackOverflow](https://ethereum.stackexchange.com/questions/113811/does-erc-1155-contract-use-less-gas-to-mint-tokens/113868#113868)) and also because who knows where this project might go - maybe we'll want to add fungible tokens at some point? And now I'm down a rabbit hole where I'm going to also make this an upgradeable contract aren't I?
  Hmmm may not be actually that optimal and more dependent on use case: https://ethereum.stackexchange.com/questions/118592/different-ids-for-bulk-nft-mint-in-erc-1155

  Let's first look at this contract.... (add details here)

  You've heard enough from me - let's cdoe it! (can we make this a thing? :P)

- Create a new contract called FilGoodNFT.sol
- Import the ERC1155 contract & I'm also using a handy debugger tool from hardhat that gives me the ability to console.log variables and a counter utility library from OpenZeppelin that will allow me to give my NFT's individual numbers easily.
  ```
      import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
      import "@openzeppelin/contracts/utils/Counters.sol";
      import "hardhat/console.sol";
  ```
- Setting custom URI override: https://forum.openzeppelin.com/t/how-to-erc-1155-id-substitution-for-token-uri/3312/16
- Setting custom URI: https://www.youtube.com/watch?app=desktop&v=19SSvs32m8I
- For easy flow I suggest testing your contracts on [remix](https://remix.ethereum.org/) first. You can also import solidity debuggers into your IDE. Eg. for VS Code

7. Create our deploy scripts and [deploy](https://hardhat.org/guides/deploying.html) our contracts to live networks

- cd scripts
- touch deploy.js

```

```

- npx hardhat run --network NETWORK scripts/deploy.js
- NETWORK = localhost or any in the config

7. Verify our deployed contract (only for etherscan networks - ie rinkeby, goerli, eth mainnet)

- npx hardhat verify --network NETWORK DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
