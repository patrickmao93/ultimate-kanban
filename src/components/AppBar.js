import React from "react";
import { Button, Icon } from "semantic-ui-react";

const AppBar = props => {
  return (
    <header className="app-bar">
      <Button className="app-bar__boards-button" primary>
        <Icon name="square" />
        Boards
      </Button>
      <div className="app-bar__logo" />
    </header>
  );
};

export default AppBar;
