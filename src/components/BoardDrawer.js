import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

import BoardCard from "./BoardCard";
import LinkButton from "./ui/LinkButton";
import ClickCatcher from "./ui/ClickCatcher";
import { pinBoardDrawer, toggleCreateBoardModal } from "actions/ui";

const formatString = str => {
  if (typeof str !== "string") {
    throw new Error("input need to be string");
  }
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .join("");
};

class BoardDrawer extends React.Component {
  boards = Object.values(this.props.boards);
  state = {
    filteredBoardIds: this.props.boardIds,
    keyword: ""
  };

  handleSearch = e => {
    this.setState({ keyword: e.target.value }, () => {
      const keyword = formatString(this.state.keyword);
      if (keyword === "") {
        return this.setState({ filteredBoardIds: this.props.boardIds });
      }
      const filteredBoardIds = this.boards
        .filter(board => formatString(board.name).includes(keyword))
        .map(board => board.id);
      this.setState({ filteredBoardIds });
    });
  };

  renderBoards = () => {
    const { boards } = this.props;
    return this.state.filteredBoardIds.map(boardId => (
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
            <Input
              fluid
              placeholder="Find boards by name..."
              value={this.state.keyword}
              onChange={this.handleSearch}
            />
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
    boardIds: state.boards.boardIds,
    boards: state.boards.boards
  };
};

export default connect(
  mapStateToProps,
  { pinBoardDrawer, toggleCreateBoardModal }
)(BoardDrawer);
