import React from 'react';
import { MoralisProvider } from 'react-moralis';
import './styles/index.css';
import App from './archived/App';
import Home from './Home';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* <ProviderContext> */}
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
      appId={process.env.REACT_APP_MORALIS_APP_ID}>
      <Home />
    </MoralisProvider>
    {/* </ProviderContext> */}
  </React.StrictMode>
);
