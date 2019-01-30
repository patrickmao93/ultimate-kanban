import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import App from "./components/App";
import initialState from "initialState";

import "reset-css";
import "styles/css/index.css";

ReactDOM.render(
  <Root initialState={initialState}>
    <App />
  </Root>,
  document.getElementById("root")
);
