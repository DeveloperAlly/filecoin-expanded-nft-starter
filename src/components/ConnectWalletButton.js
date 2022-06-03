import React from 'react';
import PropTypes from 'prop-types';

const ConnectWalletButton = ({ connectWallet, connected, ...props }) => {
  return (
    <>
      {window.ethereum ? (
        <button
          onClick={connectWallet}
          className={
            connected ? 'cta-button connect-wallet-button' : 'cta-button connect-to-wallet-button'
          }>
          {connected ? 'Connected' : 'Connect to Wallet'}
        </button>
      ) : (
        <button
          className="cta-button connect-to-wallet-button"
          onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
          Install Metamask! 🦊
        </button>
      )}
    </>
  );
};

ConnectWalletButton.propTypes = {
  connectWallet: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
};

export default ConnectWalletButton;
