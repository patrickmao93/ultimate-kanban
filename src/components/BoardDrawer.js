import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import BoardCard from "./BoardCard";
import LinkButton from "./ui/LinkButton";
import ClickCatcher from "./ui/ClickCatcher";
import { pinBoardDrawer, toggleCreateBoardModal } from "actions/ui";

class BoardDrawer extends React.Component {
  renderBoards = () => {
    const { boardIds, boards } = this.props;
    return boardIds.map(boardId => (
      <Link to={`/${boardId}`} key={boardId}>
        <BoardCard {...boards[boardId]} onClick={this.props.onDismiss} />
      </Link>
    ));
  };

  renderPinToggleButton = () => {
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
    const { pinned, toggleCreateBoardModal } = this.props;
    const className = pinned ? "board-drawer--pinned" : "";

    return ReactDOM.createPortal(
      <div className={`board-drawer ${className}`}>
        <div className={`board-drawer__header ${className}`}>
          <span>Boards</span>
        </div>
        <div className="board-drawer__content">
          <div className="board-drawer__content__search">
            <Input fluid placeholder="Find boards by name..." />
          </div>
          <div className="board-drawer__content__boards">
            {this.renderBoards()}
          </div>
          <div className="board-drawer__content__buttons">
            <LinkButton
              content="Create new board..."
              onClick={() => toggleCreateBoardModal(true)}
            />
            {this.renderPinToggleButton()}
          </div>
        </div>
        {pinned || <ClickCatcher onDismiss={this.props.onDismiss} />}
        {}
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
  { pinBoardDrawer, toggleCreateBoardModal }
)(BoardDrawer);
