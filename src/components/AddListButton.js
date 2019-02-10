import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { openAddListEditor, closeAddListEditor } from "actions/ui";
import { createList } from "actions/lists";
import Editor from "components/ui/Editor";

const AddList = props => {
  const button = (
    <button className="add-list__button" onClick={props.openAddListEditor}>
      <Icon name="plus" /> Add another list
    </button>
  );

  const editor = (
    <Editor
      className="add-list__editor"
      placeholder="Enter list title..."
      onSubmit={props.createList}
      onDismiss={props.closeAddListEditor}
      limit={25}
    >
      <Editor.Input fluid autoFocus />
      <Editor.Button content="Add List" />
    </Editor>
  );

  return <div className="add-list">{props.open ? editor : button}</div>;
};

export default connect(
  null,
  { openAddListEditor, closeAddListEditor, createList }
)(AddList);
