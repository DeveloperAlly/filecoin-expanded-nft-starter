import React from 'react';
import PropTypes from 'prop-types';

const ConnectWalletButton = ({ connectWallet, ...props }) => {
  return (
    <button onClick={connectWallet} className="cta-button connect-to-wallet-button">
      Connect to Wallet
    </button>
  );
};

ConnectWalletButton.propTypes = {
  connectWallet: PropTypes.string.isRequired
};

export default ConnectWalletButton;
