import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

// const ProviderContext = createContext('provider');

ReactDOM.render(
  <React.StrictMode>
    {/* <ProviderContext> */}
    <App />
    {/* </ProviderContext> */}
  </React.StrictMode>,
  document.getElementById('root')
);
