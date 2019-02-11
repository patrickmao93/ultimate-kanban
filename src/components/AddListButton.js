import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { openAddListEditor, closeAddListEditor } from "actions/ui";
import { createList } from "actions/lists";
import { attachToBoard } from "actions/boards";
import Editor from "components/ui/Editor";

const AddListButton = props => {
  const handleCreateList = listName => {
    const list = props.createList(listName);
    props.attachToBoard(props.boardId, list.payload.id);
  };

  const button = (
    <button
      className="add-list__button"
      onClick={() => props.openAddListEditor(props.boardId)}
    >
      <Icon name="plus" /> Add another list
    </button>
  );

  const editor = (
    <Editor
      className="add-list__editor"
      placeholder="Enter list title..."
      onSubmit={handleCreateList}
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
  { openAddListEditor, closeAddListEditor, createList, attachToBoard }
)(AddListButton);
