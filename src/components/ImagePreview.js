import React from "react";

const ImagePreview = ({imgLink, ...props}) => {
return(
    <div style={{marginTop: "20px", display:"contents"}}>
      <img
        src={imgLink}
        alt="NFT image preview"
        height="200px"
        style={{ backgroundColor: "black", border: `${props.preview && "1px solid white"}`, padding: "5px"}}
      />
    </div>)
}

export default ImagePreview;