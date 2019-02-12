import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import BoardDrawer from "./BoardDrawer";
import { toggleBoardDrawer } from "./../actions/ui";

const AppBar = props => {
  const handleDrawerClick = () => {
    if (props.boardDrawer.open) {
      return props.toggleBoardDrawer(false);
    }
    props.toggleBoardDrawer(true);
  };

  return (
    <header className="app-bar">
      <Button
        className="app-bar__boards-button"
        primary
        onClick={handleDrawerClick}
      >
        <Icon name="square" />
        Boards
      </Button>
      <div className="app-bar__logo" />
      {props.boardDrawer.open && (
        <BoardDrawer onDismiss={() => props.toggleBoardDrawer(false)} />
      )}
    </header>
  );
};

const mapStateToProps = state => {
  return {
    boardDrawer: state.ui.boardDrawer
  };
};

export default connect(
  mapStateToProps,
  { toggleBoardDrawer }
)(AppBar);
