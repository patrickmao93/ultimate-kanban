import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import AddBox from "./AddBox";
import { openAddListBox, closeAddListBox } from "actions/ui";
import { createList } from "actions/lists";

const AddList = props => {
  const button = (
    <button className="board__content__add" onClick={props.openAddListBox}>
      + Add a list
    </button>
  );

  const box = (
    <AddBox
      placeholder="Enter list title..."
      onAdd={props.onAdd}
      onDismiss={props.closeAddListBox}
    >
      <Button primary>Add List</Button>
    </AddBox>
  );

  return props.open ? box : button;
};

export default connect(
  null,
  { openAddListBox, closeAddListBox, createList }
)(AddList);
