async function main() {
  const FilGoodNFT1155 = await hre.ethers.getContractFactory('FilGoodNFT1155');
  const nft1155 = await FilGoodNFT1155.deploy();
  await nft1155.deployed();
  console.log('1155 Contract deployed to:', nft1155.address);

  const FilGoodNFT721 = await hre.ethers.getContractFactory('FilGoodNFT721');
  const nft721 = await FilGoodNFT721.deploy();
  await nft721.deployed();
  console.log('721 Contract deployed to:', nft721.address);

  // TODO: log these outputs to a file. Does hardhat have a plugin for this?

  // Call the function.
  // let txn = await nftContract.mintMyNFT(
  //   "ipfs://bafyreiah6nfc5ht2rifpnwuqssq6mkxhtjurrrcgnn7ms42d755edt7nqy/metadata.json"
  //   // "https://bafybeiggaxhjtplbrn26mox5npfd7rif3wt43h4oy55q5wfzyonmmrcqty.ipfs.dweb.link/nft.json"
  // );
  // // Wait for it to be mined.
  // await txn.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
