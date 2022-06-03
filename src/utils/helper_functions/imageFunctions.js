import { ipfsHttpGatewayLink } from '../consts';

//would be good to be able to check this
/* Helper function - manipulating the returned CID into a http link using IPFS gateway */
export const createIPFSgatewayLink = (el) => {
  const link = el[1].split('/');
  const fetchURL = `https://${link[2]}${ipfsHttpGatewayLink}${link[3]}`;
  return fetchURL;
};

/* 
    Helper function for fetching the Filecoin data through IPFS gateways 
    to display the images in the UI 
    Needs to be a hook with loading state
  */
export const createImageURLsForRetrieval = async (limit, collection) => {
  if (collection.length < 1) return;
  // only return the 5 most recent NFT images
  // this collection is fetched on webpage load
  const dataCollection = collection
    .slice()
    .reverse()
    .slice(0, limit)
    .map((el) => {
      return el;
    });

  const imgURLs = await Promise.all(
    dataCollection.map(async (el) => {
      const ipfsGatewayLink = createIPFSgatewayLink(el);
      const response = await fetch(ipfsGatewayLink);
      const json = await response.json();
      return json;
    })
  );

  console.log('imgURLs2', imgURLs);
  return imgURLs;
};

export const createImageView = (metadata) => {
  //   console.log('creating image view', metadata);
  const imgViewArray = metadata.data.image.pathname.split('/');
  const imgViewString = `https://${imgViewArray[2]}${ipfsHttpGatewayLink}${imgViewArray[3]}`;
  return imgViewString;
};
