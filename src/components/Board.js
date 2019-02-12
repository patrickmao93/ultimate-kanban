import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";
import Editable from "components/ui/Editable";
import AddListButton from "components/AddListButton";
import { updateList, createList, deleteList } from "actions/lists";
import { updateBoard } from "actions/boards";
import { deleteCard } from "actions/cards";

class Board extends React.Component {
  handleNameClick = () => {
    const id = this.props.match.params.id;
    const name = this.props.boards[id].name;
    this.props.updateBoard(id, name, true);
  };

  handleDeleteList = listId => {
    const id = this.props.match.params.id;
    const list = this.props.lists[listId];
    list.cardIds.forEach(cardId => this.props.deleteCard(cardId));
    this.props.deleteList(id, listId);
  };

  renderLists = () => {
    const id = this.props.match.params.id;
    const { boards, lists } = this.props;
    return boards[id].listIds.map(listId => {
      const list = lists[listId];
      return (
        <List
          key={list.id}
          {...list}
          onDelete={() => this.handleDeleteList(list.id)}
        >
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
    const id = this.props.match.params.id;
    const board = this.props.boards[id];
    const { name, editing } = board;

    return (
      <div className="board">
        <div className="board__header">
          <Editable
            className="board__header__board-name"
            id={id}
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
              open={
                this.props.addListEditor.open &&
                id === this.props.addListEditor.boardId
              }
              boardId={id}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.boards,
  lists: state.lists,
  addListEditor: state.ui.addListEditor
});

export default connect(
  mapStateToProps,
  { updateList, createList, deleteList, deleteCard, updateBoard }
)(Board);
