import { useEffect, useState } from 'react';

const fetchAccounts = async () => {
  return await window.ethereum.request({
    method: 'eth_requestAccounts'
  });
};

const fetchChain = () => {};

export const useWalletRequest = async (requestName) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    makeRequest();
  });

  const makeRequest = async () => {
    await window.ethereum
      .request({
        method: requestName
      })
      .then((resp) => {
        setResponse(resp);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { response, isLoading, error, makeRequest };
};
