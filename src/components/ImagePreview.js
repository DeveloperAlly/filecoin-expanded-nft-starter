import React from 'react';
import PropTypes from 'prop-types';

const ImagePreview = ({ imgLink, preview, ...props }) => {
  return (
    <div style={{ marginTop: '20px', display: 'contents' }}>
      <img
        src={imgLink}
        alt="NFT image view"
        height="200px"
        style={{
          backgroundColor: 'black',
          border: `${preview && '1px solid white'}`,
          padding: '5px'
        }}
      />
    </div>
  );
};

ImagePreview.propTypes = {
  imgLink: PropTypes.string.isRequired,
  preview: PropTypes.string
};

export default ImagePreview;
