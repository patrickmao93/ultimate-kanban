import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import Editor from "components/ui/Editor";
import { openAddCardEditor, closeAddCardEditor } from "actions/ui";
import { createCard } from "actions/cards";
import { attachToList } from "actions/lists";

const AddList = props => {
  const { listId } = props;

  const handleCreateCard = content => {
    const card = props.createCard(content);
    props.attachToList(card.payload.id, listId);
  };

  const button = (
    <button
      className="list__content__button"
      onClick={() => props.openAddCardEditor(props.listId)}
    >
      <Icon name="plus" />
      <span>Add another card</span>
    </button>
  );

  const editor = (
    <Editor
      placeholder="Enter a title for this card..."
      onSubmit={handleCreateCard}
      onDismiss={props.closeAddCardEditor}
      limit={80}
    >
      <Editor.TextArea autoHeight autoFocus />
      <Editor.Button content="Add Card" />
    </Editor>
  );

  return props.open ? editor : button;
};

export default connect(
  null,
  { openAddCardEditor, closeAddCardEditor, createCard, attachToList }
)(AddList);
