import React from "react";

const Card = props => {
  const { content } = props;
  return (
    <div className="card">
      <div className="card__content">{content}</div>
    </div>
  );
};

export default Card;
