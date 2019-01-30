import React from "react";
import { PropTypes } from "prop-types";

class Editable extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    content: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onInputClick: PropTypes.func.isRequired
  };

  handleFinishEdit = e => {
    if (e.type === "keypress" && e.key !== "enter") return;

    this.props.onEdit(this.props.id, e.target.value);
  };

  renderValue = () => {
    return (
      <input
        type="text"
        className="editable"
        onClick={() => this.props.onInputClick(this.props.id)}
        defaultValue={this.props.content}
        readOnly
      />
    );
  };

  renderEdit = () => {
    return (
      <input
        type="text"
        className="editable editable--editing"
        onKeyPress={this.handleFinishEdit}
        onBlur={this.handleFinishEdit}
        defaultValue={this.props.content}
      />
    );
  };

  render() {
    return this.props.editing ? this.renderEdit() : this.renderValue();
  }
}

export default Editable;
