import React, { useState, useEffect, ErrorBoundary } from 'react';
import { CHAIN_MAPPINGS } from '../../utils/consts';
// const useWalletFunctions = () => {
const { ethereum } = window;
// const [userWallet, setUserWallet] = useState({ accounts: [], chainId: null });

// useEffect(() => {}, [userWallet]);

export const checkForWalletConnection = async (userWallet, setUserWallet) => {
  //function returns an empty array if wallet not connected
  if (ethereum) {
    console.log('Checking for Wallet...');
    await ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        console.log('Wallet found');
        setUserWallet({ ...userWallet, accounts });
      })
      .catch((err) => {
        console.log('Error fetching wallet', err);
      });
  } else {
    setUserWallet({ accounts: [], chainId: null });
  }
};

/* Connect a wallet - only do this when user clicks wallet connection*/
// export const connectWallet = async (userWallet, setUserWallet) => {
//   console.log('Connecting to a wallet...');
//   if (ethereum) {
//     await ethereum
//       .request({ method: 'eth_requestAccounts' })
//       .then((accounts) => {
//         console.log('Got wallet accounts', accounts);
//         setUserWallet({ ...userWallet, accounts });
//         // setWalletListeners(); // unecessary
//       })
//       .catch((err) => {
//         console.log('Error fetching accounts', err);
//       });
//   }
// };

export const setWalletListeners = (userWallet, setUserWallet) => {
  if (ethereum) {
    // subscribe to provider events compatible with EIP-1193 standard.
    ethereum.on('accountsChanged', (accounts) => {
      console.log('wallet: accounts', accounts);
      //logic to check if disconnected accounts[] is empty
      setUserWallet({ ...userWallet, accounts });
    });

    // Subscribe to chainId change
    ethereum.on('chainChanged', (chainId) => {
      console.log('wallet: chainId', chainId);
      setUserWallet({ ...userWallet, chainId });
    });
  }
};

export const checkWalletChain = async (chainId, chainChoice) => {
  console.log('Checking wallet chain...');
  //returns a boolean if this matches the contract desired
  //     // String, hex code of the chainId of the Rinkebey test network
  const rinkebyChainId = '0x4';
  // if (chainId !== rinkebyChainId) {
  if (CHAIN_MAPPINGS[chainChoice].chainId !== chainId) {
    changeWalletChain(CHAIN_MAPPINGS[chainChoice].chainId);
    return false;
    // alert("You are not connected to the Rinkeby Test Network!");
  } else {
    return true;
  }
  //   };
};

export const changeWalletChain = async (newChainId) => {
  console.log('Changing wallet chain...');
  const provider = window.ethereum;
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: newChainId.toString() }] //newChainId
    });
  } catch (error) {
    alert(error.message);
  }
};

//   return checkForConnection, setWalletListeners, connectWallet, { userWallet, setUserWallet };
// };

// export default useWalletFunctions;
