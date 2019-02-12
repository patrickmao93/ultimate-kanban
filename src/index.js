import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import Root from "./Root";
import App from "./components/App";

import "semantic-ui-css/semantic.min.css";
import "styles/css/index.css";

ReactDOM.render(
  <Root>
    <HashRouter>
      <App />
    </HashRouter>
  </Root>,
  document.getElementById("root")
);
