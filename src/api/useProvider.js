// if ethereum, use this
// else use the server provider (moralis, infura etc)
// & ask them to install a wallet
import { useState } from 'react';
import { ethers } from 'ethers';

// This should connect to the correct chain.

const useProvider = (chain) => {
  const [provider, setProvider] = useState(null);
  // use chain to change the chain
  const { ethereum } = window;
  if (ethereum) {
    setProvider(new ethers.providers.Web3Provider(ethereum));
  } else {
    setProvider(
      new ethers.providers.JsonRpcProvider([process.env.REACT_APP_RINKEBY_RPC_URL, 'rinkeby'])
    );
  }
  return provider;
};

export default useProvider;
