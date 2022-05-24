import React from "react";
import BuildspaceLogo from "../assets/BuildspaceLogo.svg"
import buildspace_logo from "../assets/buildspace_logo.png"

const Header = () => {
  return (
    <>
      <a
        href="https://hackathons.filecoin.io/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="NFTHack Logo"
          style={{ height: "100px" }}
          src={buildspace_logo}
        ></img>
      </a>
      <p className="header gradient-text">Buildspace Women NFTs</p>
      <p className="sub-text">
        100 personalised NFTs for Filecoin @ Buildspace Women 2022
      </p>
    </>
  );
};

export default Header;
