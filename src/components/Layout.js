import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ConnectWalletButton from './ConnectWalletButton';
import { mainDetails } from '../utils/names';
const { href, imageAlt, logo } = mainDetails;
import PropTypes from 'prop-types';

// Todo: change the tagging here to generic inputs
const Layout = ({ connectWallet, connected, ...props }) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-menu-container">
          <a href={href} target="_blank" rel="noreferrer">
            <img alt={imageAlt} style={{ height: '50px' }} src={logo} />
          </a>
          <ConnectWalletButton connected={connected} connectWallet={connectWallet} />
        </div>
        <div className="header-container">
          <Header />
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  connectWallet: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  children: PropTypes.any
};

export default Layout;
