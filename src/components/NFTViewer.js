import React from 'react';
import ImagePreview from './ImagePreview.js';
import { ipfsHttpGatewayLink } from '../utils/consts';
import PropTypes from 'prop-types';

//all logic for NFT viewing here
const NFTViewer = ({ recentlyMinted, ...props }) => {
  return (
    <div className="nft-viewer-outer">
      <p className="sub-text">Most Recently Minted</p>
      <div className="nft-viewer-container">
        {recentlyMinted.map((el, idx) => {
          let linkArr = el.image.split('/');
          let link = `https://${linkArr[2]}${ipfsHttpGatewayLink}${linkArr[3]}`;
          return (
            <div className="nft-viewer-column" key={idx}>
              {<ImagePreview imgLink={link} />}
              <p>{el.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

NFTViewer.propTypes = {
  recentlyMinted: PropTypes.array
};

export default NFTViewer;
