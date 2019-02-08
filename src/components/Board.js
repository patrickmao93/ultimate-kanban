import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";
import Editable from "components/Editable";
import AddListButton from "components/AddListButton";
import {
  updateListName,
  updateEditingStatus,
  createList,
  deleteList
} from "actions/lists";
import { deleteCard } from "actions/cards";

const Board = props => {
  const handleInputClick = id => {
    props.updateEditingStatus(id, true);
  };

  const handleDeleteList = id => {
    const list = props.lists.find(list => list.id === id);
    list.cardIds.forEach(cardId => props.deleteCard(cardId));
    props.deleteList(id);
  };

  const lists = props.lists.map(list => (
    <List key={list.id} {...list} onDelete={() => handleDeleteList(list.id)}>
      <Editable
        id={list.id}
        content={list.name}
        editing={list.editing}
        onInputClick={handleInputClick}
        onEdit={props.updateListName}
      />
    </List>
  ));
  return (
    <div className="board">
      <div className="board__header">React/Redux Kanban</div>
      <div className="board__content">
        {lists}
        <div className="board__content__add">
          <AddListButton open={props.addListBox.open} />
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  lists: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists,
  addListBox: state.ui.addListBox
});

export default connect(
  mapStateToProps,
  { updateListName, updateEditingStatus, createList, deleteList, deleteCard }
)(Board);
