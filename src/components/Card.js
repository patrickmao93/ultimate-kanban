import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card__content">{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
