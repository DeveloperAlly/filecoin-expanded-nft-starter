/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import { changeWalletChain } from '../utils/helper_functions/wallet_functions';
import { CHAIN_MAPPINGS } from '../utils/consts';
//Not how to do it! but it works for now
const chainArray = Object.values(CHAIN_MAPPINGS);
const chainMap = {
  Rinkeby: 'rinkeby',
  'Polygon Testnet': 'polygon_test',
  'BSC Testnet': 'bsc_test'
};

//destructure Button takes {action, chainName}
const ChooseChain = ({ chainChoice, setChainChoice, setContractOptions }) => {
  const activeStyle = 'cta-button chain-button';
  const inactiveStyle = 'cta-button chain-button-inactive';

  const changeContractOptions = (chain) => {
    setChainChoice(chain);
    setContractOptions(CHAIN_MAPPINGS[chain]);
  };

  const createChainButton = (params) => {
    const classname =
      params.displayName && chainMap[params.displayName] === chainChoice
        ? activeStyle
        : inactiveStyle;
    return (
      <div style={{ padding: '20px' }} key={chainMap[params.displayName]}>
        <button
          className={classname}
          onClick={() => {
            changeContractOptions(chainMap[params.displayName]);
          }}>
          {params.displayName}
        </button>
      </div>
    );
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '20px' }}>
      {chainArray.map((vals) => {
        return createChainButton(vals);
      })}
      {/* <button>Mint on All!</button> */}
    </div>
  );
};

ChooseChain.propTypes = {
  chainChoice: PropTypes.string,
  setChainChoice: PropTypes.func,
  setContractOptions: PropTypes.func
};

export default ChooseChain;
