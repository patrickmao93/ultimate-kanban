import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";
import Editable from "components/Editable";
import {
  updateListName,
  updateEditingStatus,
  createList,
  deleteList
} from "actions/lists";

const Board = props => {
  const handleInputClick = id => {
    props.updateEditingStatus(id, true);
  };

  const lists = props.lists.map(list => (
    <List key={list.id} {...list} onDelete={props.deleteList}>
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
      <div className="board__header">Kanban Board</div>
      <div className="board__content">
        {lists}
        <div className="board__content__add" onClick={props.createList}>
          + Add a list
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  lists: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(
  mapStateToProps,
  { updateListName, updateEditingStatus, createList, deleteList }
)(Board);
