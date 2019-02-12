import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";

import BoardCard from "./BoardCard";
import ClickCatcher from "./ui/ClickCatcher";

class BoardDrawer extends React.Component {
  renderBoards = () => {
    const { boardIds, boards } = this.props;
    return boardIds.map(boardId => (
      <BoardCard key={boardId} {...boards[boardId]} />
    ));
  };

  render() {
    return ReactDOM.createPortal(
      <div className="board-drawer">
        <div className="board-drawer__content">
          <Input
            className="board-drawer__content__search"
            fluid
            placeholder="Find boards by name..."
          />
          <div className="board-drawer__content__boards">
            {this.renderBoards()}
          </div>
        </div>
        <ClickCatcher onDismiss={this.props.onDismiss} />
      </div>,
      document.getElementById("drawer")
    );
  }
}

const mapStateToProps = state => {
  return {
    boardIds: state.boards._boards,
    boards: state.boards
  };
};

export default connect(mapStateToProps)(BoardDrawer);
