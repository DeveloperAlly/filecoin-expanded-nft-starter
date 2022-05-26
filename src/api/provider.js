// if ethereum, use this
// else use the server provider (moralis, infura etc)
// & ask them to install a wallet
import { ethers, providers } from 'ethers';

const Provider = () => {
  const { ethereum } = window;
  let provider = new ethers();
  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
  }
  return provider;
};

export default Provider;
