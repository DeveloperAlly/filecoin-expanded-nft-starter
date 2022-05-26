import React from 'react';
import PropTypes from 'prop-types';

const MintNFTInput = ({ ...props }) => {
  let { name, setName, transactionState, createNFTData } = props;
  return (
    <div>
      <p>
        <input
          className="input"
          placeholder="Enter your name"
          type="text"
          // pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <button
        onClick={createNFTData}
        className={
          name ? 'cta-button connect-wallet-button' : 'cta-button connect-wallet-button-disabled'
        }
        disabled={!name || transactionState.loading}>
        Mint NFT
      </button>
    </div>
  );
};

MintNFTInput.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
  createNFTData: PropTypes.func,
  transactionState: PropTypes.shape({
    loading: PropTypes.string
  })
};

export default MintNFTInput;
