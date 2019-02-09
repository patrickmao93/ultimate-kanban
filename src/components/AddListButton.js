import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import ComposerBox from "components/ui/ComposerBox";
import { openAddListBox, closeAddListBox } from "actions/ui";
import { createList } from "actions/lists";

const AddList = props => {
  const button = (
    <button
      className="board__content__add__button"
      onClick={props.openAddListBox}
    >
      <Icon name="plus" /> Add another list
    </button>
  );

  const box = (
    <ComposerBox
      placeholder="Enter list title..."
      onSubmit={props.createList}
      onDismiss={props.closeAddListBox}
      buttonText="Add List"
      type="input"
      limit={25}
    />
  );

  return props.open ? box : button;
};

export default connect(
  null,
  { openAddListBox, closeAddListBox, createList }
)(AddList);
