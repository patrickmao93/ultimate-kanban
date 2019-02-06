import React from "react";

class Card extends React.Component {
  render() {
    const { id, children, onDelete } = this.props;
    return (
      <div className="card">
        <div className="card__content">{children}</div>
        <div className="card__close" onClick={() => onDelete(id)}>
          <i className="fas fa-times" />
        </div>
      </div>
    );
  }
}

export default Card;
