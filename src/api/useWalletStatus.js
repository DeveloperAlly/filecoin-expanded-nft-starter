import React, { useState, useEffect } from 'react';

export const INITIAL_TRANSACTION_STATE = {
  loading: '',
  error: '',
  success: '',
  warning: ''
};

const useWalletStatus = () => {
  // const [data, success, error, warning] = useState(INITIAL_TRANSACTION_STATE);
  const [isError, setIsError] = useState(false);
  const [isConnected, setIsConnected] = useState(null);
  const [accounts, setAccounts] = useState(null); //chain, account
  const [chainId, setChainId] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    if (!ethereum) {
      setIsConnected(false);
      return;
    } else {
      getWalletDetails();
      ethereum.on('chainChanged', (chainId) => {
        location.reload();
        console.log('new chain', chainId);
      });
      ethereum.on('accountsChanged', (accounts) => {
        location.reload();
        console.log('new account', accounts);
      });
      // ethereum.on('');
    }
  });

  useEffect(() => {}, chainId);
  useEffect(() => {}, accounts);

  const connectWallet = () => {};

  const changeChain = () => {
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
    // });
  };

  const getWalletDetails = async () => {
    await ethereum
      .request({
        method: 'eth_requestAccounts'
      })
      .then((accounts) => {
        setAccounts(accounts);
      })
      .catch((err) => {
        setIsError(`Error fetching accounts ${err}`);
      });
    await ethereum
      .request({
        method: 'eth_chainId'
      })
      .then((chainId) => {
        setChainId(chainId);
      })
      .catch((err) => {
        setIsError(`Error getting Chain ID ${err}`);
      });
  };

  return { isConnected, accounts, chainId, isError };
};
