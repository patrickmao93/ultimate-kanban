import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import ComposerBox from "components/ui/ComposerBox";
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
    <ComposerBox
      className="list__content__composer"
      placeholder="Enter a title for this card..."
      onSubmit={handleCreateCard}
      onDismiss={props.closeAddCardBox}
      buttonText="Add Card"
      type="textarea"
      limit={80}
    />
  );

  return props.open ? box : button;
};

export default connect(
  null,
  { openAddCardBox, closeAddCardBox, createCard, attachToList }
)(AddList);
