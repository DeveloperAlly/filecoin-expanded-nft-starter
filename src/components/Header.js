import React from 'react';
import { headerDetails } from '../utils/names';
const { href, name, title, imageAlt, logo } = headerDetails;

const Header = () => {
  return (
    <>
      <a href={href} target="_blank" rel="noreferrer">
        <img alt={imageAlt} style={{ height: '100px' }} src={logo}></img>
      </a>
      <p className="header gradient-text">{name}</p>
      <p className="sub-text">{title}</p>
    </>
  );
};

export default Header;
