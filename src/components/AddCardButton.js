import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import Editor from "components/ui/Editor";
import { openAddCardBox, closeAddCardBox } from "actions/ui";
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
      onClick={() => props.openAddCardBox(props.listId)}
    >
      <Icon name="plus" />
      <span>Add another card</span>
    </button>
  );

  const box = (
    <Editor
      placeholder="Enter a title for this card..."
      onSubmit={handleCreateCard}
      onDismiss={props.closeAddCardBox}
      limit={80}
    >
      <Editor.TextArea autoHeight />
      <Editor.Button content="Add Card" />
    </Editor>
  );

  return props.open ? box : button;
};

export default connect(
  null,
  { openAddCardBox, closeAddCardBox, createCard, attachToList }
)(AddList);
