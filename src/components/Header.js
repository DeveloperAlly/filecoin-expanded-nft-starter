import React from "react";
import nftHackLogo from "../assets/nfthack-logo.svg";
import hackMakerLogo from "../assets/hackmaker_logo.jpeg";
import gitcoinLogo from "../assets/gitcoin.png";
import phoenixLogo from "../assets/phoenixguildLogo.jpg"

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
          style={{ height: "200px" }}
          src={phoenixLogo}
        ></img>
      </a>
      <p className="header gradient-text">Phoenix Guild NFT Collection</p>
      <p className="sub-text">
        100 personalised NFTs for Filecoin @ EthGlobal NFTHack 2022
      </p>
    </>
  );
};

export default Header;
