import React from "react";

import Editable from "components/Editable";

class Card extends React.Component {
  handleClickValue = e => {};
  render() {
    return (
      <div className="card">
        <div className="card__content">
          <Editable value={this.props.content} />
        </div>
      </div>
    );
  }
}

export default Card;
