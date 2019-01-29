import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

import Root from "./Root";
import App from "./components/App";

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: orange
  }
});

ReactDOM.render(
  <Root>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Root>,
  document.getElementById("root")
);
