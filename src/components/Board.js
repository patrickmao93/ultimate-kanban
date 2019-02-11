import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";
import Editable from "components/ui/Editable";
import AddListButton from "components/AddListButton";
import { updateList, createList, deleteList } from "actions/lists";
import { deleteCard } from "actions/cards";

const Board = props => {
  const id = props.match.params.id;

  const handleNameClick = id => {
    props.updateList(id, true);
  };

  const handleDeleteList = listId => {
    const list = props.lists[listId];
    list.cardIds.forEach(cardId => props.deleteCard(cardId));
    props.deleteList(id, listId);
  };

  const renderLists = () => {
    const { boards, lists } = props;
    return boards[id].listIds.map(listId => {
      const list = lists[listId];
      return (
        <List
          key={list.id}
          {...list}
          onDelete={() => handleDeleteList(list.id)}
        >
          <Editable
            id={list.id}
            content={list.name}
            editing={list.editing}
            onClick={() => props.updateList(list.id, list.name, true)}
            onEdit={props.updateList}
          />
        </List>
      );
    });
  };

  return (
    <div className="board">
      <div className="board__header">
        <Editable
          className="board__header__board-name"
          onInputClick={handleNameClick}
          onEdit={props.updateListName}
          content="tasks"
        />
      </div>
      <div className="board__content">
        {renderLists()}
        <div className="board__content__add">
          <AddListButton
            open={
              props.addListEditor.open && id === props.addListEditor.boardId
            }
            boardId={id}
          />
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  lists: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boards: state.boards,
  lists: state.lists,
  addListEditor: state.ui.addListEditor
});

export default connect(
  mapStateToProps,
  { updateList, createList, deleteList, deleteCard }
)(Board);
