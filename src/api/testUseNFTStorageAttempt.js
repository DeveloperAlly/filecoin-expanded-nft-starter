// import useNFTStorage from './api/useNFTStorage';

// // works but calls too many times - bad implementation
// // probably need reducer/callback
// // Ref: https://usehooks.com/
// // Ref: https://javascript.plainenglish.io/react-custom-hook-useonesubmit-b10be17245d8
const {
  saveToNFTStorage,
  data: nftMetadata,
  error: nftMetadataError,
  isLoading: nftMetadataIsLoading,
  isStoring: nftMetadataIsStoring
} = useNFTStorage({ params: { name } }); //does this get called everytime name changes??

// useEffect(() => {
//   console.log('effectStatus0', transactionState);
//   console.log('nftstoragehook', nftMetadata, nftMetadataError, nftMetadataIsLoading);
//   console.log('effectStatus', transactionState);
//   if (nftMetadataIsLoading) {
//     setTransactionState({
//       ...INITIAL_TRANSACTION_STATE,
//       loading: 'Saving NFT data to NFT.Storage...'
//     });
//   } else if (nftMetadataError) {
//     setTransactionState({
//       ...INITIAL_TRANSACTION_STATE,
//       error: `Could not save NFT to NFT.Storage - Aborted minting: \n ${nftMetadataError}`
//     });
//   } else if (nftMetadata) {
//     setTransactionState({
//       ...INITIAL_TRANSACTION_STATE,
//       success: `Saved NFT data to NFT.Storage...!! We created an IPFS CID & made a Filecoin Storage Deal with one call!
//         ${('\n', nftMetadata.data.url)}`
//     });
//   }
// }, [nftMetadata, nftMetadataError, nftMetadataIsLoading]);
