import React from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { withRouter } from "react-router-dom";

import AppBar from "components/AppBar";
import Content from "components/Content";
import CreateBoardModal from "./CreateBoardModal";
import Overlay from "./ui/Overlay";
import { toggleCreateBoardModal } from "./../actions/ui";
import { createBoard } from "./../actions/boards";

const App = props => {
  const className = props.pinned ? "app app--drawer-pinned" : "app";

  const handleCreateBoard = content => {
    props.createBoard(content);
    props.toggleCreateBoardModal(false);
  };

  const createBoardModal = (
    <Overlay onDismiss={() => props.toggleCreateBoardModal(false)}>
      <CreateBoardModal onSubmit={handleCreateBoard} />
    </Overlay>
  );
  return (
    <div className={className}>
      <div id="clickCatcher" />
      <AppBar />
      <Content />
      {props.createBoardModal.open && createBoardModal}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    boards: state.boards,
    pinned: state.ui.boardDrawer.pinned,
    createBoardModal: state.ui.createBoardModal
  };
};

export default withRouter(
  DragDropContext(HTML5Backend)(
    connect(
      mapStateToProps,
      { toggleCreateBoardModal, createBoard }
    )(App)
  )
);
