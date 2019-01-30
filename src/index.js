import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import App from "./components/App";

import "reset-css";
import "styles/css/index.css";

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
