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

  const renderDrawer = () => {
    const { pinned, open } = props.boardDrawer;
    if (pinned) {
      return <BoardDrawer pinned={pinned} />;
    }
    if (open) {
      return (
        <BoardDrawer
          pinned={pinned}
          onDismiss={() => props.toggleBoardDrawer(false)}
        />
      );
    }
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
      {renderDrawer()}
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
