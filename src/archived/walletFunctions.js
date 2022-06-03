import { useEffect, useState, useCallback } from 'react';

// //Not sure why this doesn't return values
// export const useWalletRequest = async (requestName, immediate = true) => {
//   const [response, setResponse] = useState(null);
//   const [status, setStatus] = useState(true);
//   const [error, setError] = useState(null);
//   const { ethereum } = window;

//   useEffect(() => {
//     makeRequest();
//   }, []);

//   const makeRequest = async () => {
//     console.log(`Fetching Request ${requestName}...`);
//     setStatus('pending');
//     if (ethereum) {
//       await window.ethereum
//         .request({
//           method: requestName
//         })
//         .then((resp) => {
//           setResponse(resp);
//         })
//         .catch((err) => {
//           setError(err);
//         })
//         .finally(() => {
//           setStatus('done');
//         });
//     }
//   };

//   //   const makeRequest = useCallback(() => {
//   //     setStatus('Fetching...');
//   //     setResponse(null);
//   //     setError(null);
//   //     return window.ethereum
//   //       .request({
//   //         method: requestName
//   //       })
//   //       .then((response) => {
//   //         setResponse(response);
//   //         setStatus('success');
//   //       })
//   //       .catch((error) => {
//   //         setError(error);
//   //         setStatus('error');
//   //       });
//   //   }, [requestName]);

//   console.log(response, status, error);
//   return { response, status, error, makeRequest };
// };

const useFetchWalletAccounts = async () => {
  const [accounts, setAccounts] = useState(null);
  const [accountsError, setAccountsError] = useState(null);
  const [accountsStatus, setAccountsStatus] = useState(null);
  const [isCompleted, setIsCompleted] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    fetchWalletAccounts();
  }, []);

  const fetchWalletAccounts = async () => {
    console.log('Fetching Accounts...');
    setAccountsStatus(true);
    if (ethereum) {
      await ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('got accounts', accounts);
          setAccounts(accounts);
        })
        .catch((err) => {
          setAccountsError(err);
        })
        .finally(() => {
          setAccountsStatus('done');
          setIsCompleted(true);
        });
    }
  };
  return fetchWalletAccounts, { accounts, accountsError, accountsStatus, isCompleted };
};

// const fetchChain = () => {};
export default useFetchWalletAccounts;
