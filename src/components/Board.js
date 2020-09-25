import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import List from "components/List";
import Editable from "components/ui/Editable";
import AddListButton from "components/AddListButton";
import { updateList, createList, deleteList } from "actions/lists";
import { updateBoard } from "actions/boards";
import { deleteCard } from "actions/cards";

class Board extends React.Component {
  boardId = this.props.match.params.id;

  handleNameClick = () => {
    const name = this.props.boards[this.boardId].name;
    this.props.updateBoard(this.boardId, name, true);
  };

  handleDeleteList = listId => {
    const list = this.props.lists[listId];
    list.cardIds.forEach(cardId => this.props.deleteCard(listId, cardId));
    this.props.deleteList(this.boardId, listId);
  };

  renderLists = () => {
    const { boards, lists } = this.props;
    return boards[this.boardId].listIds.map(listId => {
      const list = lists[listId];
      return (
        <List key={list.id} {...list} onDelete={() => this.handleDeleteList(list.id)}>
          <Editable
            id={list.id}
            content={list.name}
            editing={list.editing}
            onClick={() => this.props.updateList(list.id, list.name, true)}
            onEdit={this.props.updateList}
          />
        </List>
      );
    });
  };

  render() {
    const board = this.props.boards[this.boardId];
    if (!board) {
      return <Redirect to="/" />;
    }
    const { name, editing } = board;

    return (
      <div className="board">
        <div className="board__header">
          <Editable
            className="board__header__board-name"
            id={this.boardId}
            onClick={this.handleNameClick}
            editing={editing}
            onEdit={this.props.updateBoard}
            content={name}
          />
        </div>
        <div className="board__content">
          {this.renderLists()}
          <div className="board__content__add">
            <AddListButton
              open={this.props.addListEditor.open && this.boardId === this.props.addListEditor.boardId}
              boardId={this.boardId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.boards.boards,
  lists: state.lists,
  addListEditor: state.ui.addListEditor,
});

export default connect(
  mapStateToProps,
  { updateList, createList, deleteList, deleteCard, updateBoard }
)(Board);
