import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ link, description, ...props }) => {
  return (
    <p>
      <a className="footer-text" href={link} target="_blank" rel="noreferrer">
        {description}
      </a>
    </p>
  );
};

Link.propTypes = {
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Link;
