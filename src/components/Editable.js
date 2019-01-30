import React from "react";

class Editable extends React.Component {
  handleInput = e => {
    if (e.type === "keypress" && e.key !== "enter") {
      return;
    }
  };

  renderValue = () => {
    return (
      <input
        type="text"
        onClick={this.props.handleInputClick}
        defaultValue={this.props.value}
        readOnly
      />
    );
  };

  renderEdit = () => {
    return <input type="text" onKeyPress={this.handleInput} />;
  };

  render() {
    return this.props.editing ? this.renderEdit() : this.renderValue();
  }
}

export default Editable;
