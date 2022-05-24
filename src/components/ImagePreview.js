import React from "react";

const ImagePreview = ({imgLink, ...props}) => {
return(
    <div style={{marginTop: "20px"}}>
      <img
        src={imgLink}
        alt="NFT image preview"
        height="200px"
        width="200px"
        style={{ backgroundColor: "black", border: "1px solid white" }}
      />
    </div>)
}

export default ImagePreview;