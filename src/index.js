import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import App from "./components/App";

import "semantic-ui-css/semantic.min.css";
import "styles/css/index.css";

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
