import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "components/List";

const Board = props => {
  const lists = props.lists.map(list => <List key={list.id} {...list} />);
  return (
    <div className="board">
      <div className="board__header">Kanban Board</div>
      <div className="board__content">{lists}</div>
    </div>
  );
};

Board.propTypes = {
  lists: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Board);
