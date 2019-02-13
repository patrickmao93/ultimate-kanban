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

class App extends React.Component {
  handleCreateBoard = content => {
    const { payload } = this.props.createBoard(content);
    this.props.toggleCreateBoardModal(false);
    this.props.history.push(`/${payload.boardId}`);
  };

  createBoardModal = (
    <Overlay onDismiss={() => this.props.toggleCreateBoardModal(false)}>
      <CreateBoardModal onSubmit={this.handleCreateBoard} />
    </Overlay>
  );

  render() {
    const className = this.props.pinned ? "app app--drawer-pinned" : "app";
    return (
      <div className={className}>
        <div id="clickCatcher" />
        <AppBar />
        <Content />
        {this.props.createBoardModal.open && this.createBoardModal}
      </div>
    );
  }
}

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
