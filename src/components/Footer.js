import React from 'react';
import { authorDetails } from '../utils/names';
const { name, href, imageAlt, logo } = authorDetails;
// import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <div className="footer-container-twitter">
      <img alt={imageAlt} className="twitter-logo" src={logo} />
      <a className="footer-text" href={href} target="_blank" rel="noreferrer">
        {name}
      </a>
    </div>
  );
};

export default Footer;
