import React from "react";

class BoardCard extends React.Component {
  render() {
    return (
      <div className="board-card" onClick={this.props.onClick}>
        <div className="board-card__thumbnail">&nbsp;</div>
        <div className="board-card__name">{this.props.name}</div>
      </div>
    );
  }
}

export default BoardCard;
