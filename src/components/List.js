import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Card from "components/Card";

const List = props => {
  const { id, name } = props;

  const cards = props.cards
    .filter(card => card.listId === id)
    .sort((card1, card2) => card1.order - card2.order)
    .map(card => <Card key={card.id} {...card} />);
  return (
    <div className="list">
      <div className="list__header">{name}</div>
      <div className="list__content">{cards}</div>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cards: state.cards
});

export default connect(mapStateToProps)(List);
