import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DropTarget } from "react-dnd";

import Card from "components/Card";
import Editable from "components/Editable";
import { createCard, updateCard, deleteCard } from "actions/cards";
import { attachToList, detachFromList } from "actions/lists";
import * as ItemTypes from "constants/ItemTypes";

const List = props => {
  const { id, cardIds, onDelete, connectDropTarget } = props;

  const handleCreateCard = e => {
    const newCard = props.createCard("New card");
    props.attachToList(newCard.payload.id, id);
  };

  const handleDeleteCard = id => {
    props.deleteCard(id, props.id);
  };

  const handleUpdateCard = (id, content) => {
    const card = {
      id,
      content,
      editing: false
    };

    props.updateCard(card);
  };

  const handleInputClick = id => {
    const card = props.cards.find(card => card.id === id);
    card.editing = true;
    props.updateCard(card);
  };

  const renderCards = () => {
    return cardIds.map(cardId => {
      const cardProps = props.cards.find(card => card.id === cardId);
      return (
        <Card key={cardId} onDelete={handleDeleteCard}>
          <Editable
            {...cardProps}
            onInputClick={handleInputClick}
            onEdit={handleUpdateCard}
          />
        </Card>
      );
    });
  };

  return connectDropTarget(
    <div className="list">
      <div
        className={`list__dragging-over ${props.isOver &&
          "list__dragging-over--active"}`}
      />
      <div className="list__header">
        {props.children}
        <div className="list__header__close" onClick={() => onDelete(id)}>
          <i className="fas fa-times" />
        </div>
      </div>
      <div className="list__content">{renderCards()}</div>
      <div className="list__add">
        <span className="list__add__button" onClick={handleCreateCard}>
          + Add another card
        </span>
      </div>
    </div>
  );
};

const cardTarget = {
  drop(props, monitor) {
    const cardId = monitor.getItem().id;
    props.attachToList(cardId, props.id);
    props.detachFromList(cardId, props.id);
  }
};

const collect = (dndConnect, monitor) => {
  return {
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver()
  };
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards
});

export default connect(
  mapStateToProps,
  { createCard, updateCard, deleteCard, attachToList, detachFromList }
)(DropTarget(ItemTypes.CARD, cardTarget, collect)(List));
