import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import './styles/index.css';
import App from './App';

// const ProviderContext = createContext('provider');

ReactDOM.render(
  <React.StrictMode>
    {/* <ProviderContext> */}
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
      appId={process.env.REACT_APP_MORALIS_APP_ID}>
      <App />
    </MoralisProvider>
    {/* </ProviderContext> */}
  </React.StrictMode>,
  document.getElementById('root')
);
