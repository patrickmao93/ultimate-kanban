import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DropTarget } from "react-dnd";
import { Icon } from "semantic-ui-react";

import Card from "components/card/Card";
import AddCardButton from "components/AddCardButton";
import { createCard, updateCard, deleteCard } from "actions/cards";
import { attachToList, detachFromList } from "actions/lists";
import * as ItemTypes from "constants/ItemTypes";

const List = props => {
  const { id, cardIds, onDelete, connectDropTarget } = props;

  const handleCreateCard = content => {
    const card = props.createCard(content);
    props.attachToList(props.id, card.payload.id);
  };

  const handleDeleteCard = cardId => {
    props.deleteCard(props.id, cardId);
  };

  const handleUpdateCard = (id, content, editing = false) => {
    const card = {
      id,
      content,
      editing
    };
    props.updateCard(card);
  };

  const handleClick = id => {
    const card = props.cards.find(card => card.id === id);
    card.editing = true;
    props.updateCard(card);
  };

  const renderCards = () => {
    return cardIds.map(cardId => {
      const cardProps = props.cards.find(card => card.id === cardId);
      return (
        <Card
          key={cardId}
          onDelete={handleDeleteCard}
          onUpdate={handleUpdateCard}
          onClick={handleClick}
          listId={props.id}
          {...cardProps}
        />
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
          <Icon name="times" />
        </div>
      </div>
      <div className="list__content">
        {renderCards()}
        <AddCardButton
          open={props.addCardEditor.open && id === props.addCardEditor.listId}
          onCreateCard={handleCreateCard}
          listId={id}
        />
      </div>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};

const cardTarget = {
  drop(props, monitor) {
    const cardId = monitor.getItem().id;
    const listId = monitor.getItem().listId;

    props.detachFromList(listId, cardId);
    props.attachToList(props.id, cardId);
  }
};

const collect = (dndConnect, monitor) => {
  return {
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver()
  };
};

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  addCardEditor: state.ui.addCardEditor
});

export default connect(
  mapStateToProps,
  {
    createCard,
    updateCard,
    deleteCard,
    attachToList,
    detachFromList
  }
)(DropTarget(ItemTypes.CARD, cardTarget, collect)(List));
