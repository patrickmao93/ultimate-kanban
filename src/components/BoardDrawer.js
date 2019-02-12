import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import BoardCard from "./BoardCard";
import LinkButton from "./ui/LinkButton";
import ClickCatcher from "./ui/ClickCatcher";
import { pinBoardDrawer } from "actions/ui";

class BoardDrawer extends React.Component {
  renderBoards = () => {
    const { boardIds, boards } = this.props;
    return boardIds.map(boardId => (
      <Link to={`/${boardId}`} key={boardId}>
        <BoardCard {...boards[boardId]} onClick={this.props.onDismiss} />
      </Link>
    ));
  };

  renderButtons = () => {
    const { pinned, pinBoardDrawer } = this.props;
    if (pinned) {
      return (
        <LinkButton
          content="Don't keep this menu open"
          onClick={() => pinBoardDrawer(!pinned)}
        />
      );
    }
    return (
      <LinkButton
        content="Always keep this menu open"
        onClick={() => pinBoardDrawer(!pinned)}
      />
    );
  };

  render() {
    const { pinned } = this.props;
    const className = pinned
      ? "board-drawer board-drawer--pinned"
      : "board-drawer";

    return ReactDOM.createPortal(
      <div className={className}>
        <div className="board-drawer__header">
          <span>Boards</span>
        </div>
        <div className="board-drawer__content">
          <Input
            className="board-drawer__content__search"
            fluid
            placeholder="Find boards by name..."
          />
          <div className="board-drawer__content__boards">
            {this.renderBoards()}
          </div>
          <div className="board-drawer__content__buttons">
            {this.renderButtons()}
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

export default connect(
  mapStateToProps,
  { pinBoardDrawer }
)(BoardDrawer);
