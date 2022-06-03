# IDEALLY BEFORE GRAPH HACK

- multi chain checked & working and displayed in a table
- multi-options (video, music, image, markdown file) checked & working
- dynamic NFTs with Chainlink Keepers
- using DRand to generate attributes
- add a Factory. (moonshot)

# Code Cleanup Tasks

- add linting [done]
- Add proptypes [done]
- add proptypes to all files [done]
- move consts to their own file [done]
- fix NFT.Storage react hook
- move all wallet/user related info to one place
- move all repeated code to own functions OR probs use a context wrapper lib react-ethers [WIP]
- fix wallet connections and chain changes code
- add support to read latest NFTs without wallet connection [done]
- fix repeated calls to fetchContract [done]
- move styles to code components
- move most code out of App.jsx
- check if this works with polygon
- show 'get metamask' on button if no window.ethereum object

# Code upgrade Tasks

- add hook for contract connection
- add hook for web3 connection
- add site wide error handling
- add wallet connection hooks
- script to write contract json to src/utils/contracts
- script to write deployment contracts address to src/utils/contractscontracts.txt
- destructure the svg so we can play around with creating dynamic NFTs.
- add MUI and css-in-jsx helper
- make Typescript version
- make Next.js version
- wrap app with no internet fallbacks
- fallbacks for images

# Style upgrade Tasks

- StatusMessage upgrade to toast hook
- Carousel gallery for NFTs minted (not just last 5)
- Add style sheet to change themes

# Future features List

- create fully featured NFT.Storage react hooks & ship to npm
- add hooks to support all sorts of NFT.Storage uploads - video, audio etc.
- add wallet Connect (not just metamask)
- Check multichain deployments
- Make a factory that deploys these at each workshop and keeps track of all contracts deployed!!
- Extend to batch functionality on 1155
- make mutable NFTs
- add dynamic changes for NFTs (how to show different image depending on browser?) - use Chainlink
- potentially add dynamic properties to NFTs in the contract using drand?
- make website responsive

# Other tasks

- port website to a mobile app version
- mutable NFTs addition
- gaming...
- make creact-react-eth-nft-dapp (auto deploy to fleek?)

# Big Bad Buglist

-

# Priority Tasks (wed, thurs)

- Check Multichain & enable view for this
- multi-options (video, music, image, markdown file) checked & working
- random background colour & attributes for NFTs made
