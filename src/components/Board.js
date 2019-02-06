import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";
import Editable from "components/Editable";
import { updateListName, updateEditingStatus } from "actions/lists";

const handleAddList = () => {};

const Board = props => {
  const handleInputClick = id => {
    props.updateEditingStatus(id, true);
  };

  const lists = props.lists.map(list => (
    <List key={list.id} {...list}>
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
        <div className="board__content__add" onClick={handleAddList}>
          <Editable onInputClick={handleInputClick} onEdit={handleAddList} />
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
  { updateListName, updateEditingStatus }
)(Board);
