import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Card from "components/Card";
import { createCard } from "actions/cards";
import { attachToList } from "actions/lists";

const List = props => {
  const { id, name, cardIds } = props;

  const handleAddCard = e => {
    const newCard = props.createCard("New card");
    props.attachToList(newCard.payload.id, id);
  };

  const renderCards = () => {
    return cardIds.map(cardId => {
      const cardProps = props.cards.find(card => card.id === cardId);
      return <Card key={cardId} {...cardProps} />;
    });
  };

  return (
    <div className="list">
      <div className="list__header">{name}</div>
      <div className="list__content">{renderCards()}</div>
      <div className="list__add">
        <span className="list__add__button" onClick={handleAddCard}>
          + Add another card
        </span>
      </div>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards
});

export default connect(
  mapStateToProps,
  { createCard, attachToList }
)(List);
