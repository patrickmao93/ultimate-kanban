import React from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { withRouter } from "react-router-dom";

import AppBar from "components/AppBar";
import Content from "components/Content";

const App = props => {
  const className = props.pinned ? "app app--drawer-pinned" : "app";
  return (
    <div className={className}>
      <AppBar />
      <Content />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    boards: state.boards,
    pinned: state.ui.boardDrawer.pinned
  };
};

export default withRouter(
  DragDropContext(HTML5Backend)(connect(mapStateToProps)(App))
);
