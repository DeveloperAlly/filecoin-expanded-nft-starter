import React, { useState, useEffect, ErrorBoundary } from 'react';

const useWalletFunctions = () => {
  const { ethereum } = window;
  const [userWallet, setUserWallet] = useState({ accounts: [], chainId: null });

  useEffect(() => {}, [userWallet]);

  const checkForConnection = async () => {
    //function returns an empty array if wallet not connected
    await ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        console.log('got accounts', accounts);
        setUserWallet({ ...userWallet, accounts });
      })
      .catch((err) => {
        console.log('error fetching accounts');
      });
  };

  const connectWallet = async () => {
    console.log('connecting to a wallet');
    if (ethereum) {
      await ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('got accounts', accounts);
          setUserWallet({ ...userWallet, accounts });
          // setWalletListeners(); // unecessary
        })
        .catch((err) => {
          console.log('error fetching accounts');
        });
    }
    // try {
    //   if (!ethereum) {
    //     //better to show this on the button
    //     alert('Get MetaMask!');
    //     return;
    //   }
    //   setWalletListener();
    //   console.log('Fetching user Accounts');
    //   enableWeb3().then((data) => {
    //     console.log('web3 enabled', data);
    //   });
    // accountRequest()
    //   .then((accounts) => {
    //     setCurrentAccount(accounts[0]);
    //     setUserWallet({ ...userWallet, accounts });
    //   })
    //   .catch((err) => {
    //     setTransactionState({
    //       ...transactionState,
    //       error: `Error getting wallet accounts: ${err}`
    //     });
    //   });
    //   chainIdRequest().then((chainId) => {
    //     setUserWallet({ ...userWallet, chainId }).catch((err) => {
    //       setTransactionState({
    //         ...transactionState,
    //         error: `Error getting wallet chainId: ${err}`
    //       });
    //     });
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const setWalletListeners = () => {
    console.log('user wallet', userWallet);
    // let provider = new ethers.providers.JsonRpcProvider([
    //   process.env.REACT_APP_RINKEBY_RPC_URL,
    //   'rinkeby'
    // ]);
    // const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    // subscribe to provider events compatible with EIP-1193 standard.
    ethereum.on('accountsChanged', (accounts) => {
      console.log('wallet: accounts', accounts);
      //logic to check if disconnected accounts[] is empty
      setUserWallet({ ...userWallet, accounts });
    });

    // Subscribe to chainId change
    ethereum.on('chainChanged', (chainId) => {
      console.log('wallet: chainId', chainId);
      console.log('userWallet', userWallet);
      setUserWallet({ ...userWallet, chainId });
    });

    // These have nothing to do with wallet - contracts only
    // // Subscribe to provider connection
    // provider.on('connect', (info) => {
    //   //info : { chainId: number }
    //   console.log('wallet: connect', info);
    // });

    // // Subscribe to provider disconnection
    // provider.on('disconnect', (error) => {
    //   //error: : { code: number; message: string }
    //   console.log('wallet: disconnect', error);
    // });
  };

  return checkForConnection, setWalletListeners, connectWallet, { userWallet, setUserWallet };
};

export default useWalletFunctions;
