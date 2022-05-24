import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}> */}
    <App />
    {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
